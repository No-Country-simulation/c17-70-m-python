from accounts.serializers import PatientSerializer
from rest_framework import serializers
from .models import *


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
    start_time = serializers.TimeField(read_only=True)
    doctor = DoctorSerializer(read_only=True, source='work_shift.doctor', fields=[
                              'first_name', 'last_name', 'user_photo', 'specialty'])

    class Meta:
        model = Appointment
        fields = ['id', 'patient', 'start_time',
                  'cancelled', 'doctor']
        extra_kwargs = {
            'patient': {'write_only': False, 'read_only': True},
            'role': {'write_only': True},
        }
