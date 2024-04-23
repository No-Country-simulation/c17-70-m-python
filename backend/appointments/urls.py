from rest_framework import routers
from rest_framework.documentation import include_docs_urls
from django.urls import path, include
from .views import *

appointment_router = routers.DefaultRouter()
work_shifts_router = routers.DefaultRouter()
patient_appointments_router = routers.DefaultRouter()

appointment_router.register(r'appointments', AppointmentViewSet)
work_shifts_router.register(r'work_shifts', WorkShiftViewSet)
patient_appointments_router.register(
    r'patient-appointments', PatientAppointmentViewSet)


urlpatterns = [
    # Api
    path('appointments/', include(appointment_router.urls)),
    path('work_shifts/', include(work_shifts_router.urls)),
    path('book-appointment/',
         BookAppointmentViewSet.as_view({'post': 'create'})),
    path('doctors-specialty',
         DoctorsSpecialtyViewSet.as_view({'get': 'list'})),

    # Citas Medicas Resrervadas por Paciente
    path('patient-appointments/', include(patient_appointments_router.urls)),
]
