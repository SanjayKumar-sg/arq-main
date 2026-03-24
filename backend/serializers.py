from rest_framework import serializers
from .models import (
    # Home page
    OurStory, FAQ,
    # Events page
    Events, UpcomingEvent, SuccessStory,
    # Team page
    Member,
    # Gallery page
    GalleryEvent, GalleryImage,
    # Services page
    Service,
)


# ── HOME PAGE ──────────────────────────────
class OurStorySerializer(serializers.ModelSerializer):
    class Meta:
        model = OurStory
        fields = '__all__'


class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = '__all__'


# ── EVENTS PAGE ────────────────────────────
class EventsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Events
        fields = '__all__'


class UpcomingEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = UpcomingEvent
        fields = '__all__'


class SuccessStorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SuccessStory
        fields = '__all__'


# ── TEAM PAGE ──────────────────────────────
class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = '__all__'


# ── GALLERY PAGE ───────────────────────────
class GalleryImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = GalleryImage
        fields = ('image',)


class GalleryEventSerializer(serializers.ModelSerializer):
    images = GalleryImageSerializer(many=True, read_only=True)

    class Meta:
        model = GalleryEvent
        fields = ('id', 'title', 'date', 'location', 'attendees', 'thumbnail', 'images')


# ── SERVICES PAGE ──────────────────────────
class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = '__all__'
