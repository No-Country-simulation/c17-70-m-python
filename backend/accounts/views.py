from django.shortcuts import render
from rest_framework import viewsets
from .serializer import AccountSerializer

from django.shortcuts import render
from django.http import HttpResponse
from .models import Account
# Create your views here.
class AccountView(viewsets.ModelViewSet):
    serializer_class = AccountSerializer
    queryset = Account.objects.all() 
def home(request):
    return HttpResponse("<h1> hello world </h1>")

