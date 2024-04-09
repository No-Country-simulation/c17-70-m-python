
from django.contrib import admin
from django.urls import path, include
from ..accounts.views import home
urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('accounts.urls')),
    path('login/', include('login.urls')),
    path('', home, name="home"),

]
