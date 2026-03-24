from django.contrib import admin
from unfold.admin import ModelAdmin, TabularInline
from .models import (
    # Home
    OurStory, FAQ,
    # Events
    Events, UpcomingEvent, SuccessStory,
    # Team
    Member, Tab1Member, Tab2Member,
    # Gallery
    GalleryEvent, GalleryImage,
    # Services
    Service,
)


# ── HOME PAGE ──────────────────────────────
class OurStoryAdmin(ModelAdmin):
    list_display = ('title', 'sub_title', 'order')
    ordering = ('order',)


class FAQAdmin(ModelAdmin):
    list_display = ('question', 'order')
    ordering = ('order',)


# ── EVENTS PAGE ────────────────────────────
class EventsAdmin(ModelAdmin):
    list_display = ('title', 'date', 'venue', 'participants', 'status', 'report')


class UpcomingEventAdmin(ModelAdmin):
    list_display = ('title', 'date', 'venue')
    list_filter = ('date',)
    search_fields = ('title', 'description')


class SuccessStoryAdmin(ModelAdmin):
    list_display = ('name', 'year')


# ── TEAM PAGE ──────────────────────────────
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


# ── GALLERY PAGE ───────────────────────────
class GalleryImageInline(TabularInline):
    model = GalleryImage
    extra = 1


class GalleryEventAdmin(ModelAdmin):
    inlines = [GalleryImageInline]
    list_display = ('title', 'date', 'location', 'attendees')


# ── SERVICES PAGE ──────────────────────────
class ServiceAdmin(ModelAdmin):
    list_display = ('title', 'url')


# ── REGISTRATIONS ──────────────────────────
# Home
admin.site.register(OurStory, OurStoryAdmin)
admin.site.register(FAQ, FAQAdmin)

# Events
admin.site.register(Events, EventsAdmin)
admin.site.register(UpcomingEvent, UpcomingEventAdmin)
admin.site.register(SuccessStory, SuccessStoryAdmin)

# Team
admin.site.register(Tab1Member, Tab1MemberAdmin)
admin.site.register(Tab2Member, Tab2MemberAdmin)

# Gallery
admin.site.register(GalleryEvent, GalleryEventAdmin)

# Services
admin.site.register(Service, ServiceAdmin)
