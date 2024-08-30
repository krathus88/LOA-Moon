import sqlite3

from django.db import models

from .models import EncounterPreview


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
            elif table_name == "entity":
                key = row[column_indices["encounter_id"]]
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

    # Close the connection
    conn.close()

    return consolidated_data


def format_db_data(data: dict):
    all_formatted_data = []

    lattest_encounter_id = EncounterPreview.objects.aggregate(
        max_id=models.Max("encounter_id")
    )["max_id"]

    if not lattest_encounter_id:
        lattest_encounter_id = 0

    for key, value in data.items():
        # If data is invalid, skip
        if (
            not value["encounter_preview"]["local_player"]
            or not value["encounter_preview"]["difficulty"]
        ):
            continue

        npc_id = None
        player_data = []
        for entry in value["entity"]:
            # If it's a boss, skip
            if entry["npc_id"] > 0:
                npc_id = entry["npc_id"]

                continue

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
                }
            )

        lattest_encounter_id += 1

        formatted_data = {
            "encounter_id": lattest_encounter_id,
            "fight_end": value["encounter"]["last_combat_packet"]
            / 1000,  # Convert from miliseconds to seconds
            "fight_duration": value["encounter_preview"]["duration"],
            "local_player": value["encounter_preview"]["local_player"],
            "boss_name": value["encounter_preview"]["current_boss"],
            "difficulty": value["encounter_preview"]["difficulty"],
            "npc_id": npc_id,
        }

        formatted_data["player_data"] = player_data

        all_formatted_data.append(formatted_data)

    return all_formatted_data
