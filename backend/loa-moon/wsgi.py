"""
WSGI config for loa-moon project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/howto/deployment/wsgi/
"""

import os
from pathlib import Path
from dotenv import load_dotenv
from django.core.wsgi import get_wsgi_application
from whitenoise import WhiteNoise


load_dotenv()
BASE_DIR = Path(__file__).resolve().parent.parent

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "loa-moon.settings.prod")

application = get_wsgi_application()
application = WhiteNoise(
    application, root=os.path.join(BASE_DIR, "loa-moon/staticfiles")
)
app = application
