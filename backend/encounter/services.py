import time

from django.db.models import Q
from datetime import datetime

from constants.game import (
    supp_list,
    source_order,
    type_order,
    status_special_cases,
    allowed_status_groups,
    allowed_buffs,
    allowed_debuffs,
)
from constants.classes import classes_map, subclass_to_shortened_subclass
from constants.encounters import encounter_map
from constants.skill_info import (
    esther_dict,
    skills_dict,
    status_effect_dict,
    items_dict,
    special_skills_dict,
)
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
            p_name = p_name.capitalize()  # Enforce "Krathus" instead of "krAthUs"
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
    max_party_num = max(
        player["party_num"] for player in players_data
    )  # Get max party number
    party_synergy_data = [[] for _ in range(max_party_num + 1)]
    f_players_data = []
    formatted_esther_data = (
        None  # TODO: Add Esther Data -- Probably need to refactor data storage
    )
    total_ilvl = 0
    total_damage = 0
    total_dps = 0
    total_num_parties = 0
    highest_ilvl = 0

    # Sort players_data by 'dps' in descending order
    players_data_sorted = sorted(players_data, key=lambda x: x["dps"], reverse=True)

    for player in players_data_sorted:
        total_damage += player["player_data"]["dmg_total"]
        total_dps += player["dps"]
        if (player["party_num"] + 1) > total_num_parties:
            total_num_parties += 1

    for player in players_data_sorted:
        player_info = player["player_data"]

        gear_score = player["gear_score"]
        if gear_score:
            total_ilvl += gear_score
            if gear_score > highest_ilvl:
                highest_ilvl = gear_score

        skills_data, arcana_cards_data = format_skills_data(
            player_info["skills"],
            player_info["dmg_total"],
            player_info["casts"],
            player["class_id"],
            encounter.fight_duration,
        )

        # Update the corresponding player's party synergy data
        party_synergy_data[player["party_num"]], class_synergy_data = (
            format_status_effects_data(
                player["class_id"],
                party_synergy_data[player["party_num"]],
                player_info["buffs"],
                player_info["debuffs"],
            )
        )

        f_players_data.append(
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
                "dmg_total_raw": player_info["dmg_total"],
                "dmg_percentage": (
                    round((player_info["dmg_total"] / total_damage) * 100, 1)
                    if total_damage > 0
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
                "death_timer": (
                    player["death_timer"] if player["death_timer"] > 0 else None
                ),
                "death_count": player["death_count"],
                "party_num": player["party_num"],
                "synergy_data": class_synergy_data,
                "skills_data": skills_data,
                "arcana_cards_data": arcana_cards_data,
            }
        )

    # Sort each party's synergy data before outputting it
    ordered_party_synergy_data = order_synergy_data(party_synergy_data)

    order_skill_synergy_data_for_players(f_players_data)

    # After processing all players, format player synergy data
    formatted_players_data = create_player_synergy_data(
        f_players_data, ordered_party_synergy_data
    )

    avg_ilvl = round(total_ilvl / len(formatted_players_data), 2)

    encounter_info = encounter_map.get(encounter.boss_name, {})

    encounter_data = {
        "region": encounter.region,
        "encounter_id": encounter.id,
        "instance_name": encounter_info["instance"],
        "gate": encounter_info["gate"],
        "difficulty": encounter.difficulty,
        "clear_time": convert_clear_time_to_minutes(encounter.fight_duration),
        "fight_end": date_raid_clear(encounter.fight_end),
        "total_damage": format_damage(total_damage),
        "total_dps": format_damage(total_dps),
        "max_boss_hp": format_damage(encounter.max_hp),
        "avg_ilvl": avg_ilvl,
        "highest_ilvl": round(highest_ilvl, 1),
        "num_parties": total_num_parties,
        "synergy_data": ordered_party_synergy_data,
        "player_data": formatted_players_data,
        "esther_data": formatted_esther_data,
    }

    return encounter_data


# endregion


# region Helper Functions


