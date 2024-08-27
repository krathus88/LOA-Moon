import os
from dotenv import load_dotenv


load_dotenv()


from .base import *


print("\n\033[91mCAUTION!! YOU'RE CONNECTED TO THE PRODUCTION SETTINGS.\033[0m\n")


# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.getenv("SECRET_KEY")


# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

ALLOWED_HOSTS_env = os.getenv("ALLOWED_HOSTS")
if ALLOWED_HOSTS_env:
    ALLOWED_HOSTS_env = ALLOWED_HOSTS_env.split(",")

ALLOWED_HOSTS = ALLOWED_HOSTS_env


# Database
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": os.getenv("PRODUCTION_DATABASE_URL_DATABASE"),
        "USER": os.getenv("PRODUCTION_DATABASE_URL_USER"),
        "PASSWORD": os.getenv("PRODUCTION_DATABASE_URL_PASSWORD"),
        "HOST": os.getenv("PRODUCTION_DATABASE_URL_HOST"),
        "PORT": os.getenv("PRODUCTION_DATABASE_URL_PORT"),
    }
}
