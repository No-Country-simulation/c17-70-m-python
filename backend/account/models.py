from django.db import models

# Create your models here.
class Account(models.Model):
    name = models.CharField(max_length=20)
    lastname = models.CharField(max_length=20)
    email = models.CharField(max_length=100)
    def __str__(self) -> str:
        return self.name