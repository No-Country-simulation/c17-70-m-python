from django.urls import path
from .views import *

urlpatterns = [
    # URLs para Doctor
    path('doctors/', DoctorListCreate.as_view(), name='doctor-list'),
    path('doctors/<uuid:pk>/', DoctorRetrieveUpdateDestroy.as_view(), name='doctor-detail'),

    # URLs para Patient
    path('patients/', PatientListCreate.as_view(), name='patient-list'),
    path('patients/<uuid:pk>/', PatientRetrieveUpdateDestroy.as_view(), name='patient-detail'),

    # URLs para Medicament
    path('medicaments/', MedicamentListCreate.as_view(), name='medicament-list'),
    path('medicaments/<uuid:pk>/', MedicamentRetrieveUpdateDestroy.as_view(), name='medicament-detail'),

    # URLs para Treatment
    path('treatments/', TreatmentListCreate.as_view(), name='treatment-list'),
    path('treatments/<uuid:pk>/', TreatmentRetrieveUpdateDestroy.as_view(), name='treatment-detail'),

    # URLs para Recipe
    path('recipes/', RecipeListCreate.as_view(), name='recipe-list'),
    path('recipes/<uuid:pk>/', RecipeRetrieveUpdateDestroy.as_view(), name='recipe-detail'),

    # URLs para Medical_consultation_history
    path('medical-consultation-histories/', MedicalConsultationHistoryListCreate.as_view(), name='medical-consultation-history-list'),
    path('medical-consultation-histories/<uuid:pk>/', MedicalConsultationHistoryRetrieveUpdateDestroy.as_view(), name='medical-consultation-history-detail'),

    # URLs para Medical_consultation
    path('medical-consultations/', MedicalConsultationListCreate.as_view(), name='medical-consultation-list'),
    path('medical-consultations/<uuid:pk>/', MedicalConsultationRetrieveUpdateDestroy.as_view(), name='medical-consultation-detail'),

    # URLs para Administrator
    path('administrators/', AdministratorListCreate.as_view(), name='administrator-list'),
    path('administrators/<uuid:pk>/', AdministratorRetrieveUpdateDestroy.as_view(), name='administrator-detail'),

    # URLs para Medical_consultation
    path('users/', UserListCreate.as_view(), name='user-list'),
    path('users/<uuid:pk>/', UserRetrieveUpdateDestroy.as_view(), name='user-detail'),
  
    # views
    path('api/hello/', views.home, name="hello"),
    path('patient/<uuid:pk>/pdf', GeneratePdf.as_view(), name='patient-pdf')

]
