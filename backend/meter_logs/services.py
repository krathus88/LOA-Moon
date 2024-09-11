import sqlite3
import json
import json
import gzip
import io

from django.http import HttpResponseBadRequest
from django.db import IntegrityError
from typing import List

from constants.encounters import encounter_map
from constants.game import patches
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
    local_players = set()
    encounters_info = {}

    for log_entry in data:
        # Set return message for each encounter
        encounters_info[log_entry["localId"]] = {
            "success": False,
            "is_valid": False,
            "id": None,
        }

        # Check if Log is from a an accepted patch
        if log_entry["lastCombatPacket"] < patches[-1]:
            continue

        # If data is invalid, skip
        if not log_entry["localPlayer"] or not log_entry["difficulty"]:
            continue

        # Check if the difficulty is one of the accepted difficulties
        if log_entry["difficulty"] not in encounter_map.get(
            log_entry["currentBossName"], {}
        ).get("difficulty", []):
            continue

        encounter_damage_stats_data = log_entry["encounterDamageStats"]
        party_info = encounter_damage_stats_data["misc"]["partyInfo"]

        # Check if DB table Encounter has multiple of 4 Players (4, 8, 12, 16, etc)
        if not party_info or not all(
            len(party) % 4 == 0 for party in party_info.values()
        ):
            continue

        """ buffs = encounter_damage_stats_data["buffs"]
        debuffs = encounter_damage_stats_data["debuffs"]

        # Combine buffs and debuffs into one dictionary
        buff_dict = buffs | debuffs

        # Check if (de)buffs is empty
        if len(buff_dict.keys()) == 0:
            continue """

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

            # Determine the party_num by checking the player's name in the party_info
            party_num = 0
            for p_num, players in party_info.items():
                if entity["name"] in players:
                    party_num = int(p_num)
                    break

            is_local_player = entity["name"] == log_entry["localPlayer"]
            if is_local_player:
                local_players.add(entity["name"])

            """ skill_info = entity["skills"]
            # Check if data is valid
            if len(skill_info.keys()) == 0:
                break

            player_skills, player_buffs = process_skills(skill_info, buff_dict)
            subclass = classify_subclass(
                entity, player_skills, player_buffs, encounter_damage_stats_data["dps"]
            ) """

            player_data.append(
                {
                    "name": entity["name"],
                    "character_id": entity["characterId"],
                    "class_id": entity["classId"],
                    "subclass": "N/A",
                    "dps": entity["damageStats"]["dps"],
                    "gear_score": (
                        None
                        if (entity["gearScore"] == 0 or None)
                        else entity["gearScore"]
                    ),
                    "is_dead": entity["isDead"],
                    "party_num": party_num,
                    "local_player": is_local_player,
                    "total_damage": entity["damageStats"]["damageDealt"],
                    "casts": entity["skillStats"]["casts"],
                    "hits": entity["skillStats"]["hits"],
                    "crits": entity["skillStats"]["crits"],
                    "back_attacks": entity["skillStats"]["backAttacks"],
                    "front_attacks": entity["skillStats"]["frontAttacks"],
                    "counters": entity["skillStats"]["counters"],
                    "buffs": entity["damageStats"]["buffedBy"],
                    "debuffs": entity["damageStats"]["debuffedBy"],
                    "skills": entity["skills"],
                    "shields": entity["damageStats"].get("shieldsGivenBy", None),
                    "absorbs": entity["damageStats"].get(
                        "damageAbsorbedOnOthersBy", None
                    ),
                }
            )

        # Check if DB table Entity has multiple of 4 Players (4, 8, 16, etc)
        if player_count > 0 and player_count != 12 and player_count % 4 != 0:
            continue

        all_player_data.append(player_data)

        # Check if Boss is in encounter_map
        if not npc_id or not max_boss_hp:
            continue

        formatted_data = {
            "region": log_entry["encounterDamageStats"]["misc"]["region"],
            "local_id": log_entry["localId"],
            "fight_end": log_entry["lastCombatPacket"]
            / 1000,  # Convert from milliseconds to seconds
            "fight_duration": log_entry["duration"],
            "boss_name": log_entry["currentBossName"],
            "difficulty": log_entry["difficulty"],
            "max_hp": max_boss_hp,
            "npc_id": npc_id,
        }

        all_formatted_data.append(formatted_data)

    return all_formatted_data, all_player_data, local_players, encounters_info


