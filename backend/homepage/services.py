import time
from datetime import datetime

from constants.encounters import encounter_map


# region Raid Summary
def format_raid_summary_data(data):
    formatted_data = []

    for entry in data:
        total_ilvl = 0
        death_count = 0
        calculate_ilvl = True
        total_damage = 0
        highest_ilvl = 0

        # Calculate the total damage dealt by all players
        for player_entry in entry["player_data"]:
            total_damage += player_entry["dps"]

        for player_entry in entry["player_data"]:
            # Calculate and add the damage percentage
            player_entry["damage_percentage"] = (
                round((player_entry["dps"] / total_damage) * 100, 1)
                if total_damage > 0
                else 0.0
            )
            # Format the DPS value
            player_entry["dps"] = format_damage(player_entry["dps"])

            if player_entry["is_dead"]:
                death_count += 1

            gear_score = player_entry.get("gear_score")
            if not gear_score:
                calculate_ilvl = False
                continue

            total_ilvl += gear_score
            if gear_score > highest_ilvl:
                highest_ilvl = gear_score

        avg_ilvl = (
            None
            if not calculate_ilvl
            else round(total_ilvl / len(entry["player_data"]), 2)
        )

        encounter_info = encounter_map.get(entry["boss_name"], {})
        gate = encounter_info.get("gate")

        formatted_data.append(
            {
                "encounter_id": entry["encounter_id"],
                "instance_name": encounter_info.get("instance", None),
                "gate": gate,
                "difficulty": entry["difficulty"],
                "clear_time": convert_clear_time_to_minutes(entry["fight_duration"]),
                "fight_end": time_since_fight_ended(entry["fight_end"]),
                "max_boss_hp": format_damage(entry["max_hp"]),
                "max_boss_hp_bars": None,
                "avg_ilvl": avg_ilvl,
                "highest_ilvl": round(highest_ilvl, 1),
                "death_count": death_count,
                "player_data": sort_players_in_chunks(entry["player_data"]),
            }
        )

    return formatted_data


# endregion


# region Helper Functions
def sort_players_in_chunks(player_data, chunk_size=4):
    sorted_players = []
    for i in range(0, len(player_data), chunk_size):
        chunk = player_data[i : i + chunk_size]
        sorted_players.extend(
            sorted(chunk, key=lambda p: p["damage_percentage"], reverse=True)
        )
    return sorted_players


def convert_clear_time_to_minutes(clear_time):
    clear_time_seconds = clear_time / 1000.0

    minutes = int(clear_time_seconds // 60)
    seconds = int(clear_time_seconds % 60)

    return f"{minutes}:{seconds:02d}"


def time_since_fight_ended(timestamp):
    current_time = int(time.time())  # Current time in seconds
    elapsed_seconds = current_time - timestamp

    if elapsed_seconds < 60:
        return f"{elapsed_seconds} second{'s' if elapsed_seconds > 1 else ''} ago"
    elif elapsed_seconds < 3600:
        minutes = elapsed_seconds // 60
        return f"{minutes} minute{'s' if minutes > 1 else ''} ago"
    elif elapsed_seconds < 86400:
        hours = elapsed_seconds // 3600
        return f"{hours} hour{'s' if hours > 1 else ''} ago"
    elif elapsed_seconds < 2592000:  # Approx. 30 days
        days = elapsed_seconds // 86400
        return f"{days} day{'s' if days > 1 else ''} ago"
    elif elapsed_seconds < 31536000:  # Approx. 365 days
        months = elapsed_seconds // 2592000
        return f"{months} month{'s' if months > 1 else ''} ago"
    else:
        years = elapsed_seconds // 31536000
        return f"{years} year{'s' if years > 1 else ''} ago"


def format_damage(damage_value):
    if damage_value >= 1_000_000_000:  # 1 billion
        return f"{round(damage_value / 1_000_000_000, 1)}b"
    elif damage_value >= 1_000_000:  # 1 million
        return f"{round(damage_value / 1_000_000, 1)}m"
    elif damage_value >= 1_000:  # 1 thousand
        return f"{round(damage_value / 1_000, 1)}k"
    else:
        return str(damage_value)


# endregion
