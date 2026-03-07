from django.contrib import admin
from .models import Events, Executive, TeamMember, GalleryEvent, GalleryImage, SuccessStory, UpcomingEvent

class GalleryImageInline(admin.TabularInline):
    model = GalleryImage
    extra = 1

class GalleryEventAdmin(admin.ModelAdmin):
    inlines = [GalleryImageInline]
    list_display = ('title', 'date', 'location', 'attendees')

class EventsAdmin(admin.ModelAdmin):
    list_display = ('title', 'date', 'venue', 'participants', 'status')

class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ('name', 'role', 'domain')


class ExecutiveAdmin(admin.ModelAdmin):
    list_display = ('name', 'position')


class SuccessStoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'year')

class UpcomingEventAdmin(admin.ModelAdmin):
    list_display = ('title', 'date', 'venue')
    list_filter = ('date',)
    search_fields = ('title', 'description')

admin.site.register(Events, EventsAdmin)
admin.site.register(Executive, ExecutiveAdmin)
admin.site.register(TeamMember, TeamMemberAdmin)
admin.site.register(GalleryEvent, GalleryEventAdmin)
admin.site.register(SuccessStory, SuccessStoryAdmin)
admin.site.register(UpcomingEvent, UpcomingEventAdmin)