
from django.conf.urls.static import static
from django.conf import settings
from django.contrib import admin
from django.urls import path, include
urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('accounts.urls')),
    path('login/', include('login.urls')),
    path('api/admin/', admin.site.urls),
    path('api/accounts/', include('accounts.urls')),
    path('api/auth/', include('login.urls')),
    path('api/appointments/', include('appointments.urls')),
    # path('lobby/', include('videochat.urls')),
    # path('', home, name='home'),

]
