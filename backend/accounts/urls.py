from django.urls import path
from .views import *
from rest_framework.documentation import include_docs_urls

urlpatterns = [
     path('doctors/', DoctorListCreate.as_view(), name='doctor-list'),
     path('doctors/<uuid:pk>/', DoctorRetrieveUpdateDestroy.as_view(),
          name='doctor-detail'),

     path('patients/', PatientListCreate.as_view(), name='patient-list'),
     path('patients/<uuid:pk>/', PatientRetrieveUpdateDestroy.as_view(),
          name='patient-detail'),

     path('medicaments/', MedicamentListCreate.as_view(), name='medicament-list'),
     path('medicaments/<uuid:pk>/',
          MedicamentRetrieveUpdateDestroy.as_view(), name='medicament-detail'),

     path('treatments/', TreatmentListCreate.as_view(), name='treatment-list'),
     path('treatments/<uuid:pk>/',
          TreatmentRetrieveUpdateDestroy.as_view(), name='treatment-detail'),

     path('recipes/', RecipeListCreate.as_view(), name='recipe-list'),
     path('recipes/<uuid:pk>/', RecipeRetrieveUpdateDestroy.as_view(),
          name='recipe-detail'),

     path('medical-consultation-histories/', MedicalConsultationHistoryListCreate.as_view(),
          name='medical-consultation-history-list'),
     path('medical-consultation-histories/<uuid:pk>/',
          MedicalConsultationHistoryRetrieveUpdateDestroy.as_view(), name='medical-consultation-history-detail'),

     path('medical-consultations/', MedicalConsultationListCreate.as_view(),
          name='medical-consultation-list'),
     path('medical-consultations/<uuid:pk>/',
          MedicalConsultationRetrieveUpdateDestroy.as_view(), name='medical-consultation-detail'),

     path('administrators/', AdministratorListCreate.as_view(),
          name='administrator-list'),
     path('administrators/<uuid:pk>/',
          AdministratorRetrieveUpdateDestroy.as_view(), name='administrator-detail'),

     path('users/', UserListCreate.as_view(), name='user-list'),
     path('users/<uuid:pk>/', UserRetrieveUpdateDestroy.as_view(), name='user-detail'),

     # views
     # path('patient/<uuid:pk>/pdf', GeneratePdf.as_view(), name='patient-pdf'),

     path('documentation/', include_docs_urls(title="API doc")),


    path('filter_consultations/<uuid:user_id>/', filter_consultations_by_date, name='filter_consultations_by_date'),
    path('list_all_recipes/<uuid:patient_id>/', list_all_recipes, name='list_all_recipes'),
    path('list_all_consultations/<uuid:patient_id>/', list_all_consultations, name='list_all_consultations'),
    path('list_all_treatments/<uuid:patient_id>/', list_all_treatments, name='list_all_treatments'),



]
