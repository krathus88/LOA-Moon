from ninja import Router
from django.contrib.auth.models import User
from django.http import JsonResponse

from .models import Profile

router = Router()


@router.get("/")
def user_login(request):
    user = request.user

    if user.is_authenticated:
        """ print("User is logged in")
        print("User details:")
        print(f"Username: {user.username}")
        print(f"Email: {user.email}")
        print(f"First name: {user.first_name}")
        print(f"Last name: {user.last_name}")
        print("Full user object:", user)
 """
        # Check if a Profile instance exists for the user
        profile, created = Profile.objects.get_or_create(user=user)

        # Return Profile.name if it exists, otherwise return user.username
        display_name = profile.name if profile.name else user.username

        return {"name": display_name}
    else:
        return JsonResponse({"message": "Unauthorized"}, status=401)
