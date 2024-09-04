from ninja import NinjaAPI
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
from django.http import HttpResponse

from .config import app_configs

from authentication.api import router as authentication_router
from meter_logs.api import router as meter_logs_router
from user.api import router as user_router
from encounter.api import router as encounter_router


api_private = NinjaAPI(csrf=True, **app_configs, urls_namespace="api")

api_private.add_router("auth", authentication_router, tags=["Auth"])
api_private.add_router("user", user_router, tags=["User"])
api_private.add_router("encounter", encounter_router, tags=["Encounter"])


@api_private.post("/csrf")
@ensure_csrf_cookie
@csrf_exempt
def get_csrf_token(request):
    return HttpResponse()


api_public = NinjaAPI(**app_configs, urls_namespace="health")

api_public.add_router("log", meter_logs_router, tags=["Database"])


@api_public.get("/")
async def root(request):
    return {"message": "Hello World"}


@api_public.get("/health")
async def health(request):
    return {"message": "OK"}
