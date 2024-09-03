import os
import requests

from ninja.security import HttpBearer
from user.models import Profile


DISCORD_API_ENDPOINT = "https://discord.com/api/v10"


class TokenAuth(HttpBearer):
    def authenticate(self, request, token):
        try:
            profile = Profile.objects.get(access_token=token)
            return profile
        except Profile.DoesNotExist:
            return None


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
