from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    pass

class Florist(models.Model):
    owner =  models.ForeignKey(User, on_delete=models.CASCADE, related_name="florist_owner")
    name = models.CharField(max_length=10, blank=False)

    def __str__(self):
        return f"{self.owner}: {self.name}."