import time

from django.db.models import Q
from datetime import datetime

from constants.classes import class_name_to_class_id, subclass_to_shortened_subclass
from constants.encounters import encounter_map



# region Raid Summary
def format_raid_summary_data(data):
    formatted_data = []

    for entry in data:
        total_ilvl = 0
        death_count = 0
        total_damage = 0
        highest_ilvl = 0

        # Initialize a list to store processed player data
        all_players = []

        for player_entry in entry["players"]:
            total_damage += player_entry["dps"]

        for player_entry in entry["players"]:
            if player_entry["is_dead"]:
                death_count += 1

            gear_score = player_entry.get("gear_score")
            if gear_score:
                total_ilvl += gear_score
                if gear_score > highest_ilvl:
                    highest_ilvl = gear_score

            # Add player data to the all_players list
            all_players.append(
                {
                    "id": player_entry["id"],
                    "name": player_entry["name"],
                    "class_id": player_entry["class_id"],
                    "subclass": subclass_to_shortened_subclass.get(player_entry["subclass"], "N/A"),
                    "dps": format_damage(player_entry["dps"]),
                    "damage_percentage": (
                        round((player_entry["dps"] / total_damage) * 100, 1)
                        if total_damage > 0
                        else 0.0
                    ),
                    "gear_score": player_entry["gear_score"],
                    "is_dead": player_entry["is_dead"],
                    "party_num": player_entry["party_num"],
                }
            )

        avg_ilvl = round(total_ilvl / len(all_players), 2)

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
                "avg_ilvl": avg_ilvl,
                "highest_ilvl": round(highest_ilvl, 1),
                "death_count": death_count,
                "player_data": sort_players_in_chunks(all_players),
            }
        )

    return formatted_data


def build_encounter_filter_query(
    p_name=None,
    p_class=None,
    p_spec=None,
    encounter=None,
    difficulty=None,
    date_from=None,
    date_until=None,
):
    """
    Build a Q object for filtering encounters based on provided parameters.
    """
    query = Q()
    # Player --- Need to fix on frontend. Only yield results for said class
    #        --- no need for all classes in an encounter, only said class
    if p_name:
        query &= Q(players__name__exact=p_name)
    else:
        # If Player Name NOT defined, apply these filters
        if p_class:
            class_id = class_name_to_class_id.get(p_class)
            query &= Q(players__class_id__exact=class_id)
        if p_spec:
            # Not yet implemented, do nothing for now
            """ query &= Q(players__subclass__exact=p_spec) """

    # Encounter
    if encounter:
        boss_key, gate = encounter.split('_', 1)
        for boss_name, details in encounter_map.items():
            if details["gate"].lower() == gate and details["instance"].lower() == boss_key:
                query &= Q(boss_name__exact=boss_name)
                break

    if difficulty:
        query &= Q(difficulty__icontains=difficulty)

    # Date
    if date_from:
        date_obj = datetime.strptime(date_from, "%Y-%m-%d")
        timestamp = int(time.mktime(date_obj.timetuple()))

        query &= Q(fight_end__gte=timestamp)
    if date_until:
        date_obj = datetime.strptime(date_until, "%Y-%m-%d")
        timestamp = int(time.mktime(date_obj.timetuple()))

        query &= Q(fight_end__lte=timestamp)

    return query


# endregion


# region Helper Functions
def sort_players_in_chunks(player_data):
    # Create a dictionary to group players by party_num
    grouped_players = {}

    for player in player_data:
        party_num = player["party_num"]
        if party_num not in grouped_players:
            grouped_players[party_num] = []
        grouped_players[party_num].append(player)

    # Sort players within each party by damage_percentage
    sorted_players = []
    for party_num in sorted(grouped_players.keys()):
        sorted_party = sorted(
            grouped_players[party_num],
            key=lambda p: p["damage_percentage"],
            reverse=True,
        )
        sorted_players.extend(sorted_party)

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
