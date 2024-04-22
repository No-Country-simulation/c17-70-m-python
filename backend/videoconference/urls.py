from django.urls import path
from .import views

urlpatterns = [
    path('dashboard/', views.dashboard, name ='dashboard'),
    path('meeting/', views.videocall, name ='meeting'),
    path('joinroom/', views.joinroom, name ='join'),
]
