import json
import gzip
import io

from django.http import HttpResponseBadRequest
from django.db import IntegrityError
from ninja.errors import HttpError
from typing import List

from constants.encounters import encounter_map
from constants.game import patches
from constants.skill_info import (
    skills_dict,
    status_effect_dict,
    items_dict,
    special_skills_dict,
)
from constants.classes import classes_map
from user.models import Characters
from .schemas import UploadLogBody, EntitiesType


# region Main


def decompress_data(request) -> List[UploadLogBody]:
    if "gzip" not in request.META.get("HTTP_CONTENT_ENCODING", ""):
        return HttpResponseBadRequest("Content-Encoding must be gzip")

    try:
        # Read the compressed body
        compressed_data = request.body

        # Decompress the data
        with gzip.GzipFile(fileobj=io.BytesIO(compressed_data), mode="rb") as gzip_file:
            decompressed_data = gzip_file.read()

        # Parse JSON data
        body = json.loads(decompressed_data)

        # Ensure the body is a list of UploadLogBody
        if not isinstance(body, list):
            return HttpResponseBadRequest("Invalid JSON format")

        return body

    except (gzip.BadGzipFile, json.JSONDecodeError) as e:
        return HttpResponseBadRequest(f"Error processing request: {str(e)}")


def format_db_data(data: List[UploadLogBody]):
    all_formatted_data = []
    all_player_data = []
    local_players = []
    encounters_info = {}

    for log_entry in data:
        # Set return message for each encounter
        encounters_info[log_entry["localId"]] = {
            "success": False,
            "is_valid": False,
            "id": None,
        }

        # If data is invalid, skip
        if not log_entry["localPlayer"] or not log_entry["difficulty"]:
            continue

        # Check if Log is from an accepted patch
        if log_entry["lastCombatPacket"] < patches[-1]:
            continue

        # Check if boss name is allowed
        boss_info = encounter_map.get(log_entry["currentBossName"])
        if not boss_info:
            continue

        boss_name = log_entry["currentBossName"]
        # If there are multiple accepted boss names for a given encounter
        if boss_info.get("refers_to"):
            boss_name = boss_info.get("refers_to")
            boss_info = boss_info[boss_name]

        # Check if the difficulty is one of the accepted difficulties
        if log_entry["difficulty"] not in encounter_map.get(boss_name, {}).get(
            "difficulty", []
        ):
            continue

        encounter_damage_stats_data = log_entry["encounterDamageStats"]
        party_info = encounter_damage_stats_data["misc"]["partyInfo"]

        # Check if it's a valid number of players
        if not party_info or sum(
            len(party) for party in party_info.values()
        ) != encounter_map.get(boss_name, {}).get("num_players", -1):
            continue

        npc_id = None
        max_boss_hp = None
        player_count = 0
        player_data = []

        for _, entity in log_entry["entities"].items():
            # Check if it's a Boss
            if entity["npcId"] > 0:
                # If it's a boss from allowed encounters
                if entity["name"] in encounter_map:
                    npc_id = entity["npcId"]
                    max_boss_hp = entity["maxHp"]
                continue

            # Check if it's a Player
            if entity["classId"] > 0 and entity["entityType"] == "PLAYER":
                player_count += 1

            is_local_player = entity["name"] == log_entry["localPlayer"]
            if is_local_player:
                local_players.append(
                    {
                        "region": log_entry["encounterDamageStats"]["misc"]["region"],
                        "name": entity["name"],
                        "class_id": entity["classId"],
                    }
                )

            player_buffs = (
                entity["damageStats"]["buffedBy"] | entity["damageStats"]["debuffedBy"]
            )

            subclass = classify_subclass(
                entity,
                entity["skills"],
                player_buffs,
                encounter_damage_stats_data["dps"],
            )

            # Calculate death timer
            if entity["damageStats"]["deathTime"] > 0:
                death_timer = round(
                    (log_entry["lastCombatPacket"] - entity["damageStats"]["deathTime"])
                    / 1000
                )
            else:
                death_timer = 0

            # Check if the player exists in the Characters model and get their display_name status
            try:
                character = Characters.objects.get(
                    region=log_entry["encounterDamageStats"]["misc"]["region"],
                    name=entity["name"],
                )
                should_display_name = character.display_name
            # If character does not exist, set display_name to False
            except Characters.DoesNotExist:
                should_display_name = False

            # Determine the party_num by checking the player's name in the party_info
            party_num = 0
            for p_num, players in party_info.items():
                if entity["name"] in players:
                    party_num = int(p_num)
                    break

            player_data.append(
                {
                    "name": entity["name"],
                    "character_id": entity["characterId"],
                    "class_id": entity["classId"],
                    "subclass": subclass,
                    "dps": entity["damageStats"]["dps"],
                    "gear_score": (
                        None
                        if (entity["gearScore"] == 0 or None)
                        else entity["gearScore"]
                    ),
                    "is_dead": entity["isDead"],
                    "death_timer": death_timer,
                    "death_count": entity["damageStats"]["deaths"],
                    "party_num": party_num,
                    "display_name": should_display_name,
                    "local_player": is_local_player,
                    "counters": entity["skillStats"]["counters"],
                    "casts": entity["skillStats"]["casts"],
                    "hits": entity["skillStats"]["hits"],
                    "crits": entity["skillStats"]["crits"],
                    "dmg_total": entity["damageStats"]["damageDealt"],
                    "dmg_back_attacks": entity["damageStats"]["backAttackDamage"],
                    "dmg_front_attacks": entity["damageStats"]["frontAttackDamage"],
                    "dmg_debuffed_supp_brand": entity["damageStats"][
                        "debuffedBySupport"
                    ],
                    "dmg_buffed_supp_ap": entity["damageStats"]["buffedBySupport"],
                    "dmg_buffed_supp_identity": entity["damageStats"][
                        "buffedByIdentity"
                    ],
                    "buffs": entity["damageStats"]["buffedBy"],
                    "debuffs": entity["damageStats"]["debuffedBy"],
                    "skills": filter_valid_skills(entity["skills"]),
                }
            )

        # Check if total num of players is valid
        if player_count > 0 and player_count != encounter_map.get(boss_name, {}).get(
            "num_players", -1
        ):
            continue

        # Check if Boss is in encounter_map
        if not npc_id or not max_boss_hp:
            continue

        # WARNING:
        # MAKE SURE TO DO ALL DATA INVALIDATION ABOVE THIS POINT
        all_player_data.append(player_data)

        formatted_data = {
            "region": log_entry["encounterDamageStats"]["misc"]["region"],
            "local_id": log_entry["localId"],
            "fight_end": log_entry["lastCombatPacket"]
            / 1000,  # Convert from milliseconds to seconds
            "fight_duration": log_entry["duration"],
            "boss_name": boss_name,
            "difficulty": log_entry["difficulty"],
            "max_hp": max_boss_hp,
            "npc_id": npc_id,
        }

        all_formatted_data.append(formatted_data)

    return all_formatted_data, all_player_data, local_players, encounters_info


