from accounts.serializers import PatientSerializer
from rest_framework import serializers
from .models import *


class AppoimentmentDoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = ['id', 'user_photo', 'first_name',
                  'last_name', 'specialty']
        extra_kwargs = {
        }


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
    patient = PatientSerializer(read_only=True)
    date = serializers.DateField(read_only=True)
    start_time = serializers.TimeField(read_only=True)
    end_time = serializers.TimeField(read_only=True)
    doctor = AppoimentmentDoctorSerializer(
        read_only=True, source='work_shift.doctor')

    class Meta:
        model = Appointment
        fields = ['id', 'patient', 'date', 'start_time', 'end_time',
                  'cancelled', 'doctor']
        extra_kwargs = {
            'patient': {'write_only': False, 'read_only': True},
        }


class PatientAppointmentSerializer(serializers.ModelSerializer):
    patient = serializers.HiddenField(default=serializers.CurrentUserDefault())
    date = serializers.DateField(read_only=True)
    start_time = serializers.TimeField(read_only=True)
    doctor = AppoimentmentDoctorSerializer(
        read_only=True, source='work_shift.doctor')

    class Meta:
        model = Appointment
        fields = ['id', 'date', 'start_time', 'cancelled', 'doctor', 'patient']
