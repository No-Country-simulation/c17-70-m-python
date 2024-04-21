import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
from datetime import date

class Imagen(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    large = models.CharField(max_length=300)
    short = models.CharField(max_length=300)
    icon = models.CharField(max_length=300)
class CustomUser(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user_photo = models.ForeignKey(Imagen, on_delete=models.CASCADE, related_name='image_user', null=True, blank=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100, default='password')
    birthdate = models.DateField(default=date.today)
    country = models.CharField(max_length=100, default='ARGENTINA')  
    phone_number = models.CharField(max_length=100, default='0000')
    gender = models.CharField(max_length=20, default="")
    
    groups = models.ManyToManyField(Group, related_name='custom_user_groups')
    is_doctor = models.BooleanField(default=False)
    is_patient = models.BooleanField(default=False)
    is_administrator = models.BooleanField(default=False)
    user_permissions = models.ManyToManyField(Permission, related_name='custom_user_permissions', blank=True)


class Medicament(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    medicament_photo = models.ForeignKey(Imagen, on_delete=models.CASCADE, related_name='image_medicament', null=True, blank=True)
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
    dose = models.CharField(max_length=50)
    frequency = models.CharField(max_length=100)
    start_date = models.DateField(default=date.today)
    ending_date = models.DateField(default=date.today)
    treatment = models.ForeignKey(Treatment, on_delete=models.CASCADE, related_name='recipes')


class Patient(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    def __str__(self):
        return f"{self.user.get_full_name()}"

class Medical_consultation_history(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    patient = models.OneToOneField(Patient, on_delete=models.CASCADE, null=True, blank=True) 

class Medical_consultation(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    issue = models.CharField(max_length=100)
    date = models.DateField()
    doctor = models.OneToOneField(Doctor, on_delete=models.CASCADE)
    treatment = models.OneToOneField(Treatment, on_delete=models.CASCADE)
    consultation_history = models.ForeignKey(Medical_consultation_history, on_delete=models.CASCADE, related_name='history')




class Administrator(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.get_full_name()
