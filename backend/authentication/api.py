from ninja import Router
from allauth.socialaccount.providers.discord.views import DiscordOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Error
from allauth.socialaccount.helpers import complete_social_login
from allauth.socialaccount.models import SocialLogin, SocialToken, SocialAccount
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
from django.http import HttpResponse
from datetime import datetime, timedelta, timezone

from .schemas import DiscordCompleteBody
from .services import exchange_code_for_token, revoke_token


router = Router()


@router.post("/csrf")
@ensure_csrf_cookie
@csrf_exempt
def get_csrf_token(request):
    return HttpResponse()


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


""" import gzip
import binascii
import json
import io


@router.post("/read-gzip")
def read_gzip(request, hex_str: str):
    # Remove newlines and extra spaces
    hex_string = hex_str.replace("\n", "").replace(" ", "")

    try:
        # Convert hex string to binary data
        binary_data = binascii.unhexlify(hex_string)

        # Decompress the binary data using gzip
        with gzip.GzipFile(fileobj=io.BytesIO(binary_data), mode="rb") as gzip_file:
            decompressed_data = gzip_file.read()

        # Attempt to parse JSON from the decompressed data
        body = json.loads(decompressed_data)

        # Ensure the body is a dictionary (not a list)
        if not isinstance(body, dict):
            return {"error": "Invalid JSON format, expected a dictionary"}

        # Return the decompressed dictionary
        return body

    except (binascii.Error, gzip.BadGzipFile, json.JSONDecodeError) as e:
        # Return a proper error response if decompression or parsing fails
        return {"error": f"Error processing request: {str(e)}"}
 """
