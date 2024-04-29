from rest_framework import routers
from django.urls import path, include
from .views import *

appointment_router = routers.DefaultRouter()
work_shifts_router = routers.DefaultRouter()
patient_appointments_router = routers.DefaultRouter()
diagnosis_router = routers.DefaultRouter()
medication_router = routers.DefaultRouter()
medication_User_router = routers.DefaultRouter()

medication_User_router.register(
    r'medication_user', PatientDiagnosisByUserListView, basename='diagnostic_medicaments')
medication_router.register(
    r'medication', DiagnosisMedicationListView, basename='diagnosis_patient')
diagnosis_router.register(
    r'patientconsultation', PatientDiagnosisListView, basename='patient_diagnosis')
appointment_router.register(r'appointments', AppointmentViewSet)
work_shifts_router.register(r'work_shifts', WorkShiftViewSet)
patient_appointments_router.register(
    r'patient-appointments', PatientAppointmentViewSet, basename='patient-appointments')


urlpatterns = [

    path('appointments/', include(appointment_router.urls)),
    path('work_shifts/', include(work_shifts_router.urls)),
    path('book-appointment/',
         BookAppointmentViewSet.as_view({'post': 'create'})),
    path('doctors-specialty/',
         DoctorsSpecialtyViewSet.as_view({'get': 'list'})),

    # Citas Medicas Resrervadas por Paciente
    path('patient-appointments/', include(patient_appointments_router.urls)),
    path('doctor-appointments/',
         DoctorAppointmentViewSet.as_view({'get': 'list'})),


    # filtrar los diagnosticos por id de usuario o por usuario y fecha
    path('patientdiagnosis/', PatientDiagnosisListView.as_view(
        {'get': 'list'}), name='patient-diagnosis-list'),

    # Obtener medicamentos por ID de diagnostico
    path('patientmedicaments/', DiagnosisMedicationListView.as_view(
        {'get': 'list'}), name='diagnosis-medication-list'),

    path('patientmedicamentsbyid/', PatientDiagnosisByUserListView.as_view(
        {'get': 'list'}), name='diagnosis-medication_by_user-list')

]
