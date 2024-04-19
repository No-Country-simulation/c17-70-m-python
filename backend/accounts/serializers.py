from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'user_photo', 'is_doctor', 'is_patient', 'is_administrator', 'groups', 'birthdate', 'country', 'phone_number', 'gender', 'user_permissions']

class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = '__all__'


class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = '__all__'


class MedicamentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medicament
        fields = '__all__'


class TreatmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Treatment
        fields = '__all__'


class RecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = '__all__'


class MedicalConsultationHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Medical_consultation_history
        fields = '__all__'


class MedicalConsultationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medical_consultation
        fields = '__all__'


class AdministratorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Administrator
        fields = '__all__'
