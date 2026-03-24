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


class Member(models.Model):
    CATEGORY_CHOICES = [
        ('Executive', 'Executive'),
        ('Team Member', 'Team Member'),
    ]

    DOMAIN_CHOICES = [
        ('Web Development', 'Web Development'),
        ('Data Analytics', 'Data Analytics'),
        ('Machine Learning', 'Machine Learning'),
        ('Data Security', 'Data Security'),
        ('Cloud Computing', 'Cloud Computing'),
        ('Design & Media', 'Design & Media'),
        ('Cinematography', 'Cinematography'),
        ('IoT & Hardware', 'IoT & Hardware'),
        ('Business Intelligence', 'Business Intelligence'),
        ('Management', 'Management'),
        ('Event Management', 'Event Management'),
        ('Public Relations', 'Public Relations'),
        ('None', 'None'),
    ]

    ROLE_CHOICES = [
        ('Lead', 'Lead'),
        ('Co-lead', 'Co-lead'),
        ('Associate', 'Associate'),
        ('None', 'None'),
    ]

    POSITION_CHOICES = [
        ('President', 'President'),
        ('Vice-President', 'Vice-President'),
        ('Secretary', 'Secretary'),
        ('CEO', 'CEO'),
        ('HR', 'HR'),
        ('None', 'None'),
    ]

    TEAM_TAB_CHOICES = [
        (1, 'Previous Tenure'),
        (2, 'Current Tenure'),
    ]

    team_tab = models.IntegerField(choices=TEAM_TAB_CHOICES, default=1)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='Team Member')
    name = models.CharField(max_length=255)
    image = models.ImageField(upload_to=getFileName)
    linkedin = models.URLField(max_length=500, blank=True)
    order = models.IntegerField(default=0, help_text="Ordering for display")
    position = models.CharField(max_length=100, choices=POSITION_CHOICES, default='None')
    role = models.CharField(max_length=100, choices=ROLE_CHOICES, default='None')
    domain = models.CharField(max_length=50, choices=DOMAIN_CHOICES, default='None')

    def __str__(self):
        if self.category == 'Executive':
            return f"{self.name} - {self.get_position_display()} (Executive)"
        return f"{self.name} - {self.get_domain_display()} ({self.get_role_display()})"


class Tab1MemberManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(team_tab=1)

class Tab1Member(Member):
    objects = Tab1MemberManager()
    class Meta:
        proxy = True
        verbose_name = 'Previous Tenure'
        verbose_name_plural = 'Previous Tenure'

class Tab2MemberManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(team_tab=2)

class Tab2Member(Member):
    objects = Tab2MemberManager()
    class Meta:
        proxy = True
        verbose_name = 'Current Tenure'
        verbose_name_plural = 'Current Tenure'


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


class Service(models.Model):
    title = models.CharField(max_length=255, default="Service")
    description = models.TextField(blank=True, default="")
    image = models.ImageField(upload_to=getFileName)
    url = models.URLField(max_length=500, blank=True)

    def __str__(self):
        return self.title
