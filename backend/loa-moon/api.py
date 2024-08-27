from ninja import NinjaAPI

from .config import app_configs

from homepage.api import router as homepage_router


api = NinjaAPI(csrf=True, **app_configs, urls_namespace="api")


api.add_router("home", homepage_router, tags=["HomePage"])


api_health = NinjaAPI(csrf=True, **app_configs, urls_namespace="health")


@api_health.get("/")
async def root(request):
    return {"message": "Hello World"}


@api_health.get("/health")
async def health(request):
    return {"message": "OK"}
