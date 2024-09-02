import os
import requests


from ninja import Router
from allauth.socialaccount.providers.discord.views import DiscordOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Error
from allauth.socialaccount.helpers import complete_social_login
from allauth.socialaccount.models import SocialLogin, SocialToken, SocialAccount
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from datetime import datetime, timedelta, timezone

from .schemas import DiscordCompleteBody


router = Router()


DISCORD_API_ENDPOINT = "https://discord.com/api/v10"


# region Auth
@router.post("/complete/")
def discord_login(request, body: DiscordCompleteBody):
    try:
        token_data = exchange_code_for_token(body.code)
        access_token = token_data.get("access_token")
        expires_in = token_data.get("expires_in")
        if not access_token:
            return JsonResponse({"error": "Invalid token response"}, status=400)

        adapter = DiscordOAuth2Adapter(request)
        token = adapter.parse_token({"access_token": access_token})

        # Manually set expiration date
        if expires_in:
            token.expires_at = datetime.now(timezone.utc) + timedelta(
                seconds=expires_in
            )

        login = adapter.complete_login(request, app=None, token=token, response=None)
        login.state = SocialLogin.state_from_request(request)
        login.token = token
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


@login_required
@router.post("/logout/")
def discord_logout(request):
    try:
        # Get the current user's SocialToken
        social_account = SocialAccount.objects.get(
            user=request.user, provider="discord"
        )
        social_token = SocialToken.objects.get(account=social_account)

        access_token = social_token.token

        if not access_token:
            return JsonResponse({"error": "No access token found for user"}, status=400)

        # Revoke the token
        revoke_token(access_token)

        # Delete the SocialToken entry to invalidate the session
        social_token.delete()

        # Clear user session or authentication token in your application
        request.session.flush()

        return JsonResponse({"status": "success", "message": "Logged out successfully"})

    except SocialAccount.DoesNotExist:
        return JsonResponse({"error": "User's social account not found"}, status=400)
    except SocialToken.DoesNotExist:
        return JsonResponse({"error": "No social token found for user"}, status=400)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)


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


def revoke_token(access_token):
    """Revoke the user's access token with Discord."""
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/x-www-form-urlencoded",
    }
    r = requests.post(
        "%s/oauth2/token/revoke" % DISCORD_API_ENDPOINT,
        headers=headers,
        data={"token": access_token},
        auth=(os.getenv("DISCORD_CLIENT_ID"), os.getenv("DISCORD_CLIENT_SECRET")),
    )
    r.raise_for_status()


# endregion
