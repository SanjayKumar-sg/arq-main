"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from .views import get_events, get_team, get_gallery, get_success_stories, get_upcoming_events, get_services

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/events/', get_events, name='get_events'),
    path('api/team/', get_team, name='get_team'),
    path('api/gallery/', get_gallery, name='get_gallery'),
    path('api/success-stories/', get_success_stories, name='get_success_stories'),
    path('api/upcoming-events/', get_upcoming_events, name='get_upcoming_events'),
    path('api/services/', get_services, name='get_services'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