def filter_valid_skills(player_skills):
    """Filters Player Skills for valid ones that will be stored in the Database"""

    # Combine all valid keys from the dictionaries into a single set
    valid_keys = (
        set(skills_dict.keys())
        .union(items_dict.keys())
        .union(special_skills_dict.keys())
    )

    # Initialize a new dictionary for the filtered skills
    filtered_skills = {}

    for skill_key, skill_value in player_skills.items():
        if skill_key in valid_keys:
            filtered_skills[skill_key] = skill_value

    return filtered_skills


def associate_characters_with_user(user, character_names_regions):
    # Get the set of existing (name, region) tuples for the user's profile
    existing_character_tuples = set(user.characters.values_list("name", "region"))

    # Filter out characters that are already associated with the user's profile
    unassociated_character_tuples = [
        char_info
        for char_info in character_names_regions
        if (char_info["name"], char_info["region"]) not in existing_character_tuples
    ]

    for char_info in unassociated_character_tuples:
        try:
            # Create a new character associated with the user's profile
            Characters.objects.create(
                profile=user,
                region=char_info["region"],
                name=char_info["name"],
                class_id=char_info["class_id"],
            )
        except IntegrityError:
            # Character with this name and region already exists, skip it
            continue


# endregion


# region Helper Functions
def classify_subclass(
    entity: EntitiesType, player_skills: dict, player_buffs: dict, overall_dps: int
) -> str:
    """Return the subclass of a player based on their entity entry"""

    def _check_buff(buff_name: str) -> bool:
        buff_names = [
            status_effect_dict.get(buff, {"name": ""})["name"]
            for buff in player_buffs.keys()
        ]
        return any([buff_name in name for name in buff_names])

    def _check_skill(skill_name: str) -> bool:
        skill_names = [
            skills_dict.get(skill, {"name": ""})["name"]
            for skill in player_skills.keys()
        ]
        return any([skill_name in name for name in skill_names])

    # Figure out class
    player_class = classes_map[entity["classId"]]

    if player_class == "Berserker":
        # Check if you have the Mayhem self skill buff
        return "Mayhem" if _check_buff("Mayhem") else "Berserker's Technique"
    elif player_class == "Destroyer":
        # Look for skill "18030" special "Basic 3 Chain Hits" and does high damage split
        return (
            "Gravity Training"
            if player_skills.get("18030", {"dps": 0})["dps"]
            / entity["damageStats"]["dps"]
            > 0.3
            else "Rage Hammer"
        )
    elif player_class == "Gunlancer":
        # First check if they're Princess Maker
        if entity["damageStats"]["dps"] / overall_dps < 0.05:
            return "Princess Maker"
        else:
            # Looking for set
            return (
                "Combat Readiness"
                if _check_buff("Hallucination")
                or _check_buff("Enhanced Magick Addiction")
                else "Lone Knight"
            )
    elif player_class == "Paladin":
        # Checking if this person does okay damage
        return (
            "Judgment"
            if entity["damageStats"]["dps"] / overall_dps > 0.1
            else "Blessed Aura"
        )
    elif player_class == "Slayer":
        # Looking for the "Predator" skill self buff
        return "Predator" if _check_buff("Predator") else "Punisher"
    elif player_class == "Arcanist":
        # Uses the "Emperor" skill to decide spec
        return "Order of the Emperor" if _check_skill("Emperor") else "Empress's Grace"
    elif player_class == "Summoner":
        # Check if "20290" Kelsion, is in skills
        return (
            "Communication Overflow" if _check_skill("Kelsion") else "Master Summoner"
        )

    elif player_class == "Bard":
        # Check if they're doing okay damage
        return (
            "True Courage"
            if entity["damageStats"]["dps"] / overall_dps > 0.1
            else "Desperate Salvation"
        )
    elif player_class == "Sorceress":
        # Looking for "Igniter" self buff
        return "Igniter" if _check_buff("Igniter") else "Reflux"
    elif player_class == "Wardancer":
        # Looking for esoteric skill names
        return (
            "Esoteric Skill Enhancement"
            if _check_skill("Esoteric skill: Azure Dragon Supreme Fist")
            else "First Intention"
        )
    elif player_class == "Scrapper":
        # This one is weird where the Shock Training buff is ID "500224", need to double check
        return (
            "Shock Training"
            if "500224" in player_buffs.keys()
            else "Ultimate Skill: Taijutsu"
        )
    elif player_class == "Soulfist":
        # A weird one where the RS Hype is ID "240250" but it requires a specific ID
        return "Robust Spirit" if "240250" in player_buffs.keys() else "Energy Overflow"
    elif player_class == "Glaivier":
        # Look for the "Pinnacle" skill self buff
        return "Pinnacle" if _check_buff("Pinnacle") else "Control"
    elif player_class == "Striker":
        # Looking for the skill ID "39110", Call of the Wind God
        return (
            "Esoteric Flurry"
            if _check_skill("Esoteric Skill: Call of the Wind God")
            else "Deathblow"
        )
    elif player_class == "Breaker":
        # Looking for the skill "47020" Asura Destruction Basic Attack
        return (
            "Asura's Path"
            if _check_skill("Asura Destruction Basic Attack")
            else "Brawl King Storm"
        )
    elif player_class == "Deathblade":
        # Check if "25402" RE Death Trance exists and does damage
        return (
            "Remaining Energy"
            if player_skills.get("25402", {"dps": 0})["dps"]
            / entity["damageStats"]["dps"]
            > 0.1
            else "Surge"
        )
    elif player_class == "Shadowhunter":
        # Looking for Demonic Impulse self buff
        return (
            "Demonic Impulse"
            if _check_buff("Demonic Impulse")
            else "Perfect Suppression"
        )
    elif player_class == "Reaper":
        # Checking for the "Lunar Voice" self buff
        return "Lunar Voice" if _check_buff("Lunar Voice") else "Hunger"
    elif player_class == "Souleater":
        # Checking for "Soul Snatch" self buff
        return "Night's Edge" if _check_buff("Soul Snatch") else "Full Moon Harvester"
    elif player_class == "Sharpshooter":
        # Look for Loyal Companion skill self buff
        return "Loyal Companion" if _check_buff("Loyal Companion") else "Death Strike"
    elif player_class == "Deadeye":
        # Look for the "Enhanced Weapon" self skill buff
        return "Enhanced Weapon" if _check_buff("Enhanced Weapon") else "Pistoleer"
    elif player_class == "Artillerist":
        # Looking for "30260" Barrage: Focus Fire and doing more than 10% damage
        return (
            "Barrage Enhancement"
            if player_skills.get("30260", {"dps": 0})["dps"]
            / entity["damageStats"]["dps"]
            > 0.1
            else "Firepower Enhancement"
        )
    elif player_class == "Machinist":
        # Look for Evolutionary Legacy skill self buff
        return (
            "Evolutionary Legacy"
            if _check_buff("Evolutionary Legacy")
            else "Arthetinean Skill"
        )
    elif player_class == "Gunslinger":
        # Looking for Sharpshooter skill
        return "Peacemaker" if _check_skill("Sharpshooter") else "Time to Hunt"

    elif player_class == "Artist":
        # Checks if they're doing okay damage
        return (
            "Recurrence"
            if entity["damageStats"]["dps"] / overall_dps > 0.1
            else "Full Bloom"
        )
    elif player_class == "Aeromancer":
        # Check for Wind Fury buff
        return "Wind Fury" if _check_buff("Wind Fury") else "Drizzle"
    else:
        return "Unknown"


def decompress_gzip(data):
    with gzip.GzipFile(fileobj=io.BytesIO(data)) as f:
        return f.read()


def parse_data(data):
    # Check if data is of type str or bytes
    if type(data) == str:
        # Data is a JSON string
        return json.loads(data)
    elif type(data) == bytes:
        try:
            # Attempt to decode bytes directly as JSON
            return json.loads(data.decode("utf-8"))
        except UnicodeDecodeError:
            # If decoding fails, try decompressing
            decompressed_data = decompress_gzip(data)
            return json.loads(decompressed_data)


# endregion