# region Skills
def format_skills_data(
    skills_data: dict,
    player_total_damage: int,
    player_total_casts: int,
    class_id: int,
    fight_duration: int,
):
    skills_data_list = []
    arcana_cards_data = None
    arcana_cards_list = []
    arcana_total_cards_drawn = 0
    arcana_highest_card_draw_value = 0

    # Check if it's Arcanist class and calculate Total Cards Drawn
    if class_id == 202:
        for skill_id, skill_info in skills_data.items():
            # Get skill related info
            _, img_src = get_skill_info(skill_id)
            if img_src.lower().startswith("ar_carddeck_tooltip"):
                arcana_total_cards_drawn += skill_info.get("casts", 0)

                if arcana_highest_card_draw_value < skill_info.get("casts"):
                    arcana_highest_card_draw_value = skill_info.get("casts")

    for skill_id, skill_info in skills_data.items():
        skill_total_damage = skill_info.get("totalDamage", 0)
        skill_hits = skill_info.get("hits", 0)

        # Get skill related info
        name, img_src = get_skill_info(skill_id)

        # Check if the skill is a Card from Arcanist class by checking the img_src
        if class_id == 202 and img_src.lower().startswith("ar_carddeck_tooltip"):
            arcana_cards_list.append(
                {
                    "name": name,
                    "img_src": img_src,
                    "draws": skill_info.get("casts", 0),
                    "draw_percentage": round(
                        (skill_info.get("casts", 0) / arcana_total_cards_drawn) * 100, 1
                    ),
                    "display_percentage": round(
                        (skill_info.get("casts", 0) / arcana_highest_card_draw_value)
                        * 100,
                        1,
                    ),
                }
            )
            continue

        skill_synergy_dict = {}
        if skill_info.get("buffedBy"):
            for buff_id, buff_damage in skill_info["buffedBy"].items():
                # Process damage
                process_status_effect("buff", buff_id, buff_damage, skill_synergy_dict)
        if skill_info.get("debuffedBy"):
            for debuff_id, debuff_damage in skill_info["debuffedBy"].items():
                # Process damage
                process_status_effect(
                    "debuff", debuff_id, debuff_damage, skill_synergy_dict
                )

        skills_data_list.append(
            {
                "name": name,
                "img_src": img_src,
                "dps": format_damage(skill_info.get("dps", 0)),
                "dmg_total": format_damage(skill_total_damage),
                "dmg_total_raw": skill_total_damage,
                "dmg_percentage": (
                    round((skill_total_damage / player_total_damage) * 100, 1)
                    if player_total_damage > 0
                    else 0.0
                ),
                "crit_percentage": (
                    round((skill_info.get("crits", 0) / skill_hits) * 100, 1)
                    if skill_hits > 0
                    else 0.0
                ),
                "front_attacks_percentage": (
                    round((skill_info.get("frontAttacks", 0) / skill_hits) * 100, 1)
                    if skill_hits > 0
                    else 0.0
                ),
                "back_attacks_percentage": (
                    round((skill_info.get("backAttacks", 0) / skill_hits) * 100, 1)
                    if skill_hits > 0
                    else 0.0
                ),
                "dmg_supp_brand_percentage": (
                    round(
                        (skill_info.get("debuffedBySupport", 0) / skill_total_damage)
                        * 100,
                        1,
                    )
                    if skill_total_damage > 0
                    else 0.0
                ),
                "dmg_supp_ap_percentage": (
                    round(
                        (skill_info.get("buffedBySupport", 0) / skill_total_damage)
                        * 100,
                        1,
                    )
                    if skill_total_damage > 0
                    else 0.0
                ),
                "dmg_supp_identity_percentage": (
                    round(
                        (skill_info.get("buffedByIdentity", 0) / skill_total_damage)
                        * 100,
                        1,
                    )
                    if skill_total_damage > 0
                    else 0.0
                ),
                "casts": skill_info.get("casts", 0),
                "cpm": (
                    round(skill_info.get("casts", 0) / (fight_duration / 1000 / 60), 1)
                    if fight_duration > 0
                    else 0.0
                ),
                "synergy_data": skill_synergy_dict,
            }
        )

    # Sort the skills_data_list by 'dmg_total_raw' in descending order
    skills_data_list_sorted = sorted(
        skills_data_list, key=lambda x: x["dmg_total_raw"], reverse=True
    )

    if class_id == 202:
        # Sort the arcana_cards_list by 'draws' in descending order
        arcana_cards_list_sorted = sorted(
            arcana_cards_list, key=lambda x: x["draws"], reverse=True
        )

        arcana_cards_data = {
            "total_cards_drawn": arcana_total_cards_drawn,
            "draws_per_min": (
                round((arcana_total_cards_drawn / (fight_duration / 1000 / 60)), 1)
                if fight_duration > 0
                else 0.0
            ),
            "cards_data": arcana_cards_list_sorted,
        }

    return skills_data_list_sorted, arcana_cards_data


def get_skill_info(skill_id: str):
    # Try to get info from special_skills_dict
    if skill_id in special_skills_dict:
        return (
            special_skills_dict[skill_id]["name"],
            special_skills_dict[skill_id]["img_src"],
        )

    # Try to get info from skills_dict
    skill_related_info = skills_dict.get(str(skill_id), {})
    if skill_related_info:
        name = skill_related_info.get("name", f"Unknown Skill {skill_id}")
        img_src = skill_related_info.get("icon", "default")
        return clean_name(name), img_src

    # Try to get info from items_dict
    item_related_info = items_dict.get(str(skill_id), {})
    if item_related_info:
        name = item_related_info.get("itemname", f"Unknown Item {skill_id}")
        img_src = item_related_info.get("icon", "default")
        return clean_name(name), img_src

    return f"Unknown Skill {skill_id}", "default"


