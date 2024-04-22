from rest_framework import serializers
from .models import *


class UserSerializer(serializers.ModelSerializer):
    role = serializers.IntegerField(source='groups.first.id', read_only=True)

    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'user_photo',
                  'groups', 'birthdate', 'country', 'phone_number', 'gender', 'user_permissions', 'role']
        extra_kwargs = {
            'password': {'write_only': True},
            'is_active': {'read_only': True},
        }


class DoctorSerializer(serializers.ModelSerializer):
    role = serializers.IntegerField(source='groups.first.id', read_only=True)
    user_photo = serializers.URLField(required=False)
    first_name = serializers.CharField(source='first_name', read_only=True)
    last_name = serializers.CharField(source='last_name', read_only=True)
    specialty = serializers.CharField(source='specialty', read_only=True)
    user_photo_url = serializers.SerializerMethodField()

    class Meta:
        model = Doctor
        fields = ['id', 'user_photo', 'user_photo_url', 'email', 'password', 'first_name', 'last_name', 'id_number',
                  'birthdate', 'country', 'gender', 'phone_number', 'specialty', 'role']

        extra_kwargs = {
            'password': {'write_only': True},
            'is_active': {'read_only': True},
        }

    def get_user_photo_url(self, obj):
        return obj.user_photo


class PatientSerializer(serializers.ModelSerializer):
    role = serializers.IntegerField(source='groups.first.id', read_only=True)
    user_photo = serializers.URLField(required=False)

    class Meta:
        model = Patient
        fields = ['id', 'user_photo', 'email', 'password', 'first_name', 'last_name', 'id_number',
                  'birthdate', 'country', 'gender', 'phone_number', 'role']

        extra_kwargs = {
            'password': {'write_only': True},
            'is_active': {'read_only': True},
        }


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
