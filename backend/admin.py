from django.contrib import admin
from .models import Events, Member, GalleryEvent, GalleryImage, SuccessStory, UpcomingEvent

class GalleryImageInline(admin.TabularInline):
    model = GalleryImage
    extra = 1

class GalleryEventAdmin(admin.ModelAdmin):
    inlines = [GalleryImageInline]
    list_display = ('title', 'date', 'location', 'attendees')

class EventsAdmin(admin.ModelAdmin):
    list_display = ('title', 'date', 'venue', 'participants', 'status')

class MemberAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'role', 'domain', 'position', 'order')
    list_filter = ('category', 'domain', 'position')
    search_fields = ('name',)

class SuccessStoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'year')

class UpcomingEventAdmin(admin.ModelAdmin):
    list_display = ('title', 'date', 'venue')
    list_filter = ('date',)
    search_fields = ('title', 'description')

admin.site.register(Events, EventsAdmin)
admin.site.register(Member, MemberAdmin)
admin.site.register(GalleryEvent, GalleryEventAdmin)
admin.site.register(SuccessStory, SuccessStoryAdmin)
admin.site.register(UpcomingEvent, UpcomingEventAdmin)