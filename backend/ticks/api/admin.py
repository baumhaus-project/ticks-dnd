from django.contrib import admin
from .models import Ticket
from .models import Person


admin.site.register(Ticket)
admin.site.register(Person)
