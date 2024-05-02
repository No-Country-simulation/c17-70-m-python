from django_filters.rest_framework import DjangoFilterBackend
from django.core.exceptions import ObjectDoesNotExist
from django.db.models import F
from rest_framework import viewsets, filters
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import MethodNotAllowed
from rest_framework_simplejwt.authentication import JWTAuthentication
from login.permissions import IsPatient, IsDoctor, IsDoctorOrPatient
from accounts.models import Doctor, Patient, Diagnosis
from .models import Appointment, WorkShift
from .serializers import *
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated


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
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsDoctor]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        workshift = serializer.instance
        workshift.create_appointments()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class AppointmentViewSet(viewsets.ModelViewSet):
    """
    ViewSet para administrar citas.

    Esta clase proporciona operaciones CRUD para administrar citas. 
    Utiliza la clase `AppointmentSerializer` para la serialización y filtrado.

    Atributos:
        queryset (QuerySet): El QuerySet de todas las citas.
        serializer_class (AppointmentSerializer): La clase serializadora para las citas.
        filter_backends (list): La lista de backends de filtro que se utilizarán.
        filter_fields (list): La lista de campos que se pueden filtrar.
        permission_classes (list): La lista de clases de permisos 
        necesarias para acceder a la vista.

    Métodos:
        get_queryset(): Devuelve el QuerySet filtrado basado en el paciente y la especialidad.
    """
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    filter_backends = [DjangoFilterBackend,
                       filters.SearchFilter, filters.OrderingFilter]
    filter_fields = ['work_shift__doctor__specialty', 'cancelled']
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsDoctorOrPatient]

    def get_queryset(self):
        queryset = super().get_queryset()
        queryset = queryset.filter(patient__isnull=True)
        specialty = self.request.query_params.get('specialty', None)
        if specialty:
            queryset = queryset.filter(work_shift__doctor__specialty=specialty)
            queryset = queryset.order_by('date', 'start_time')
        queryset = queryset.order_by('date', 'start_time')
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
        permission_classes (list): La lista de clases de permisos necesarias 
        para acceder a la vista.

    Métodos:
        create(self, request, *args, **kwargs): Reserva una cita utilizando el ID de 
        la cita disponible.
    """
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    authentication_classes = [JWTAuthentication]
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
            appointment.patient = patient
            appointment.save()
            serializer = self.get_serializer(appointment)
            return Response(serializer.data, status=status.HTTP_200_OK)

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
        permission_classes (list): La lista de clases de permisos necesarias 
        para acceder a la vista.

    Métodos:
        get_queryset(): Devuelve el QuerySet filtrado por el paciente autenticado.
    """
    queryset = Appointment.objects.all()
    serializer_class = PatientAppointmentSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsPatient]

    def get_queryset(self):
        queryset = super().get_queryset()
        queryset = queryset.filter(patient=self.request.user.patient)
        queryset = queryset.order_by('date', 'start_time')
        return queryset

    def create(self, request, *args, **kwargs):
        raise MethodNotAllowed("CREATE")

    def update(self, request, *args, **kwargs):
        raise MethodNotAllowed("UPDATE")

    def destroy(self, request, pk):
        """
        Cancel an appointment by sending a DELETE request.
        """
        appointment = self.get_object()
        if appointment.patient == request.user.patient:
            today = timezone.now().date()
            appointment_date = appointment.date
            if appointment_date - today <= timedelta(days=1):
                if appointment == Appointment.objects.all():
                    appointment.delete()
                    return Response({'message': 'Cita cancelada exitosamente'}, status=status.HTTP_204_NO_CONTENT)
                appointment.patient = None
                appointment.save()
                return Response({'message': 'Cita cancelada exitosamente'}, status=status.HTTP_204_NO_CONTENT)
            appointment.delete()
            return Response({'message': 'Cita cancelada exitosamente'}, status=status.HTTP_204_NO_CONTENT)
        return Response({'error': 'Tu no puedes cancelar esta cita'}, status=status.HTTP_403_FORBIDDEN)


