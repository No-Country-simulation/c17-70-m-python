import uuid
from datetime import date
from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.contrib.auth.hashers import make_password
from django.urls import reverse


class Imagen(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    large = models.CharField(max_length=300)
    short = models.CharField(max_length=300)
    icon = models.CharField(max_length=300)


""" SACAR VALORES NULL DE LOS CAMPOS First_NAME, LAST_NAME, USERNAME"""


class CustomUser(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user_photo = models.URLField(blank=True, null=True)
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


class Medicament(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    medicament_photo = models.ForeignKey(
        Imagen, on_delete=models.CASCADE, related_name='image_medicament', null=True, blank=True)
    name_medicament = models.CharField(max_length=100)
    description = models.TextField(default="description to medicament")


class Doctor(CustomUser):
    specialty = models.CharField(max_length=100)

    def get_absolute_url(self):
        return reverse('doctor-detail', args=[str(self.id)])

    class Meta:
        verbose_name = 'Doctor'
        verbose_name_plural = 'Doctors'


class Treatment(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)


class Recipe(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    medicament = models.OneToOneField(
        Medicament, on_delete=models.CASCADE, default=None)
    dose = models.CharField(max_length=50)
    frequency = models.CharField(max_length=100)
    start_date = models.DateField(default=date.today)
    ending_date = models.DateField(default=date.today)
    treatment = models.ForeignKey(
        Treatment, on_delete=models.CASCADE, related_name='recipes')


class Patient(CustomUser):
    def get_absolute_url(self):
        return reverse('doctor-detail', args=[str(self.id)])

    class Meta:
        verbose_name = 'Patient'
        verbose_name_plural = 'Patients'


class Medical_consultation_history(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    patient = models.ForeignKey(
        Patient, on_delete=models.CASCADE, null=True, blank=True
    )


class Medical_consultation(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    issue = models.CharField(max_length=100)
    date = models.DateField()
    doctor = models.OneToOneField(Doctor, on_delete=models.CASCADE)
    treatment = models.OneToOneField(Treatment, on_delete=models.CASCADE)
    consultation_history = models.ForeignKey(
        Medical_consultation_history, on_delete=models.CASCADE, related_name='history')


class Administrator(CustomUser):
    class meta:
        verbose_name = 'Administrator'
        verbose_name_plural = 'Administrators'
