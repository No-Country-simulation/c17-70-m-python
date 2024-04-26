
from django.urls import path
from .views import *
from rest_framework.documentation import include_docs_urls

urlpatterns = [
    # URLs para Doctor
    path('doctors/', DoctorListCreate.as_view(), name='doctor-list'),
    path('doctors/<uuid:pk>/', DoctorRetrieveUpdateDestroy.as_view(),
         name='doctor-detail'),

    # URLs para Patient
    path('patients/', PatientListCreate.as_view(), name='patient-list'),
    path('patients/<uuid:pk>/', PatientRetrieveUpdateDestroy.as_view(),
         name='patient-detail'),

    # URLs para Medicament
    path('medicaments/', MedicamentListCreate.as_view(), name='medicament-list'),
    path('medicaments/<uuid:pk>/',
         MedicamentRetrieveUpdateDestroy.as_view(), name='medicament-detail'),

    # URLs para Administrator
    path('administrators/', AdministratorListCreate.as_view(),
         name='administrator-list'),
    path('administrators/<uuid:pk>/',
         AdministratorRetrieveUpdateDestroy.as_view(), name='administrator-detail'),

    path('users/', UserListCreate.as_view(), name='user-list'),
    path('users/<uuid:pk>/', UserRetrieveUpdateDestroy.as_view(), name='user-detail'),

    path('diagnosis/', DiagnosListCreate.as_view(), name='diagnos-list'),
    path('diagnosis/<uuid:pk>/', DiagnosRetrieveUpdateDestroy.as_view(), name='diagnos-detail'),
    # views
    # path('patient/<uuid:pk>/pdf', GeneratePdf.as_view(), name='patient-pdf'),

    path('documentation/', include_docs_urls(title="API doc")),
]
