from django.db import models
from allauth.socialaccount.models import SocialAccount


# Create your models here.
class Profile(models.Model):
    social_account = models.OneToOneField(
        SocialAccount, on_delete=models.CASCADE, related_name="profile"
    )
    name = models.CharField(max_length=16, blank=True, null=True)
    access_token = models.CharField(max_length=64, blank=True, null=True)
    avatar = models.URLField(max_length=255, blank=True, null=True)

    def __str__(self):
        return f"{self.id} - {self.name}"


class Characters(models.Model):
    profile = models.ForeignKey(
        Profile, on_delete=models.CASCADE, related_name="characters"
    )
    name = models.CharField(max_length=16, blank=True, null=True, unique=True)
    display_name = models.BooleanField(default=True)
    display_logs = models.BooleanField(default=True)

    def __str__(self):
        return f"Character: {self.name} (Profile: {self.profile.name}, id: {self.profile.id})"
