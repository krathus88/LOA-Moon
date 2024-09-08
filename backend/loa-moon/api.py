from ninja import NinjaAPI

from .config import app_configs

from authentication.api import router as authentication_router
from meter_logs.api import router as meter_logs_router
from user.api import router as user_router
from encounter.api import router as encounter_router


api = NinjaAPI(csrf=True, **app_configs, urls_namespace="api")

api.add_router("auth", authentication_router, tags=["Auth"])
api.add_router("log", meter_logs_router, tags=["Database"])
api.add_router("user", user_router, tags=["User"])
api.add_router("encounter", encounter_router, tags=["Encounter"])


@api.get("/")
async def root(request):
    return {"message": "Hello World"}


@api.get("/health")
async def health(request):
    return {"message": "OK"}
