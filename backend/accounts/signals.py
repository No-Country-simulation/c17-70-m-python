from django.contrib.auth.models import Group
from django.dispatch import receiver
from django.db.models.signals import post_save
from .models import Profile


@receiver(post_save, sender=Profile)
def create_or_update_user_profile(sender, instance, created, **kwargs):
    if created:
        user_instance = instance.user
        password = user_instance.password
        user_instance.set_password(password)
        user_instance.save()


@receiver(post_save, sender=Profile)
def add_user_to_admins_group(sender, instance, created, **kwargs):
    if created:
        try:
            admins = Group.objects.get(name='patient')
        except Group.DoesNotExist:
            admins = Group.objects.create(name='patient')
            admins = Group.objects.create(name='doctor')
            admins = Group.objects.create(name='administrator')
        instance.user.groups.add(admins)
