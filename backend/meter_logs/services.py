import sqlite3
import json

from django.db import IntegrityError
from constants.encounters import accepted_difficulties, encounter_map, boss_hp_map
from constants.game import patches
from user.models import Characters


def parse_db_file(db_file_path):
    # Connect to the SQLite database
    conn = sqlite3.connect(db_file_path)
    cursor = conn.cursor()

    # Define the tables to fetch
    relevant_tables = {
        "encounter",
        "encounter_preview",
        "entity",
    }

    consolidated_data = {}

    # Entry needs to meet both these ID's criteria to be valid
    valid_encounter_ids = set()
    valid_encounter_cleared_ids = set()

    # Entry CAN'T meet this ID's criteria to be valid
    blacklisted_encounter_ids = set()

    for table_name in relevant_tables:
        # Fetch the column names and types
        cursor.execute(f"PRAGMA table_info({table_name})")
        columns_info = cursor.fetchall()
        columns = [info[1] for info in columns_info]
        column_types = [info[2] for info in columns_info]
        column_indices = {info[1]: index for index, info in enumerate(columns_info)}

        # Fetch all data from the table
        cursor.execute(f"SELECT * FROM {table_name}")
        rows = cursor.fetchall()

        for row in rows:
            if (
                table_name == "encounter"
                and row[column_indices["last_combat_packet"]] < patches[-1]
            ):
                continue

            # Determine the key (like `encounter_id`) based on the table
            if table_name == "encounter":
                key = row[column_indices["id"]]
            elif table_name == "encounter_preview":
                key = row[column_indices["id"]]
                # If cleared
                if row[column_indices["cleared"]] == 1:
                    valid_encounter_cleared_ids.add(key)

            elif table_name == "entity":
                key = row[column_indices["encounter_id"]]

                if row[column_indices["entity_type"]] == "PLAYER" and (
                    row[column_indices["character_id"]] == 0
                    or not row[column_indices["entity_type"]]
                ):
                    blacklisted_encounter_ids.add(key)
                    continue

                # If the boss is a valid one
                if (
                    row[column_indices["entity_type"]] == "BOSS"
                    and row[column_indices["name"]] in encounter_map
                    and row[column_indices["current_hp"]] <= 0
                ):
                    valid_encounter_ids.add(key)
            else:
                continue

            if key not in consolidated_data:
                consolidated_data[key] = {
                    "encounter": None,
                    "encounter_preview": None,
                    "entity": [],
                }

            # Organize data according to the table
            row_data = {}
            for col_name, col_value, col_type in zip(columns, row, column_types):
                if col_type == "BLOB":
                    # Skip BLOB columns
                    continue
                elif isinstance(col_value, bytes):
                    continue
                else:
                    row_data[col_name] = col_value

            if table_name == "encounter":
                consolidated_data[key]["encounter"] = row_data
            elif table_name == "encounter_preview":
                consolidated_data[key]["encounter_preview"] = row_data
            elif table_name == "entity":
                consolidated_data[key]["entity"].append(row_data)

    consolidated_data = {
        key: value
        for key, value in consolidated_data.items()
        if key in valid_encounter_ids
        and key in valid_encounter_cleared_ids
        and key not in blacklisted_encounter_ids
    }

    # Close the connection
    conn.close()

    return consolidated_data


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
    entity: dict, player_skills: dict, player_buffs: dict, encounter: dict
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
            if player_skills.get("18030", {"dps": 0})["dps"] / entity["dps"] > 0.3
            else "Rage Hammer"
        )
    elif player_class == "Gunlancer":
        # First check if they're Princess Maker
        if entity["dps"] / encounter["dps"] < 0.05:
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
        return "Judgment" if entity["dps"] / encounter["dps"] > 0.1 else "Blessed Aura"
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
            if entity["dps"] / encounter["dps"] > 0.1
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
            if player_skills.get("25402", {"dps": 0})["dps"] / entity["dps"] > 0.1
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
            if player_skills.get("30260", {"dps": 0})["dps"] / entity["dps"] > 0.1
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
        return "Recurrence" if entity["dps"] / encounter["dps"] > 0.1 else "Full Bloom"
    elif player_class == "Aeromancer":
        # Check for Wind Fury buff
        return "Wind Fury" if _check_buff("Wind Fury") else "Drizzle"
    else:
        return "Unknown"


def format_db_data(data: dict):
    all_formatted_data = []
    all_player_data = []
    local_players = set()

    for key, value in data.items():
        # If data is invalid, skip
        if (
            not value["encounter_preview"]["local_player"]
            or not value["encounter_preview"]["difficulty"]
        ):
            continue

        # Check if the difficulty is one of the accepted difficulties
        difficulty = value["encounter_preview"]["difficulty"]
        if difficulty not in accepted_difficulties:
            continue

        misc_data = json.loads(value["encounter"]["misc"])
        party_info = misc_data.get("partyInfo", {})

        # Parsed and combined dictionaries
        buffs = json.loads(value["encounter"].get("buffs", "{}"))
        debuffs = json.loads(value["encounter"].get("debuffs", "{}"))
        buff_dict = buffs | debuffs

        # Check if (de)buffs is empty
        if len(buff_dict.keys()) == 0:
            continue

        npc_id = None
        max_boss_hp = None
        player_data = []
        for entry in value["entity"]:
            # If it's a boss, skip
            if entry["npc_id"] > 0:
                if entry["name"] in encounter_map:
                    npc_id = entry["npc_id"]
                    max_boss_hp = entry["max_hp"]

                continue

            # Determine the party_num by checking the player's name in the party_info
            party_num = 0
            for p_num, players in party_info.items():
                if entry["name"] in players:
                    party_num = int(p_num)
                    break

            is_local_player = (
                entry["name"] == value["encounter_preview"]["local_player"]
            )
            if is_local_player:
                local_players.add(entry["name"])

            skill_info = json.loads(entry["skills"])
            player_skills, player_buffs = process_skills(skill_info, buff_dict)
            subclass = classify_subclass(
                entry, player_skills, player_buffs, value["encounter"]
            )

            player_data.append(
                {
                    "name": entry["name"],
                    "character_id": entry["character_id"],
                    "class_id": (
                        None if (entry["class_id"] == 0 or None) else entry["class_id"]
                    ),
                    "subclass": subclass,
                    "dps": entry["dps"],
                    "gear_score": (
                        None
                        if (entry["gear_score"] == 0 or None)
                        else entry["gear_score"]
                    ),
                    "is_dead": True if entry["is_dead"] == 1 else False,
                    "party_num": party_num,
                    "local_player": is_local_player,
                }
            )

        all_player_data.append(player_data)

        formatted_data = {
            "fight_end": value["encounter"]["last_combat_packet"]
            / 1000,  # Convert from milliseconds to seconds
            "fight_duration": value["encounter_preview"]["duration"],
            "boss_name": value["encounter_preview"]["current_boss"],
            "difficulty": value["encounter_preview"]["difficulty"],
            "max_hp": max_boss_hp,
            "max_hp_bars": boss_hp_map.get(
                value["encounter_preview"]["current_boss"], None
            ),
            "npc_id": npc_id,
        }

        all_formatted_data.append(formatted_data)

    return all_formatted_data, all_player_data, local_players


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
