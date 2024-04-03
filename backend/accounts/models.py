from django.db import models
import uuid
from django.contrib.auth.models import User
from django.db.models.signals import post_save
class Profile(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile', verbose_name='Ususario')
    country = models.CharField(max_length=100)
    identification_document = models.CharField(max_length=100)
    class Meta:
        verbose_name = 'perfil'
        verbose_name_plural = 'perfiles'
        ordering = ['-id']

    def __str__(self) -> str:
        return self.user.username
    
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()
post_save.connect(create_user_profile, sender=User)
post_save.connect(save_user_profile, sender=User)