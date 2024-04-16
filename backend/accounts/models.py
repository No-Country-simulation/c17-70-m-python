from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
from datetime import date
import uuid


class CustomUser(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    is_doctor = models.BooleanField(default=False)
    is_patient = models.BooleanField(default=False)
    is_administrator = models.BooleanField(default=False)
    groups = models.ManyToManyField('auth.Group', related_name='custom_user_groups')
    birthdate = models.DateField(default=date.today)
    country = models.CharField(max_length=100, default='ARGENTINA')  
    phone_number = models.CharField(max_length=100, default='0000')

    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='custom_user_permissions',
        blank=True,
    )
class Doctor(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    speciality = models.CharField(max_length=100)
    def __str__(self):
        return f"{self.user.get_full_name()} - {self.speciality}"


#### PATIENT ####
class Treatment(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)


class Recipe(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name_medicine = models.TextField()
    dose = models.CharField(max_length=50)
    frequency = models.CharField(max_length=100)
    start_date = models.DateField(default=date.today)
    ending_date = models.DateField(default=date.today)
    treatment = models.ForeignKey(Treatment, on_delete=models.CASCADE, related_name='recipes')


class Medical_consultation_history(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    
class Medical_consultation():
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


#### PATIENT END ####
class Administrator(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.get_full_name()
