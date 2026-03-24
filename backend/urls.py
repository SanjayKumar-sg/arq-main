"""
URL configuration for backend project.
"""
from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from .views import (
    # Home
    get_our_story, get_faqs,
    # Events
    get_events, get_upcoming_events, get_success_stories,
    # Team
    get_team,
    # Gallery
    get_gallery,
    # Services
    get_services,
)

urlpatterns = [
    path('admin/', admin.site.urls),

    # ── Home page ──────────────────────────
    path('api/our-story/', get_our_story, name='get_our_story'),
    path('api/faqs/', get_faqs, name='get_faqs'),

    # ── Events page ────────────────────────
    path('api/events/', get_events, name='get_events'),
    path('api/upcoming-events/', get_upcoming_events, name='get_upcoming_events'),
    path('api/success-stories/', get_success_stories, name='get_success_stories'),

    # ── Team page ──────────────────────────
    path('api/team/', get_team, name='get_team'),

    # ── Gallery page ───────────────────────
    path('api/gallery/', get_gallery, name='get_gallery'),

    # ── Services page ──────────────────────
    path('api/services/', get_services, name='get_services'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
