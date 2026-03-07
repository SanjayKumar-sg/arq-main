from django.db import models
from django.contrib.auth.models import User
import datetime
import os


def getFileName(instance, filename):
    now_time = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
    new_filename = "%s_%s" % (now_time, filename)
    return os.path.join('uploads/', new_filename)


class Events(models.Model):
    title = models.CharField(max_length=255, default="")
    date = models.CharField(max_length=100, default="")
    type = models.CharField(max_length=100, default="")
    highlights = models.TextField(default="")
    image = models.ImageField(upload_to=getFileName, null=True, blank=True)
    status = models.CharField(max_length=50, default="Completed")
    rating = models.FloatField(default=0.0)
    participants = models.IntegerField(null=True, blank=True)
    duration = models.CharField(max_length=100, default="")
    venue = models.CharField(max_length=255, default="Virtual Event")
    description = models.TextField(default="")
    short_info = models.TextField(default="")
    posted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class Executive(models.Model):
    Position_CHOICES = [
        ('president', 'President'),
        ('vice-president', 'Vice-President'),
        ('secretary', 'Secretary'),
        ('ceo', 'CEO'),
        ('hr', 'HR'),
    ]
    name = models.CharField(max_length=255)
    position = models.CharField(max_length=100, choices=Position_CHOICES)
    image = models.ImageField(upload_to=getFileName)
    linkedin = models.URLField(max_length=500, blank=True)
    order = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.name} - {self.position}"


class TeamMember(models.Model):
    DOMAIN_CHOICES = [
        ('webdev', 'Web Development'),
        ('dataanalytics', 'Data Analytics'),
        ('machinelearning', 'Machine Learning'),
        ('datasecurity', 'Data Security'),
        ('cloudcomputing', 'Cloud Computing'),
        ('design', 'Design & Media'),
        ('cinematography', 'Cinematography'),
        ('iot', 'IoT & Hardware'),
        ('bi', 'Business Intelligence'),
        ('management', 'Management'),
        ('event', 'Event Management'),
        ('pr', 'Public Relations'),
    ]

    Role_CHOICES = [
        ('lead', 'Lead'),
        ('co-lead', 'Co-lead'),
        ('associate', 'Associate'),
    ]
    name = models.CharField(max_length=255)
    role = models.CharField(max_length=100, choices=Role_CHOICES)
    domain = models.CharField(max_length=50, choices=DOMAIN_CHOICES)
    image = models.ImageField(upload_to=getFileName)
    linkedin = models.URLField(max_length=500, blank=True)

    def __str__(self):
        return f"{self.name} ({self.domain})"


class GalleryEvent(models.Model):
    title = models.CharField(max_length=255)
    date = models.CharField(max_length=100)
    location = models.CharField(max_length=255)
    attendees = models.CharField(max_length=100)
    thumbnail = models.ImageField(upload_to=getFileName)

    def __str__(self):
        return self.title


class GalleryImage(models.Model):
    event = models.ForeignKey(GalleryEvent, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to=getFileName)

    def __str__(self):
        return f"Image for {self.event.title}"


class SuccessStory(models.Model):
    name = models.CharField(max_length=255)
    story = models.TextField()
    year = models.CharField(max_length=4)

    def __str__(self):
        return f"{self.name} ({self.year})"


class UpcomingEvent(models.Model):
    title = models.CharField(max_length=255)
    date = models.CharField(max_length=100)
    venue = models.CharField(max_length=255, default="Virtual Event")
    description = models.TextField()
    short_info = models.TextField(blank=True)
    image = models.ImageField(upload_to=getFileName, null=True, blank=True)
    link = models.URLField(max_length=500, blank=True, help_text="Registration link")
    posted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
