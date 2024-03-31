from rest_framework import routers
from django.urls import path, include
from account import views
from rest_framework.documentation import include_docs_urls

router = routers.DefaultRouter()

router.register(r'Account_controller', views.AccountView, 'account')
urlpatterns = [
    path('api/rest/',include(router.urls)),
    path('api/doc/',include_docs_urls(title="account doc"))
]
