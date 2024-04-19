from rest_framework import generics
from .models import Doctor, Patient, Medicament, Treatment, Recipe, Medical_consultation_history, Medical_consultation, Administrator
from .serializers import *

# Doctor
class DoctorListCreate(generics.ListCreateAPIView):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer

class DoctorRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer
# Patient
class PatientListCreate(generics.ListCreateAPIView):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer

class PatientRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer

# Medicament
class MedicamentListCreate(generics.ListCreateAPIView):
    queryset = Medicament.objects.all()
    serializer_class = MedicamentSerializer

class MedicamentRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Medicament.objects.all()
    serializer_class = MedicamentSerializer

# Treatment
class TreatmentListCreate(generics.ListCreateAPIView):
    queryset = Treatment.objects.all()
    serializer_class = TreatmentSerializer

class TreatmentRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Treatment.objects.all()
    serializer_class = TreatmentSerializer

# Recipe
class RecipeListCreate(generics.ListCreateAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer

class RecipeRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer

# Medical_consultation_history
class MedicalConsultationHistoryListCreate(generics.ListCreateAPIView):
    queryset = Medical_consultation_history.objects.all()
    serializer_class = MedicalConsultationHistorySerializer

class MedicalConsultationHistoryRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Medical_consultation_history.objects.all()
    serializer_class = MedicalConsultationHistorySerializer

# Medical_consultation
class MedicalConsultationListCreate(generics.ListCreateAPIView):
    queryset = Medical_consultation.objects.all()
    serializer_class = MedicalConsultationSerializer

class MedicalConsultationRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Medical_consultation.objects.all()
    serializer_class = MedicalConsultationSerializer

# Administrator
class AdministratorListCreate(generics.ListCreateAPIView):
    queryset = Administrator.objects.all()
    serializer_class = AdministratorSerializer

class AdministratorRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Administrator.objects.all()
    serializer_class = AdministratorSerializer

class UserListCreate(generics.ListCreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer

class UserRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer