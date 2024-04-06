from django.db import models
import uuid
class Account(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    country = models.CharField(max_length=100)
    identification_document = models.CharField(max_length=100)
    def __str__(self) -> str:
        return self.username


