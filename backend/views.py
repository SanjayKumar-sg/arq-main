from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import (
    OurStory, FAQ,
    Events, UpcomingEvent, SuccessStory,
    Member,
    GalleryEvent,
    Service,
)
from .serializers import (
    OurStorySerializer, FAQSerializer,
    EventsSerializer, UpcomingEventSerializer, SuccessStorySerializer,
    MemberSerializer,
    GalleryEventSerializer,
    ServiceSerializer,
)


# ── HOME PAGE ──────────────────────────────

@api_view(['GET'])
def get_our_story(request):
    stories = OurStory.objects.all().order_by('order')
    serializer = OurStorySerializer(stories, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_faqs(request):
    faqs = FAQ.objects.all().order_by('order')
    serializer = FAQSerializer(faqs, many=True)
    return Response(serializer.data)


# ── EVENTS PAGE ────────────────────────────

@api_view(['GET'])
def get_events(request):
    events = Events.objects.all().order_by('-posted_at')
    serializer = EventsSerializer(events, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_upcoming_events(request):
    events = UpcomingEvent.objects.all().order_by('date')
    serializer = UpcomingEventSerializer(events, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_success_stories(request):
    stories = SuccessStory.objects.all().order_by('-year')
    serializer = SuccessStorySerializer(stories, many=True)
    return Response(serializer.data)


# ── TEAM PAGE ──────────────────────────────

@api_view(['GET'])
def get_team(request):
    executives = Member.objects.filter(category='Executive').order_by('order')
    members = Member.objects.filter(category='Team Member').order_by('order')
    exec_serializer = MemberSerializer(executives, many=True)
    member_serializer = MemberSerializer(members, many=True)
    return Response({
        "executives": exec_serializer.data,
        "members": member_serializer.data
    })


# ── GALLERY PAGE ───────────────────────────

@api_view(['GET'])
def get_gallery(request):
    events = GalleryEvent.objects.all()
    serializer = GalleryEventSerializer(events, many=True)
    return Response(serializer.data)


# ── SERVICES PAGE ──────────────────────────

@api_view(['GET'])
def get_services(request):
    services = Service.objects.all()
    serializer = ServiceSerializer(services, many=True)
    return Response(serializer.data)