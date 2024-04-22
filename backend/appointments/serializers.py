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
    work_shift = WorkShiftSerializer()
    patient = PatientSerializer(read_only=True)
    start_time = serializers.TimeField(read_only=True)
    doctor = DoctorSerializer(read_only=True, source='work_shift.doctor')

    def validate_start_time(self, value):
        work_shift = self.context['view'].get_object()
        existing_appointments = work_shift.appointments.filter(
            start_time__lte=value, end_time__gte=value
        )
        if existing_appointments.exists():
            raise serializers.ValidationError(
                'El horario de la cita se superpone con la cita existente.'
            )
        return value

    def create(self, validated_data):
        request = self.context['request']
        patient = request.user
        validated_data['patient'] = patient
        return super().create(validated_data)

    class Meta:
        model = Appointment
        fields = ['id', 'patient', 'start_time', 'cancelled', 'work_shift']
        extra_kwargs = {
            'patient': {'write_only': False, 'read_only': True},
            'work_shift': {'write_only': True},
        }
