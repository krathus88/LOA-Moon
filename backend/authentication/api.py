import os
import requests

from ninja import Router
from allauth.socialaccount.providers.discord.views import DiscordOAuth2Adapter
from allauth.socialaccount.helpers import complete_social_login
from allauth.socialaccount.models import SocialLogin
from django.http import JsonResponse
from allauth.socialaccount.providers.oauth2.client import OAuth2Error

from .schemas import DiscordCompleteBody


router = Router()


DISCORD_API_ENDPOINT = "https://discord.com/api/v10"


# region Auth
@router.post("/complete/")
def discord_login(request, body: DiscordCompleteBody):
    try:
        # Exchange the authorization code for an access token
        token_data = exchange_code_for_token(body.code)

        access_token = token_data.get("access_token")
        if not access_token:
            return JsonResponse({"error": "Invalid token response"}, status=400)

        adapter = DiscordOAuth2Adapter(request)
        token = adapter.parse_token({"access_token": access_token})

        # Complete the login process
        login = adapter.complete_login(request, app=None, token=token, response=None)
        login.state = SocialLogin.state_from_request(request)
        complete_social_login(request, login)

    except OAuth2Error as e:
        return JsonResponse({"error": str(e)}, status=400)

    if login and login.is_existing:
        return JsonResponse({"status": "success", "message": "Logged in successfully"})
    else:
        return JsonResponse(
            {
                "status": "success",
                "message": "Account created and logged in successfully",
            }
        )


# endregion


# region Helper Functions
def exchange_code_for_token(code):
    data = {
        "grant_type": "authorization_code",
        "code": code,
        "redirect_uri": os.getenv("DISCORD_REDIRECT_URI"),
    }
    headers = {"Content-Type": "application/x-www-form-urlencoded"}
    r = requests.post(
        "%s/oauth2/token" % DISCORD_API_ENDPOINT,
        data=data,
        headers=headers,
        auth=(os.getenv("DISCORD_CLIENT_ID"), os.getenv("DISCORD_CLIENT_SECRET")),
    )
    r.raise_for_status()
    return r.json()


# endregion
