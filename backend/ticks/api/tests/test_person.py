from datetime import datetime
from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
import json

from api.models import Person, Ticket
from api.serializers import PersonSerializer, TicketSerializer


class PersonTests(APITestCase):
    fixtures = ["persons"]

    def test_get_all_persons(self):
        response = self.client.get("/api/persons")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 2)

    def test_get_person(self):
        response = self.client.get("/api/persons/d685d5ea-a076-4642-9a66-4178176bd0fd")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["name"], "Steffen")