class DoctorAppointmentViewSet(viewsets.ModelViewSet):
    """
    ViewSet para obtener las citas de un doctor.
    Esta clase proporciona operaciones CRUD para obtener las citas de un doctor
    autenticado. Utiliza la clase `AppointmentSerializer` para la serialización y
    filtrado.

    Atributos:
        queryset (QuerySet): El QuerySet de todas las citas.
        serializer_class (AppointmentSerializer): La clase serializadora para las citas.
        permission_classes (list): La lista de clases de permisos necesarias 
        para acceder a la vista.

    Métodos:
        get_queryset(): Devuelve el QuerySet filtrado por el doctor autenticado.
    """
    queryset = Appointment.objects.all()
    serializer_class = DoctorAppointmentSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsDoctor]

    def get_queryset(self):
        queryset = super().get_queryset()
        queryset = queryset.filter(work_shift__doctor=self.request.user.doctor)
        queryset = queryset.filter(patient__isnull=False)
        queryset = queryset.order_by('date', 'start_time')
        return queryset

    def create(self, request, *args, **kwargs):
        raise MethodNotAllowed("CREATE")

    def update(self, request, *args, **kwargs):
        raise MethodNotAllowed("UPDATE")

    def destroy(self, request, pk):
        """
        Cancel an appointment by sending a DELETE request.
        """
        appointment = self.get_object()
        if appointment.work_shift.doctor == request.user.doctor:
            appointment.delete()
            return Response({'message': 'Cita cancelada exitosamente'}, status=status.HTTP_204_NO_CONTENT)
        return Response({'error': 'Tu no puedes cancelar esta cita'}, status=status.HTTP_403_FORBIDDEN)


class DoctorsSpecialtyViewSet(viewsets.ModelViewSet):
    "ViewSet para obtener las especialidades los doctores."
    queryset = Doctor.objects.all()
    serializer_class = DoctorsSpecialtySerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsDoctorOrPatient]

    def get_queryset(self):
        queryset = super().get_queryset()
        queryset = queryset.filter(specialty__isnull=False)
        queryset = queryset.values('specialty').annotate(
            specialty_name=F('specialty')).order_by().distinct()
        return queryset


class MedicationListView(viewsets.ModelViewSet):
    serializer_class = DiagnosisSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        patient_id = self.request.query_params.get('patient_id')

        if patient_id:
            patient = get_object_or_404(Patient, id=patient_id)

            queryset = Diagnosis.objects.filter(patient=patient)
            return queryset
        else:
            return Diagnosis.objects.none()


class PatientDiagnosisListView(viewsets.ModelViewSet):
    serializer_class = DiagnosisSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        patient_id = self.request.query_params.get('patient_id')
        date_param = self.request.query_params.get('date')

        print("Patient ID:", patient_id)
        print("Date:", date_param)

        if patient_id:
            queryset = Diagnosis.objects.filter(patient_id=patient_id)
            if date_param:
                queryset = queryset.filter(date=date_param)
            return queryset
        else:
            return Diagnosis.objects.none()


class DiagnosisMedicationListView(viewsets.ModelViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = MedicationSerializer

    def get_queryset(self):
        diagnosis_id = self.request.query_params.get('diagnosis_id')
        diagnosis = get_object_or_404(Diagnosis, id=diagnosis_id)
        medications = diagnosis.medications.all()
        return medications


class PatientDiagnosisByUserListView(viewsets.ModelViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = MedicationSerializer

    def get_queryset(self):
        # Obtener el id del usuario desde los parámetros de la consulta
        user_id = self.request.query_params.get('user_id')
        # Obtener el id del diagnóstico desde los parámetros de la consulta
        diagnosis_id = self.request.query_params.get('diagnosis_id')

        # Obtener el diagnóstico asociado al usuario y al id del diagnóstico
        diagnosis = get_object_or_404(
            Diagnosis, id=diagnosis_id, patient__id=user_id)
        # Obtener los medicamentos asociados a ese diagnóstico
        medications = diagnosis.medications.all()
        return medications