def associate_characters_with_user(user, character_names):
    existing_character_names = set(user.characters.values_list("name", flat=True))

    # Get characters that are not associated with the user
    unassociated_character_names = set(character_names) - existing_character_names

    for char_name in unassociated_character_names:
        try:
            # Create a new character associated with the user
            Characters.objects.create(profile=user, name=char_name)
        except IntegrityError:
            # Character name already exists in the Characters database
            continue


# endregion


# region Helper Functions
def process_skills(skill_info: dict, buff_dict: dict) -> tuple[dict, dict]:
    """
    Return a dictionary of skills with related buff information and a dictionary
    of (de)buffs for a single entity.
    """
    # Filter out some irrelevant keys
    player_skills = {
        skill_ID: {
            "name": info["name"],
            "totalDamage": info["totalDamage"],
            "maxDamageCast": info["maxDamageCast"],
            "buffedBySupport": info["buffedBySupport"],
            "buffedByIdentity": info["buffedByIdentity"],
            "debuffedBySupport": info["debuffedBySupport"],
            "casts": info["casts"],
            "hits": info["hits"],
            "crits": info["crits"],
            "backAttacks": info["backAttacks"],
            "frontAttacks": info["frontAttacks"],
            "dps": info["dps"],
            "buffs": info["buffedBy"] | info["debuffedBy"],
        }
        for (skill_ID, info) in skill_info.items()
    }

    # Get unique buff IDs
    buff_IDs = [
        buff_ID for skill in player_skills.values() for buff_ID in skill["buffs"]
    ]
    buff_IDs = list(set(buff_IDs))

    player_buffs = {}
    for buff_ID in buff_IDs:
        if buff_ID not in buff_dict:
            # Probably hidden (de)buff, skip
            continue

        # Get amount of damage done by each skill with this buff and sum
        skill_damage = [
            skill["buffs"].get(buff_ID, 0) for skill in player_skills.values()
        ]
        player_buffs[buff_ID] = {
            "name": buff_dict[buff_ID]["source"]["name"],
            "damage": sum(skill_damage),
        }

    return player_skills, player_buffs


def classify_subclass(
    entity: EntitiesType, player_skills: dict, player_buffs: dict, overall_dps: int
) -> str:
    """Return the subclass of a player based on their entity entry"""

    def _check_buff(buff_name: str) -> bool:
        return any([buff_name in info["name"] for info in player_buffs.values()])

    # Figure out class
    player_class = entity["class"]

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
        return (
            "Order of the Emperor"
            if "19282" in player_skills.keys()
            else "Empress's Grace"
        )
    elif player_class == "Summoner":
        # Check if "20290" Kelsion, is in skills
        return (
            "Communication Overflow"
            if "20290" in player_skills.keys()
            else "Master Summoner"
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
            if any(
                [
                    "Esoteric Skill: " in skill_info["name"]
                    for skill_info in player_skills.values()
                ]
            )
            else "First Intention"
        )
    elif player_class == "Scrapper":
        # This one is weird where the Shock Training buff is ID "500224" but it doesn't have a name
        return (
            "Shock Training"
            if "500224" in player_buffs.keys()
            else "Ultimate Skill: Taijutsu"
        )
    elif player_class == "Soulfist":
        # A weird one where the RS Hype is ID "240250" but it doesn't have a name
        return "Robust Spirit" if "240250" in player_buffs.keys() else "Energy Overflow"
    elif player_class == "Glaivier":
        # Look for the "Pinnacle" skill self buff
        return "Pinnacle" if _check_buff("Pinnacle") else "Control"
    elif player_class == "Striker":
        # Looking for the skill ID "39110", Call of the Wind God
        return "Esoteric Flurry" if "39110" in player_skills.keys() else "Deathblow"
    elif player_class == "Breaker":
        # Looking for the skill "47020" Asura Destruction Basic Attack
        return "Asura's Path" if "47020" in player_skills.keys() else "Brawl King Storm"
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
        return "Peacemaker" if "38110" in player_skills.keys() else "Time to Hunt"

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


def associate_characters_with_user(user, character_names):
    existing_character_names = set(user.characters.values_list("name", flat=True))

    # Get characters that are not associated with the user
    unassociated_character_names = set(character_names) - existing_character_names

    for char_name in unassociated_character_names:
        try:
            # Create a new character associated with the user
            Characters.objects.create(profile=user, name=char_name)
        except IntegrityError:
            # Character name already exists in the Characters database
            continue


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
