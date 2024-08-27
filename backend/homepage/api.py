from ninja import Router
from ninja.decorators import decorate_view
from django.views.decorators.cache import cache_page


router = Router()


@router.get("/")
@decorate_view(cache_page(10 * 60))  # seconds
async def get_home_data(request):

    return {"hello": "world"}
