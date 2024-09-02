import os

from django.shortcuts import redirect
from ninja import Router


router = Router()


@router.get("/")
def discord_callback(request):
    user = request.user

    if user.is_authenticated:
        print("User is logged in")
        return redirect(os.getenv("LOGGED_IN_REDIRECT_URL"))
    else:
        print("User is not logged.")
