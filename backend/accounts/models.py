import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
from datetime import date, timezone
from datetime import date
from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.contrib.auth.hashers import make_password
from django.urls import reverse
from django.utils import timezone


class CustomUser(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user_photo = models.URLField(blank=True, null=True, max_length=500)
    username = models.CharField(
        max_length=255, unique=True, null=False, blank=False)
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30, default=" ")
    last_name = models.CharField(max_length=30, default=" ")
    id_number = models.PositiveIntegerField(unique=True, default=0)
    birthdate = models.DateField(default=date.today)
    country = models.CharField(max_length=100, default='ARGENTINA')
    gender = models.CharField(max_length=20, default="")
    phone_number = models.CharField(max_length=100, default='0000')

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['user_photo', 'first_name', 'last_name', 'id_number',
                       'birthdate', 'country', 'gender', 'phone_number']

    def save(self, *args, **kwargs):
        if not self.username:
            self.username = self.email
        if self.password:
            self.password = make_password(self.password)
        super().save(*args, **kwargs)

    is_active = models.BooleanField(default=True)

    groups = models.ManyToManyField(
        Group, related_name='custom_users', blank=True
    )

    user_permissions = models.ManyToManyField(
        Permission, related_name='custom_user_permissions', blank=True
    )

class Doctor(CustomUser):
    specialty = models.CharField(max_length=100)

    def get_absolute_url(self):
        return reverse('doctor-detail', args=[str(self.id)])

    class Meta:
        verbose_name = 'Doctor'
        verbose_name_plural = 'Doctors'
class Administrator(CustomUser):
    class meta:
        verbose_name = 'Administrator'
        verbose_name_plural = 'Administrators'
class Patient(CustomUser):
    def get_absolute_url(self):
        return reverse('doctor-detail', args=[str(self.id)])

    class Meta:
        verbose_name = 'Patient'
        verbose_name_plural = 'Patients'



class Medication(models.Model):

    photo_medicament = models.URLField(blank=True, null=True, max_length=10000)
    name = models.CharField(max_length=100)
    Frequency = models.CharField(max_length=100)
    quantity = models.CharField(max_length=100)
    description = models.TextField()

class Diagnosis(models.Model):

    issue = models.TextField(default="")
    patient = models.ForeignKey(
        Patient, on_delete=models.CASCADE, related_name='patient')
    date = models.DateField(default=date.today) 
    medications = models.ManyToManyField(Medication)


