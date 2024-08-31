import sqlite3
import json

from django.db import models

from homepage.models import EncounterPreview
from constants.encounters import encounter_map, boss_hp_map
from globals.classes import classify_class


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


def format_db_data(data: dict):
    all_formatted_data = []
    all_player_data = []

    for key, value in data.items():
        # If data is invalid, skip
        if (
            not value["encounter_preview"]["local_player"]
            or not value["encounter_preview"]["difficulty"]
        ):
            continue

        misc_data = json.loads(value["encounter"]["misc"])
        party_info = misc_data.get("partyInfo", {})

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

            player_data.append(
                {
                    "name": entry["name"],
                    "character_id": entry["character_id"],
                    "class_id": (
                        None if (entry["class_id"] == 0 or None) else entry["class_id"]
                    ),
                    "subclass": None,  # NEED TO IMPLEMENT A WAY TO CHECK SUBCLASS
                    "dps": entry["dps"],
                    "gear_score": (
                        None
                        if (entry["gear_score"] == 0 or None)
                        else entry["gear_score"]
                    ),
                    "is_dead": True if entry["is_dead"] == 1 else False,
                    "party_num": party_num,
                    "local_player": entry["name"]
                    == value["encounter_preview"]["local_player"],
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

    return all_formatted_data, all_player_data
