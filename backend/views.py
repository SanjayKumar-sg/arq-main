from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Events, Executive, TeamMember, GalleryEvent, SuccessStory, UpcomingEvent
from .serializers import EventsSerializer, ExecutiveSerializer, TeamMemberSerializer, GalleryEventSerializer, SuccessStorySerializer, UpcomingEventSerializer


@api_view(['GET'])
def get_events(request):
    events = Events.objects.all().order_by('-posted_at')
    serializer = EventsSerializer(events, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_team(request):
    executives = Executive.objects.all().order_by('order')
    members = TeamMember.objects.all()
    
    exec_serializer = ExecutiveSerializer(executives, many=True)
    member_serializer = TeamMemberSerializer(members, many=True)
    
    return Response({
        "executives": exec_serializer.data,
        "members": member_serializer.data
    })


@api_view(['GET'])
def get_gallery(request):
    events = GalleryEvent.objects.all()
    serializer = GalleryEventSerializer(events, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_success_stories(request):
    stories = SuccessStory.objects.all().order_by('-year')
    serializer = SuccessStorySerializer(stories, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_upcoming_events(request):
    events = UpcomingEvent.objects.all().order_by('date')
    serializer = UpcomingEventSerializer(events, many=True)
    return Response(serializer.data)