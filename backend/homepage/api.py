from ninja import Router
from ninja.decorators import decorate_view
from django.views.decorators.cache import cache_page

from homepage.models import EncounterPreview
from .services import format_raid_summary_data


router = Router()


@router.get("/")
# @decorate_view(cache_page(2 * 60))  # seconds
def get_home_data(request):
    # Query to get the latest 20 entries, ordered by fight_end descending
    latest_encounters = EncounterPreview.objects.prefetch_related("players").order_by(
        "-fight_end"
    )[:20]

    data = []
    for encounter in latest_encounters:
        # Accessing related players
        players = encounter.players.all()

        # Add encounter and related players data to the list
        encounter_data = {
            "encounter_id": encounter.id,
            "fight_end": encounter.fight_end,
            "fight_duration": encounter.fight_duration,
            "boss_name": encounter.boss_name,
            "difficulty": encounter.difficulty,
            "max_hp": encounter.max_hp,
            "max_hp_bars": encounter.max_hp_bars,
            "npc_id": encounter.npc_id,
            "players": list(
                players.values()
            ),  # Convert related players to a list of dicts
        }
        data.append(encounter_data)

    formatted_data = format_raid_summary_data(data)

    return formatted_data
