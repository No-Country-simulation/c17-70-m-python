from django.shortcuts import render
from rest_framework import viewsets
from .serializer import AccountSerializer
from .models import Profile
# Create your views here.
class AccountView(viewsets.ModelViewSet):
    serializer_class = AccountSerializer
    queryset = Profile.objects.all()