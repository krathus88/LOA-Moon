import uuid

from ninja import Router
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from allauth.socialaccount.models import SocialAccount

from .models import Profile


router = Router()


@router.get("/")
async def user_login(request):
    user = request.user

    if user.is_authenticated:
        # Try to get the Profile instance; if it does not exist, create it
        profile = Profile.objects.filter(social_account__user=user).first()

        # If User doesn't have a Profile yet
        if not profile:
            # Fetch the SocialAccount instance for the user
            social_account = get_object_or_404(SocialAccount, user=user)

            # Create a new Profile
            profile = Profile.objects.create(social_account=social_account)

            extra_data = social_account.extra_data

            # Extract id and avatar from extra_data
            user_id = extra_data.get("id")
            avatar = extra_data.get("avatar")

            if user_id and avatar:
                # Determine the file extension based on avatar prefix
                file_extension = ".gif" if avatar.startswith("a_") else ".webp"

                # Construct the avatar URL
                avatar_url = f"https://cdn.discordapp.com/avatars/{user_id}/{avatar}{file_extension}?size=32"

                # Update the profile's avatar field
                profile.avatar = avatar_url
                profile.save()

        # If User already has a Profile
        else:
            pass

        # Return the profile information
        display_name = profile.name if profile.name else user.username
        return {"name": display_name, "avatar": profile.avatar}
    else:
        return JsonResponse({"message": "Unauthorized"}, status=401)


@router.post("/atoken/generate")
async def generate_access_token(request):
    user = request.user

    if not user.is_authenticated:
        return JsonResponse({"message": "Unauthorized"}, status=401)

    # Get or create the user's profile
    profile, created = Profile.objects.get_or_create(social_account__user=user)

    new_token = str(uuid.uuid4())

    # Update the profile with the new access token
    profile.access_token = new_token
    profile.save()

    return JsonResponse({"access_token": new_token})


@router.post("/atoken/revoke")
async def revoke_access_token(request):
    user = request.user

    if not user.is_authenticated:
        return JsonResponse({"message": "Unauthorized"}, status=401)

    # Get the user's profile
    profile = get_object_or_404(Profile, social_account__user=user)

    # Revoke the access token by clearing it
    profile.access_token = None
    profile.save()

    return JsonResponse({"message": "Access token revoked"})
