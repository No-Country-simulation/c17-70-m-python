from django_filters.rest_framework import DjangoFilterBackend
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import viewsets, filters
from rest_framework.response import Response
from rest_framework import status
from login.permissions import IsPatient, IsDoctor, IsDoctorOrPatient
from .models import Appointment, WorkShift
from .serializers import AppointmentSerializer, WorkShiftSerializer


class WorkShiftViewSet(viewsets.ModelViewSet):
    """
    ViewSet para administrar turnos de trabajo.

    Esta clase proporciona operaciones CRUD para administrar turnos de trabajo. Utiliza la clase
    `WorkShiftSerializer` para la serialización y filtrado.

    Atributos:
        queryset (QuerySet): El QuerySet de todos los turnos de trabajo.
        serializer_class (WorkShiftSerializer): La clase serializadora para los turnos de trabajo.
        permission_classes (list): La lista de clases de permisos necesarias para acceder a la vista.

    Métodos:
        create(self, request, *args, **kwargs)
    """
    queryset = WorkShift.objects.all()
    serializer_class = WorkShiftSerializer
    permission_classes = [IsDoctor]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        workshift = self.get_serializer().instance
        workshift.create_appointments()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class AppointmentViewSet(viewsets.ModelViewSet):
    """
    ViewSet para administrar citas.

    Esta clase proporciona operaciones CRUD para administrar citas. Utiliza la clase `AppointmentSerializer`
    para la serialización y filtrado.

    Atributos:
        queryset (QuerySet): El QuerySet de todas las citas.
        serializer_class (AppointmentSerializer): La clase serializadora para las citas.
        filter_backends (list): La lista de backends de filtro que se utilizarán.
        filter_fields (list): La lista de campos que se pueden filtrar.
        permission_classes (list): La lista de clases de permisos necesarias para acceder a la vista.

    Métodos:
        get_queryset(): Devuelve el QuerySet filtrado basado en el paciente y la especialidad.
    """
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    filter_backends = [DjangoFilterBackend,
                       filters.SearchFilter, filters.OrderingFilter]
    filter_fields = ['work_shift__doctor__specialty', 'cancelled']
    permission_classes = [IsDoctorOrPatient]

    def get_queryset(self):
        queryset = super().get_queryset()
        queryset = queryset.filter(patient__isnull=True)
        specialty = self.request.query_params.get('specialty', None)
        if specialty:
            queryset = queryset.filter(work_shift__doctor__specialty=specialty)
        return queryset


class BookAppointmentViewSet(viewsets.ModelViewSet):
    """
    ViewSet para reservar una cita.

    Esta clase proporciona una operación de creación para reservar una cita
    utilizando el ID de la cita disponible. El usuario debe estar autenticado
    como paciente para poder reservar una cita.

    Atributos:
        queryset (QuerySet): El QuerySet de todas las citas.
        serializer_class (AppointmentSerializer): La clase serializadora para las citas.
        permission_classes (list): La lista de clases de permisos necesarias para acceder a la vista.

    Métodos:
        create(self, request, *args, **kwargs): Reserva una cita utilizando el ID de la cita disponible.
    """
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    permission_classes = [IsPatient]

    def create(self, request, *args, **kwargs):
        """
        Reserva una cita utilizando el ID de la cita disponible. El usuario
        debe estar autenticado como paciente para poder reservar una cita.

        El request debe incluir el campo 'appointment_id', el cual corresponde
        al ID de la cita disponible que se desea reservar.

        Devuelve la cita actualizada con el paciente autenticado.
        """
        appointment_id = request.data.get('appointment_id')
        if not appointment_id:
            return Response({'error': 'appointment_id es requerido.'},
                            status=status.HTTP_400_BAD_REQUEST)

        try:
            appointment = Appointment.objects.get(
                id=appointment_id, patient=None)
        except ObjectDoesNotExist:
            return Response({'error': 'Cita no encontrada o ya reservada.'},
                            status=status.HTTP_404_NOT_FOUND)

        patient = request.user.patient
        if patient:
            # Verificar que no haya otra cita con el mismo doctor a esa hora
            if Appointment.objects.filter(patient=patient,
                                          work_shift=appointment.work_shift).exists():
                return Response(
                    {'error': 'El paciente ya tiene una cita con el mismo doctor a esa hora.'},
                    status=status.HTTP_400_BAD_REQUEST)

            appointment.patient = patient
            appointment.save()

            serializer = self.get_serializer(appointment)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Paciente no encontrado.'}, status=status.HTTP_404_NOT_FOUND)


class PatientAppointmentViewSet(viewsets.ModelViewSet):
    """
    y para obtener las citas de un paciente.

    Esta clase proporciona operaciones CRUD para obtener las citas de un paciente
    autenticado. Utiliza la clase `AppointmentSerializer` para la serialización y
    filtrado.

    Atributos:
        queryset (QuerySet): El QuerySet de todas las citas.
        serializer_class (AppointmentSerializer): La clase serializadora para las citas.
        permission_classes (list): La lista de clases de permisos necesarias para acceder a la vista.

    Métodos:
        get_queryset(): Devuelve el QuerySet filtrado por el paciente autenticado.
    """
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    permission_classes = [IsPatient]

    def get_queryset(self):
        queryset = super().get_queryset()
        queryset = queryset.filter(patient=self.request.user.patient)
        return queryset
