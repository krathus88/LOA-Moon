import os

from django.http import HttpResponseForbidden


class RestrictIPMiddleware:
    ALLOWED_IPS_env = os.getenv("ALLOWED_IPS")
    if ALLOWED_IPS_env:
        ALLOWED_IPS_env = ALLOWED_IPS_env.split(",")

    ALLOWED_IPS = ALLOWED_IPS_env

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        ip = request.META.get("REMOTE_ADDR")
        if ip not in self.ALLOWED_IPS:
            return HttpResponseForbidden("Access Denied")
        return self.get_response(request)
