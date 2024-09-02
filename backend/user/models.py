from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=16, blank=True, null=True)
    display_name = models.BooleanField(default=True)
    display_logs = models.BooleanField(default=True)
    access_token = models.CharField(max_length=64, blank=True, null=True)
