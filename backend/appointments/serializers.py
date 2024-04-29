from accounts.serializers import PatientSerializer
from rest_framework import serializers
from .models import *
from accounts.models import Medication, Diagnosis
from django.utils import timezone


class AppoimentmentDoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = ['id', 'user_photo', 'gender', 'first_name',
                  'last_name', 'specialty']
        extra_kwargs = {
        }


class DoctorsSpecialtySerializer(serializers.ModelSerializer):
    value = serializers.CharField(source='specialty_name')

    class Meta:
        model = Doctor
        fields = ['value']


def workshift_date_validator(value):
    if value.data['date'] < timezone.now().date():
        raise serializers.ValidationError(
            'La fecha del turno de trabajo debe ser en el futuro.')


class WorkShiftSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkShift
        fields = ['id', 'date', 'start_time',
                  'end_time',  'doctor']


class AppointmentSerializer(serializers.ModelSerializer):
    patient = PatientSerializer()
    date = serializers.DateField()
    start_time = serializers.TimeField()
    end_time = serializers.TimeField()
    doctor = AppoimentmentDoctorSerializer(source='work_shift.doctor')
    room_id = serializers.CharField()
    cancelled = serializers.BooleanField()

    class Meta:
        model = Appointment
        fields = ['id', 'room_id', 'patient', 'date', 'start_time', 'end_time',
                  'cancelled', 'doctor']
        extra_kwargs = {
            'patient': {'write_only': False, 'read_only': True},
        }


class PatientAppointmentSerializer(serializers.ModelSerializer):
    patient = serializers.HiddenField(default=serializers.CurrentUserDefault())
    date = serializers.DateField()
    start_time = serializers.TimeField()
    end_time = serializers.TimeField()
    doctor = AppoimentmentDoctorSerializer(
        read_only=True, source='work_shift.doctor')
    room_id = serializers.CharField()
    cancelled = serializers.BooleanField()

    class Meta:
        model = Appointment
        fields = ['id', 'room_id', 'date', 'start_time',
                  'end_time', 'cancelled', 'doctor', 'patient']


class DoctorAppointmentSerializer(serializers.ModelSerializer):
    patient = PatientSerializer()
    date = serializers.DateField()
    start_time = serializers.TimeField()
    end_time = serializers.TimeField()
    doctor = serializers.HiddenField(default=serializers.CurrentUserDefault())
    room_id = serializers.CharField()
    cancelled = serializers.BooleanField()

    class Meta:
        model = Appointment
        fields = ['id', 'room_id', 'date', 'start_time',
                  'end_time', 'cancelled', 'doctor', 'patient']


class DiagnosisSerializer(serializers.ModelSerializer):
    class Meta:
        model = Diagnosis
        fields = '__all__'


class MedicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medication
        fields = '__all__'
