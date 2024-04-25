from rest_framework import generics
from .models import Doctor, Patient, Medicament, Treatment, Recipe, Medical_consultation_history, Medical_consultation, Administrator, CustomUser
from rest_framework import viewsets
from . import serializers

from django.contrib.auth.models import Group
from rest_framework.response import Response
from rest_framework import status
from .models import Patient, Medical_consultation, Recipe  # Treatment, Doctor
# Create your views here.


class AdministratorView(viewsets.ModelViewSet):
    serializer_class = serializers.AdministratorSerializer
    queryset = Administrator.objects.all()


# Doctor
class DoctorListCreate(generics.ListCreateAPIView):
    queryset = Doctor.objects.all()
    serializer_class = serializers.DoctorSerializer

    def create(self, request, *args, **kwargs):
        """
        Cree una nueva instancia del modelo utilizando los datos proporcionados.

        Parámetros:
            request (HttpRequest): el objeto de solicitud HTTP.
            args (tupla): argumentos posicionales adicionales.
            kwargs (dict): argumentos de palabras clave adicionales.

        Devoluciones:
            Respuesta: la respuesta HTTP que contiene los datos serializados de la instancia creada.
            - estado: HTTP_201_CREATED si la instancia se creó correctamente.
            - encabezados: encabezados adicionales para la respuesta.

        Raise:
            ValidationError: si el serializador no es válido.
            Group.DoesNotExist: Si el grupo 'Pacientes' no existe.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        doctor = self.perform_create(serializer)
        doctors_group = Group.objects.get(name='Doctors')
        doctor.groups.add(doctors_group)
        headers = self.get_success_headers(serializer.data)
        serializer.data['user_photo'] = request.build_absolute_uri(
            doctor.get_absolute_url())
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        return serializer.save()


class DoctorRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Doctor.objects.all()
    serializer_class = serializers.DoctorSerializer
# Patient


class PatientListCreate(generics.ListCreateAPIView):
    queryset = Patient.objects.all()
    serializer_class = serializers.PatientSerializer

    def create(self, request, *args, **kwargs):
        """
        Cree una nueva instancia del modelo utilizando los datos proporcionados.

        Parámetros:
            request (HttpRequest): el objeto de solicitud HTTP.
            args (tupla): argumentos posicionales adicionales.
            kwargs (dict): argumentos de palabras clave adicionales.

        Devoluciones:
            Respuesta: la respuesta HTTP que contiene los datos serializados de la instancia creada.
            - estado: HTTP_201_CREATED si la instancia se creó correctamente.
            - encabezados: encabezados adicionales para la respuesta.

        Raise:
            ValidationError: si el serializador no es válido.
            Group.DoesNotExist: Si el grupo 'Pacientes' no existe.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        patients = self.perform_create(serializer)
        patients_group = Group.objects.get(name='Patients')
        patients.groups.add(patients_group)
        headers = self.get_success_headers(serializer.data)
        serializer.data['user_photo'] = request.build_absolute_uri(
            patients.get_absolute_url())
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        return serializer.save()

    def update(self, instance, validated_data):
        email = validated_data.get('email', instance.email)
        password = validated_data.get('password', instance.password)
        instance.email = email
        if password:
            instance.set_password(password)
        instance.save()
        return instance

    def perform_update(self, serializer):
        serializer.save()


class PatientRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Patient.objects.all()
    serializer_class = serializers.PatientSerializer

# Medicament


class MedicamentListCreate(generics.ListCreateAPIView):
    queryset = Medicament.objects.all()
    serializer_class = serializers.MedicamentSerializer


class MedicamentRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Medicament.objects.all()
    serializer_class = serializers.MedicamentSerializer

# Treatment


class TreatmentListCreate(generics.ListCreateAPIView):
    queryset = Treatment.objects.all()
    serializer_class = serializers.TreatmentSerializer


class TreatmentRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Treatment.objects.all()
    serializer_class = serializers.TreatmentSerializer

# Recipe


class RecipeListCreate(generics.ListCreateAPIView):
    queryset = Recipe.objects.all()
    serializer_class = serializers.RecipeSerializer


class RecipeRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Recipe.objects.all()
    serializer_class = serializers.RecipeSerializer

# Medical_consultation_history


class MedicalConsultationHistoryListCreate(generics.ListCreateAPIView):
    queryset = Medical_consultation_history.objects.all()
    serializer_class = serializers.MedicalConsultationHistorySerializer


class MedicalConsultationHistoryRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Medical_consultation_history.objects.all()
    serializer_class = serializers.MedicalConsultationHistorySerializer

# Medical_consultation


class MedicalConsultationListCreate(generics.ListCreateAPIView):
    queryset = Medical_consultation.objects.all()
    serializer_class = serializers.MedicalConsultationSerializer


class MedicalConsultationRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Medical_consultation.objects.all()
    serializer_class = serializers.MedicalConsultationSerializer

# Administrator


class AdministratorListCreate(generics.ListCreateAPIView):
    queryset = Administrator.objects.all()
    serializer_class = serializers.AdministratorSerializer


class AdministratorRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Administrator.objects.all()
    serializer_class = serializers.AdministratorSerializer


class UserListCreate(generics.ListCreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = serializers.UserSerializer


class UserRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = serializers.UserSerializer


"""class GeneratePdf(View):
    def get(self, request, *args, **kwargs):
        patient_id = kwargs.get('pk')
        patient = Patient.object.get(id=patient_id)

        consultation = Medical_consultation.object.filter(
            history__patient=patient).order_by('-date').first()

        recipe = Recipe.objects.filter(treatment=consultation.treatment)

        data = {
            'patient_id': patient.id,
            'patient_name': patient.user.get_full_name(),
            'issue': consultation.issue,
            'consultation_date': consultation.doctor.user.get_full_name(),
            'doctor_speciality': consultation.doctor.get_full_name(),
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
            response['content-Disposition'] = f'attachment; filename={
                filename}'
            return response
        return HttpResponse('Not found')
"""
