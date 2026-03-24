from django.contrib import admin
from unfold.admin import ModelAdmin, TabularInline
from .models import Events, Member, GalleryEvent, GalleryImage, SuccessStory, UpcomingEvent, Service, Tab1Member, Tab2Member

class GalleryImageInline(TabularInline):
    model = GalleryImage
    extra = 1

class GalleryEventAdmin(ModelAdmin):
    inlines = [GalleryImageInline]
    list_display = ('title', 'date', 'location', 'attendees')

class EventsAdmin(ModelAdmin):
    list_display = ('title', 'date', 'venue', 'participants', 'status')

class Tab1MemberAdmin(ModelAdmin):
    list_display = ('name', 'category', 'role', 'domain', 'position', 'order')
    list_filter = ('category', 'domain', 'position')
    search_fields = ('name',)
    exclude = ('team_tab',)

    def save_model(self, request, obj, form, change):
        obj.team_tab = 1
        super().save_model(request, obj, form, change)

class Tab2MemberAdmin(ModelAdmin):
    list_display = ('name', 'category', 'role', 'domain', 'position', 'order')
    list_filter = ('category', 'domain', 'position')
    search_fields = ('name',)
    exclude = ('team_tab',)

    def save_model(self, request, obj, form, change):
        obj.team_tab = 2
        super().save_model(request, obj, form, change)

class SuccessStoryAdmin(ModelAdmin):
    list_display = ('name', 'year')

class UpcomingEventAdmin(ModelAdmin):
    list_display = ('title', 'date', 'venue')
    list_filter = ('date',)
    search_fields = ('title', 'description')

class ServiceAdmin(ModelAdmin):
    list_display = ('title', 'url')

admin.site.register(Events, EventsAdmin)
admin.site.register(Tab1Member, Tab1MemberAdmin)
admin.site.register(Tab2Member, Tab2MemberAdmin)
admin.site.register(GalleryEvent, GalleryEventAdmin)
admin.site.register(SuccessStory, SuccessStoryAdmin)
admin.site.register(UpcomingEvent, UpcomingEventAdmin)
admin.site.register(Service, ServiceAdmin)