def clean_name(name):
    return name.replace("(Bound)", "", 1).replace("(bound)", "", 1).strip()


# endregion


# region Status Effects
def format_status_effects_data(
    class_id, party_synergy_list: list, buffs_data, debuffs_data
):
    class_synergy_dict = {}

    for buff_id, buff_damage in buffs_data.items():
        # Process damage
        buff_info, buff_data = process_status_effect(
            "buff", buff_id, buff_damage, class_synergy_dict
        )

        if not buff_info or not buff_data:
            continue

        # Find an existing entry with the same "source" and "type"
        existing_buff = next(
            (
                buff
                for buff in party_synergy_list
                if buff["source"] == buff_data["source"]
                and buff["type"] == buff_data["type"]
            ),
            None,
        )

        # If the entry exists, check if the buff is already in "data"
        if existing_buff:
            existing_ids = set(existing_buff["data"])

            # If buff is not in "data", add it
            if buff_info["id"] not in existing_ids:
                existing_buff["data"].append(buff_info["id"])
        # If no entry with the same "source" and "type", create a new one
        else:
            if buff_data["source"] == "Deathblade" and buff_data["type"] == "buffs":
                description = "Move Speed +<FONT COLOR='#99ff99'>12.8%</FONT>. Atk. Speed +<FONT COLOR='#99ff99'>12.8%</FONT>."
            else:
                description = buff_info["desc"]

            party_synergy_list.append(
                {
                    "source": buff_data["source"],
                    "type": buff_data["type"],
                    "description": description,
                    "img_src": buff_info["icon"],
                    "data": [buff_info["id"]],
                }
            )

    for debuff_id, debuff_damage in debuffs_data.items():
        # Process damage
        debuff_info, debuff_data = process_status_effect(
            "debuff", debuff_id, debuff_damage, class_synergy_dict
        )

        if not debuff_info or not debuff_data:
            continue

        # Find an existing entry with the same "source" and "type"
        existing_debuff = next(
            (
                debuff
                for debuff in party_synergy_list
                if debuff["source"] == debuff_data["source"]
                and debuff["type"] == debuff_data["type"]
            ),
            None,
        )

        # If the entry exists, check if the buff is already in "data"
        if existing_debuff:
            existing_ids = set(existing_debuff["data"])

            # If buff is not in "data", add it
            if debuff_info["id"] not in existing_ids:
                existing_debuff["data"].append(debuff_info["id"])
        # If no entry with the same "source" and "type", create a new one
        else:
            party_synergy_list.append(
                {
                    "source": debuff_data["source"],
                    "type": debuff_data["type"],
                    "description": debuff_info["desc"],
                    "img_src": debuff_info["icon"],
                    "data": [debuff_info["id"]],
                }
            )

    return party_synergy_list, class_synergy_dict


def process_status_effect(type, status_id, status_damage, status_dict):
    # Get debuff data
    status_info = get_status_effect_info(status_id)

    # If debuff not found, skip to the next one
    if not status_info:
        return None, None

    if type == "buff":
        # Check if it's a valid buff
        status_data = validate_buff(status_info)
        if not status_data:
            return None, None
    elif type == "debuff":
        # Check if it's a valid debuff
        status_data = validate_debuff(status_info)
        if not status_data:
            return None, None
    else:
        return None, None

    # Create the class synergy key
    class_synergy_key = f"{status_data['source']}_{status_data['type']}"

    # Populate class_synergy_dict
    if class_synergy_key in status_dict:
        status_dict[class_synergy_key] += status_damage
    else:
        status_dict[class_synergy_key] = status_damage

    return status_info, status_data


def get_status_effect_info(status_effect_id: str):
    status_effect_info = None

    # Try to get info from buffs_dict
    if status_effect_id in status_effect_dict:
        status_effect_info = status_effect_dict[status_effect_id]

    return status_effect_info


def validate_buff(status_effect):
    for source_class, allowed_buffs_data in allowed_buffs.items():
        for buff_group, buff_group_data in allowed_buffs_data.items():
            for buff_category, buff_ids_data in buff_group_data.items():
                for buff_id in buff_ids_data:
                    if (
                        (
                            buff_category == "buffs"
                            and str(status_effect["id"]).startswith(str(buff_id))
                        )
                        or (buff_category == "group" and status_effect["id"] == buff_id)
                    ) and buff_group in allowed_status_groups:
                        return {
                            "id": buff_id,
                            "source": source_class,
                            "type": buff_group,
                        }

    return None


