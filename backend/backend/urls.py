from django.contrib import admin
from django.urls import path, include
urlpatterns = [
    path('api/admin/', admin.site.urls),
    path('api/accounts/', include('accounts.urls')),
    path('api/auth/', include('login.urls')),
    path('api/appointments/', include('appointments.urls'))

]
