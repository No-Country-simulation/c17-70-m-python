from django_filters.rest_framework import DjangoFilterBackend
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import viewsets, filters
from rest_framework.response import Response
from rest_framework import status
from login.permissions import IsPatient, IsDoctor
from .models import Appointment, WorkShift
from .serializers import AppointmentSerializer, WorkShiftSerializer

""" HABILITAR CROSS ORIGIN """


class WorkShiftViewSet(viewsets.ModelViewSet):
    queryset = WorkShift.objects.all()
    serializer_class = WorkShiftSerializer
    permission_classes = [IsDoctor]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        workshift = serializer.instance
        workshift.create_appointments()
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    filter_backends = [DjangoFilterBackend,
                       filters.SearchFilter, filters.OrderingFilter]
    filter_fields = ['work_shift__doctor__specialty', 'cancelled']
    permission_classes = [IsPatient]

    def get_queryset(self):
        queryset = super().get_queryset()
        queryset = queryset.filter(patient__isnull=True)
        specialty = self.request.query_params.get('specialty', None)
        if specialty:
            queryset = queryset.filter(work_shift__doctor__specialty=specialty)
        return queryset


class BookAppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    permission_classes = [IsPatient]

    def create(self, request, *args, **kwargs):
        appointment_id = request.data.get('appointment_id')
        if not appointment_id:
            return Response({'error': 'Appointment ID is required.'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            appointment = Appointment.objects.get(
                id=appointment_id, patient=None)

        except ObjectDoesNotExist:
            return Response({'error': 'Appointment not found or already booked.'}, status=status.HTTP_404_NOT_FOUND)

        patient = request.user.patient
        if patient:
            appointment.patient = patient
            appointment.save()
            serializer = self.get_serializer(appointment)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Patient not found.'}, status=status.HTTP_404_NOT_FOUND)


class PatientAppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    permission_classes = [IsPatient]

    def get_queryset(self):
        queryset = super().get_queryset()
        queryset = queryset.filter(patient=self.request.user.patient)
        return queryset
