from rest_framework import serializers
from . import models


class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Person
        fields = "__all__"


class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Ticket
        fields = "__all__"
