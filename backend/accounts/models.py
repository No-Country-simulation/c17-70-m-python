from django.db import models
from django.contrib.auth.models import AbstractUser
from datetime import date
import uuid
import base64


class CustomUser(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user_photo = models.BinaryField(null=True, blank=True, default=None)  # Campo BinaryField para almacenar la imagen como datos binarios

    is_doctor = models.BooleanField(default=False)
    is_patient = models.BooleanField(default=False)
    is_administrator = models.BooleanField(default=False)
    groups = models.ManyToManyField('auth.Group', related_name='custom_user_groups')
    birthdate = models.DateField(default=date.today)
    country = models.CharField(max_length=100, default='ARGENTINA')  
    phone_number = models.CharField(max_length=100, default='0000')
    gender = models.CharField(max_length=20,default="")
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='custom_user_permissions',
        blank=True,
    )
    def save(self, *args, **kwargs):
        # Convertir la imagen a una cadena base64 y almacenarla en el campo BinaryField
        if self.user_photo:
            self.user_photo = base64.b64encode(self.user_photo.read())
        super().save(*args, **kwargs)

    def __str__(self):
        return self.username

class Medicament(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name_medicament = models.CharField(max_length=100)
    description = models.TextField(default="description to medicament")


class Doctor(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    speciality = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.user.get_full_name()} - {self.speciality}"


class Treatment(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)


class Recipe(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    medicament = models.OneToOneField(Medicament, on_delete=models.CASCADE, default=None)
    medication_photo = models.BinaryField(null=True, blank=True, default=None)  # Campo BinaryField para almacenar la imagen como datos binarios
    dose = models.CharField(max_length=50)
    frequency = models.CharField(max_length=100)
    start_date = models.DateField(default=date.today)
    ending_date = models.DateField(default=date.today)
    treatment = models.ForeignKey(Treatment, on_delete=models.CASCADE, related_name='recipes')

    def save(self, *args, **kwargs):
        # Convertir la imagen a una cadena base64 y almacenarla en el campo BinaryField
        if self.user_photo:
            self.user_photo = base64.b64encode(self.user_photo.read())
        super().save(*args, **kwargs)

    def __str__(self):
        return self.username

class Medical_consultation_history(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)


class Medical_consultation(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    issue = models.CharField(max_length=100)
    date = models.DateField()
    doctor = models.OneToOneField(Doctor, on_delete=models.CASCADE)
    treatment = models.OneToOneField(Treatment, on_delete=models.CASCADE)
    history = models.ForeignKey(Medical_consultation_history, on_delete=models.CASCADE, related_name='history')


class Patient(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    medical_history = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.user.get_full_name()}"


class Administrator(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.get_full_name()