def validate_debuff(status_effect):
    for source_class, allowed_debuffs_data in allowed_debuffs.items():
        for debuff_group, debuff_group_data in allowed_debuffs_data.items():
            for debuff_category, debuff_ids_data in debuff_group_data.items():
                for debuff_id in debuff_ids_data:
                    if (
                        (
                            debuff_category == "debuffs"
                            and str(status_effect["id"]).startswith(str(debuff_id))
                        )
                        or (
                            debuff_category == "group"
                            and status_effect["id"] == debuff_id
                        )
                    ) and debuff_group in allowed_status_groups:
                        return {
                            "id": debuff_id,
                            "source": source_class,
                            "type": debuff_group,
                        }

    return None


def create_player_synergy_data(f_players_data, party_synergy_data):
    for player in f_players_data:
        # Initialize a list with zeroes for each buff type (using the length of the longest party's buffs)
        synergy_data = [0] * len(party_synergy_data[player["party_num"]])

        # Populate the synergy data based on the buffs in the player's party
        for index, buff in enumerate(party_synergy_data[player["party_num"]]):
            source_type_key = f"{buff['source']}_{buff['type']}"

            # If it's a support or a special case
            if (
                source_type_key.startswith(tuple(supp_list))
                or source_type_key in status_special_cases
            ):
                special_case_data = handle_special_case(buff, player)
                synergy_data[index] = special_case_data
            else:
                # Check if the player's synergy data matches the buff's source and type
                synergy_info = player["synergy_data"].get(source_type_key, 0.0)

                if synergy_info > 0:
                    synergy_data[index] = round(
                        (synergy_info / player["dmg_total_raw"]) * 100, 1
                    )
                else:
                    synergy_data[index] = synergy_info

        for skill in player["skills_data"]:
            skill_synergy_data = [0] * len(party_synergy_data[player["party_num"]])

            # Populate the synergy data based on the buffs in the player's party
            for index, buff in enumerate(party_synergy_data[player["party_num"]]):
                source_type_key = f"{buff['source']}_{buff['type']}"

                # If it's a support or a special case
                if (
                    source_type_key.startswith(tuple(supp_list))
                    or source_type_key in status_special_cases
                ):
                    special_case_data = handle_special_case(buff, skill)
                    skill_synergy_data[index] = special_case_data
                else:
                    # Check if the player's synergy data matches the buff's source and type
                    synergy_info = skill["synergy_data"].get(source_type_key, 0.0)

                    if synergy_info > 0:
                        skill_synergy_data[index] = round(
                            (synergy_info / skill["dmg_total_raw"]) * 100, 1
                        )
                    else:
                        skill_synergy_data[index] = synergy_info

            skill["synergy_data"] = skill_synergy_data

        player["synergy_data"] = synergy_data

    return f_players_data


def handle_special_case(buff, data_dict):
    if buff["type"] == "atkPwr":
        return data_dict["dmg_supp_ap_percentage"]
    if buff["type"] == "brand":
        return data_dict["dmg_supp_brand_percentage"]
    if buff["type"] == "identity":
        return data_dict["dmg_supp_identity_percentage"]


def order_synergy_data(party_synergy_data):
    def sort_key(item):
        # Sort by source first (Artist -> Bard -> Paladin -> Alphabetical)
        source_index = (
            source_order.index(item["source"])
            if item["source"] in source_order
            else float("inf")
        )
        # Sort by type (atkPwr -> brand -> identity -> synergy -> buffs -> Alphabetical)
        type_index = (
            type_order.index(item["type"])
            if item["type"] in type_order
            else float("inf")
        )
        return (source_index, item["source"], type_index, item["type"])

    # Process and sort each party's synergy data
    for i in range(len(party_synergy_data)):
        party_synergy_data[i] = sorted(party_synergy_data[i], key=sort_key)

    return party_synergy_data


def order_skill_synergy_data_for_players(players_data):
    def sort_key(item):
        # Sort by source first (Artist -> Bard -> Paladin -> etc.)
        key = item[0]  # Assuming key is in the format 'source_type'
        source, data_type = key.split("_")

        # Sort by source first (Artist -> Bard -> Paladin -> etc.)
        source_index = (
            source_order.index(source) if source in source_order else float("inf")
        )
        # Sort by type (identity -> atkPwr -> brand -> synergy)
        type_index = (
            type_order.index(data_type) if data_type in type_order else float("inf")
        )

        return (source_index, source, type_index, data_type)

    # Loop over each player and reorder their skill synergy data
    for player in players_data:
        for skill in player["skills_data"]:
            if "synergy_data" in skill and skill["synergy_data"]:
                # Sort the synergy data based on the custom sort key
                sorted_synergy_data = sorted(
                    skill["synergy_data"].items(), key=sort_key
                )

                # Convert the sorted list of tuples back into a dictionary
                skill["synergy_data"] = dict(sorted_synergy_data)

    return players_data


# endregion


# region General
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

# endregion
