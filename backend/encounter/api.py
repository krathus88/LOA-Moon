from ninja import Router
from ninja.decorators import decorate_view
from django.views.decorators.cache import cache_page

from encounter.models import Encounter
from .services import format_raid_summary_data, build_encounter_filter_query


router = Router()


@router.get("/")
@decorate_view(cache_page(2 * 60))
async def get_home_data(
    request,
    page: int = 1,
    p_name: str = "",
    p_class: str = "",
    p_spec: str = "",
    encounter: str = "",
    difficulty: str = "",
    date_from: str = "",
    date_until: str = "",
):
    page_size = 25  # Number of items per page
    offset = (page - 1) * page_size  # Calculate the offset

    # Apply filters based on request parameters
    encounter_query = build_encounter_filter_query(
        p_name=p_name,
        p_class=p_class,
        p_spec=p_spec,
        encounter=encounter,
        difficulty=difficulty,
        date_from=date_from,
        date_until=date_until,
    )

    latest_encounters = (
        Encounter.objects.filter(encounter_query)
        .prefetch_related("players")
        .order_by("-fight_end")[offset : (offset + page_size)]
    )

    data = []
    for f_encounter in latest_encounters:
        # Accessing related players
        players = f_encounter.players.all()

        # Add encounter and related players data to the list
        encounter_data = {
            "encounter_id": f_encounter.id,
            "fight_end": f_encounter.fight_end,
            "fight_duration": f_encounter.fight_duration,
            "boss_name": f_encounter.boss_name,
            "difficulty": f_encounter.difficulty,
            "max_hp": f_encounter.max_hp,
            "max_hp_bars": f_encounter.max_hp_bars,
            "npc_id": f_encounter.npc_id,
            "players": list(
                players.values()
            ),  # Convert related players to a list of dicts
        }
        data.append(encounter_data)

    formatted_data = format_raid_summary_data(data)

    return formatted_data
