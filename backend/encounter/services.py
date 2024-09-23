import time

from django.db.models import Q
from datetime import datetime

from constants.classes import class_name_to_class_id, subclass_to_shortened_subclass
from constants.encounters import encounter_map
from .models import Encounter


# region Raid Summary
def build_encounter_filter_query(
    source=None,
    p_name=None,
    p_class_id=None,
    p_spec=None,
    boss_name=None,
    difficulty=None,
    date_from=None,
    date_until=None,
    order_by=None,
):
    """
    Build a Q object for filtering encounters based on provided parameters.
    """
    query = Q()

    if source == "p-class":
        # Player
        if p_name:
            # Only include encounters where display_name=True for the player
            query &= Q(name__exact=p_name, display_name=True)
        if p_class_id >= 0:
            query &= Q(class_id__exact=p_class_id)
        if p_spec:
            query &= Q(subclass__exact=p_spec)

        # Encounter
        if boss_name:
            query &= Q(encounter__boss_name__exact=boss_name)
        if difficulty:
            query &= Q(encounter__difficulty__icontains=difficulty)

        # Date
        if date_from:
            date_obj = datetime.strptime(date_from, "%Y-%m-%d")
            timestamp = int(time.mktime(date_obj.timetuple()))

            query &= Q(encounter__fight_end__gte=timestamp)
        if date_until:
            date_obj = datetime.strptime(date_until, "%Y-%m-%d")
            timestamp = int(time.mktime(date_obj.timetuple()))

            query &= Q(encounter__fight_end__lte=timestamp)

        # Setup Ordering
        ordering = "-max_dps"  # Highest DPS
        if p_name:
            ordering = "-dps"
    else:
        # Player
        if p_name:
            # Only include encounters where display_name=True for the player
            query &= Q(players__name__exact=p_name, players__display_name=True)
        if p_class_id >= 0:
            query &= Q(players__class_id__exact=p_class_id)
        if p_spec:
            query &= Q(players__subclass__exact=p_spec)

        # Encounter
        if boss_name:
            query &= Q(boss_name__exact=boss_name)
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

        # Setup Ordering
        ordering = "-fight_end"  # Default ordering

        # Adjust ordering based on source
        if source == "p-party":
            ordering = "fight_duration"  # Lowest Time
            if order_by == "slow":
                ordering = "-fight_duration"  # Highest Time

    return query, ordering


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
            death_count += player_entry["death_count"]

            gear_score = player_entry.get("gear_score")
            if gear_score:
                total_ilvl += gear_score
                if gear_score > highest_ilvl:
                    highest_ilvl = gear_score

            # Add player data to the all_players list
            all_players.append(
                {
                    "name": (
                        player_entry["name"] if player_entry["display_name"] else None
                    ),
                    "class_id": player_entry["class_id"],
                    "subclass": player_entry["subclass"],
                    "s_subclass": subclass_to_shortened_subclass.get(
                        player_entry["subclass"], None
                    ),
                    "dps": format_damage(player_entry["dps"]),
                    "dps_raw": player_entry["dps"],
                    "damage_percentage": (
                        round((player_entry["dps"] / total_damage) * 100, 1)
                        if total_damage > 0
                        else 0.0
                    ),
                    "gear_score": round(player_entry["gear_score"], 2),
                    "is_dead": player_entry["is_dead"],
                    "death_timer": player_entry["death_timer"],
                    "death_count": player_entry["death_count"],
                    "party_num": player_entry["party_num"],
                    "flagged": (
                        True if entry["player"] == player_entry["name"] else False
                    ),  # Selected Player by p-class
                }
            )

        avg_ilvl = round(total_ilvl / len(all_players), 2)

        encounter_info = encounter_map.get(entry["boss_name"], {})

        formatted_data.append(
            {
                "region": entry["region"],
                "encounter_id": entry["encounter_id"],
                "instance_name": encounter_info.get("instance", None),
                "gate": encounter_info.get("gate", None),
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


# endregion


# region Encounter
def format_encounter_data(encounter: Encounter, players_data):
    formatted_players_data = []
    total_ilvl = 0
    death_count = 0
    total_damage = 0
    total_dps = 0
    highest_ilvl = 0

    # Sort players_data by 'dps' in descending order
    players_data_sorted = sorted(players_data, key=lambda x: x["dps"], reverse=True)

    for player in players_data_sorted:
        total_dps += player["dps"]

    for player in players_data_sorted:
        player_info = player["player_data"]

        gear_score = player["gear_score"]
        if gear_score:
            total_ilvl += gear_score
            if gear_score > highest_ilvl:
                highest_ilvl = gear_score

        total_damage += player_info["dmg_total"]

        formatted_players_data.append(
            {
                "name": (player["name"] if player["display_name"] else None),
                "class_id": player["class_id"],
                "subclass": player["subclass"],
                "s_subclass": subclass_to_shortened_subclass.get(
                    player["subclass"], None
                ),
                "gear_score": round(
                    player["gear_score"]
                ),  # Keep rounded to full number
                "counters": player_info["counters"],
                "dps": format_damage(player["dps"]),
                "dmg_total": format_damage(player_info["dmg_total"]),
                "dmg_percentage": (
                    round((player["dps"] / total_dps) * 100, 1)
                    if total_dps > 0
                    else 0.0
                ),
                "crit_percentage": round(
                    (player_info["crits"] / player_info["hits"]) * 100, 1
                ),
                "dmg_front_attacks_percentage": round(
                    (player_info["dmg_front_attacks"] / player_info["dmg_total"]) * 100,
                    1,
                ),
                "dmg_back_attacks_percentage": round(
                    (player_info["dmg_back_attacks"] / player_info["dmg_total"]) * 100,
                    1,
                ),
                "dmg_supp_brand_percentage": round(
                    (player_info["dmg_debuffed_supp_brand"] / player_info["dmg_total"])
                    * 100,
                    1,
                ),
                "dmg_supp_ap_percentage": round(
                    (player_info["dmg_buffed_supp_ap"] / player_info["dmg_total"])
                    * 100,
                    1,
                ),
                "dmg_supp_identity_percentage": round(
                    (player_info["dmg_buffed_supp_identity"] / player_info["dmg_total"])
                    * 100,
                    1,
                ),
                "is_dead": player["is_dead"],
                "death_timer": player["death_timer"],
                "death_count": player["death_count"],
                "party_num": player["party_num"],
                "skill_data": [],
                "buffs_data": [],
                "debuffs_data": [],
                "shields_data": [],
                "absorbs_data": [],
            }
        )

    avg_ilvl = round(total_ilvl / len(formatted_players_data), 2)

    encounter_info = encounter_map.get(encounter.boss_name, {})

    encounter_data = {
        "region": encounter.region,
        "encounter_id": encounter.id,
        "instance_name": encounter_info.get("instance", None),
        "gate": encounter_info.get("gate", None),
        "difficulty": encounter.difficulty,
        "clear_time": convert_clear_time_to_minutes(encounter.fight_duration),
        "fight_end": date_raid_clear(encounter.fight_end),
        "total_damage": format_damage(total_damage),
        "total_dps": format_damage(total_dps),
        "max_boss_hp": format_damage(encounter.max_hp),
        "avg_ilvl": avg_ilvl,
        "highest_ilvl": round(highest_ilvl, 1),
        "death_count": death_count,
        "player_data": formatted_players_data,
    }

    return encounter_data


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


def date_raid_clear(timestamp):
    # Create a datetime object from the timestamp
    dt = datetime.fromtimestamp(timestamp)

    # Format the date in the desired format
    formatted_date = dt.strftime("%d/%m/%Y %H:%M")

    return formatted_date


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
