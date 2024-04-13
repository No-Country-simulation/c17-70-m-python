
from django.conf.urls.static import static
from django.conf import settings
from django.contrib import admin
from django.urls import path, include
urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('accounts.urls')),
    path('login/', include('login.urls')),
    path('lobby/', include('videochat.urls')),
    # path('', home, name='home'),

]
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)