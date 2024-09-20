from ninja import Router
from ninja.decorators import decorate_view
from django.views.decorators.cache import cache_page
from django.db.models import Q, Max

from encounter.models import Encounter, EncounterPlayers
from constants.encounters import encounter_map
from .services import format_raid_summary_data, build_encounter_filter_query


router = Router()


@router.get("/")
@decorate_view(cache_page(2 * 60))
def get_encounter_data(
    request,
    page: int = 1,
    p_name: str = "",
    p_class_id: int = -1,
    p_spec: str = "",
    encounter: str = "",
    difficulty: str = "",
    date_from: str = "",
    date_until: str = "",
    order_by: str = "",
    source: str = "",
):
    page_size = 25  # Number of items per page
    offset = (page - 1) * page_size  # Calculate the offset

    boss_name = ""
    if encounter:
        boss_key, gate = encounter.split("_", 1)
        for boss_n, details in encounter_map.items():
            if (
                details["gate"].lower() == gate
                and details["instance"].lower() == boss_key
            ):
                boss_name = boss_n
                break

    # Apply filters based on request parameters
    encounter_query, ordering = build_encounter_filter_query(
        source=source,
        p_name=p_name,
        p_class_id=p_class_id,
        p_spec=p_spec,
        boss_name=boss_name,
        difficulty=difficulty,
        date_from=date_from,
        date_until=date_until,
        order_by=order_by,
    )

    data = []

    # Query for source p-class
    if source == "p-class":
        # If p_name is provided, query all results for that player ordered by dps
        if p_name:
            all_player_encounters = EncounterPlayers.objects.filter(
                encounter_query
            ).order_by(ordering)[offset : offset + page_size]

            for player_entry in all_player_encounters:
                encounter = player_entry.encounter

                players = encounter.players.all()

                encounter_data = {
                    "region": encounter.region,
                    "encounter_id": encounter.id,
                    "fight_end": encounter.fight_end,
                    "fight_duration": encounter.fight_duration,
                    "boss_name": encounter.boss_name,
                    "difficulty": encounter.difficulty,
                    "max_hp": encounter.max_hp,
                    "npc_id": encounter.npc_id,
                    "player": player_entry.name,  # Selected Player
                    "players": list(
                        players.values()
                    ),  # Convert related players to a list of dicts
                }
                data.append(encounter_data)
        else:
            top_players = (
                EncounterPlayers.objects.filter(encounter_query)
                .values("name", "encounter__region")
                .annotate(max_dps=Max("dps"))
                .order_by(ordering)[offset : offset + page_size]
            )

            for player in top_players:
                encounter = (
                    EncounterPlayers.objects.filter(
                        name=player["name"],
                        encounter__region=player["encounter__region"],
                        dps=player["max_dps"],
                    )
                    .first()
                    .encounter
                )

                players = encounter.players.all()

                encounter_data = {
                    "region": encounter.region,
                    "encounter_id": encounter.id,
                    "fight_end": encounter.fight_end,
                    "fight_duration": encounter.fight_duration,
                    "boss_name": encounter.boss_name,
                    "difficulty": encounter.difficulty,
                    "max_hp": encounter.max_hp,
                    "npc_id": encounter.npc_id,
                    "player": player["name"],  # Selected Player
                    "players": list(
                        players.values()
                    ),  # Convert related players to a list of dicts
                }
                data.append(encounter_data)
    # Query for other sources
    else:
        latest_encounters = (
            Encounter.objects.filter(encounter_query)
            .order_by(ordering)  # Apply the determined ordering
            .distinct()[offset : offset + page_size]
        )

        for encounter in latest_encounters:
            # Accessing related players
            players = encounter.players.all()

            # Add encounter and related players data to the list
            encounter_data = {
                "region": encounter.region,
                "encounter_id": encounter.id,
                "fight_end": encounter.fight_end,
                "fight_duration": encounter.fight_duration,
                "boss_name": encounter.boss_name,
                "difficulty": encounter.difficulty,
                "max_hp": encounter.max_hp,
                "npc_id": encounter.npc_id,
                "player": "",  # Only used for p-class
                "players": list(
                    players.values()
                ),  # Convert related players to a list of dicts
            }
            data.append(encounter_data)

    formatted_data = format_raid_summary_data(data)

    return formatted_data
