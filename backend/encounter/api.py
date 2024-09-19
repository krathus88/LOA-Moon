from ninja import Router
from ninja.decorators import decorate_view
from django.views.decorators.cache import cache_page
from django.db.models import Max

from encounter.models import Encounter
from .services import format_raid_summary_data, build_encounter_filter_query


router = Router()


@router.get("/")
@decorate_view(cache_page(2 * 60))
def get_home_data(
    request,
    page: int = 1,
    p_name: str = "",
    p_class_id: int = -1,
    p_spec: str = "",
    encounter: str = "",
    difficulty: str = "",
    date_from: str = "",
    date_until: str = "",
    order_by: str = "high",
    source: str = "",
):
    page_size = 25  # Number of items per page
    offset = (page - 1) * page_size  # Calculate the offset

    # Apply filters based on request parameters
    encounter_query, ordering = build_encounter_filter_query(
        source=source,
        p_name=p_name,
        p_class_id=p_class_id,
        p_spec=p_spec,
        encounter=encounter,
        difficulty=difficulty,
        date_from=date_from,
        date_until=date_until,
        order_by=order_by,
    )

    # Query for encounters
    if source == "p-class":
        latest_encounters = (
            Encounter.objects.filter(encounter_query)
            .annotate(max_dps=Max("players__dps"))  # Annotate with max dps
            .order_by(ordering)  # Order by max_dps
            .distinct()[offset : offset + page_size]
        )
    else:
        latest_encounters = (
            Encounter.objects.filter(encounter_query)
            .order_by(ordering)  # Apply the determined ordering
            .distinct()[offset : offset + page_size]
        )

    data = []
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
            "players": list(
                players.values()
            ),  # Convert related players to a list of dicts
        }
        data.append(encounter_data)

    formatted_data = format_raid_summary_data(data)

    return formatted_data
