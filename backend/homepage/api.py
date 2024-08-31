from ninja import Router
from ninja.decorators import decorate_view
from django.views.decorators.cache import cache_page

from database.models import EncounterPreview
from .services import format_raid_summary_data


router = Router()


@router.get("/")
# @decorate_view(cache_page(2 * 60))  # seconds
def get_home_data(request):
    # Query to get the latest 20 entries, ordered by fight_end descending
    latest_encounters = EncounterPreview.objects.order_by("-fight_end")[:20]

    # Convert to a list of dictionaries to return as JSON
    data = list(latest_encounters.values())

    formatted_data = format_raid_summary_data(data)

    return formatted_data
