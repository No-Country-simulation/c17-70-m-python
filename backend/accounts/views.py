from rest_framework import generics
from .models import Doctor, Patient, Medicament, Treatment, Recipe, Medical_consultation_history, Medical_consultation, Administrator
from .serializers import *

from django.shortcuts import render
from rest_framework import viewsets
from .serializer import *

from django.shortcuts import render
from django.http import HttpResponse
from .models import Patient, Medical_consultation, Recipe #Treatment, Doctor
from django.views.generic import View
# Create your views here.
class AdministratorView(viewsets.ModelViewSet):
    serializer_class = AdminSerializer
    queryset = Administrator.objects.all()


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


class GeneratePdf(View):
    def get(self, request, *args, **kwargs):
        patient_id = kwargs.get('pk')
        patient = Patient.object.get(id=patient_id)
        
        consultation = Medical_consultation.object.filter(history__patient=patient).order_by('-date').first()
        
        recipe = Recipe.objects.filter(treatment=consultation.treatment)
        
        data = {
            'patient_id': patient.id,
            'patient_name': patient.user.get_full_name(),
            'issue': consultation.issue,
            'consultation_date': consultation.doctor.user.get_full_name(),
            'doctor_speciality':consultation.doctor.get_full_name(),
            'treatment': [{
                'name_medicine': recipe.name_medicine,
                'dose': recipe.dose,
                'frequency': recipe.frequency,
                'start_date': recipe.start_date,
                'ending_date': recipe.ending_date
            }for recipes in recipes]
        }
        
        pdf = render_to_pdf('patient/recipe_pdf_template.html', data)
        if pdf:
            response = HttpResponse(pdf, content_type='application/pdf')
            filename = f'Recipe_for_{patient.user.get_full_name()}.pdf'
            response['content-Disposition'] = f'attachment; filename={filename}'
            return response
    return HttpResponse('Not found')

