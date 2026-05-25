from django.contrib import admin
from .models import (
    Campaign,
    Group,
    Element,
    Reaction
)

admin.site.register(Campaign)
admin.site.register(Group)
admin.site.register(Element)
admin.site.register(Reaction)