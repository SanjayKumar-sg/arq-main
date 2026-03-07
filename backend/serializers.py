from rest_framework import serializers
from .models import Events, Executive, TeamMember, GalleryEvent, GalleryImage, SuccessStory, UpcomingEvent

class EventsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Events
        fields = '__all__'

class ExecutiveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Executive
        fields = '__all__'

class TeamMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamMember
        fields = '__all__'

class GalleryImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = GalleryImage
        fields = ('image',)

class GalleryEventSerializer(serializers.ModelSerializer):
    images = GalleryImageSerializer(many=True, read_only=True)
    
    class Meta:
        model = GalleryEvent
        fields = ('id', 'title', 'date', 'location', 'attendees', 'thumbnail', 'images')


class SuccessStorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SuccessStory
        fields = '__all__'


class UpcomingEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = UpcomingEvent
        fields = '__all__'
