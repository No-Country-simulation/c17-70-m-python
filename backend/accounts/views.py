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


class DoctorView(viewsets.ModelViewSet):
    serializer_class = DoctorSerializer
    queryset = Doctor.objects.all() 


class PatientView(viewsets.ModelViewSet):
    serializer_class = PatientSerializer
    queryset = Patient.objects.all()

class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = CustomUser.objects.all()

def home(request):
    return HttpResponse("<h1> hello world </h1>")



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