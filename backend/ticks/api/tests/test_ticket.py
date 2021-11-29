from datetime import datetime
from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
import json

from api.models import Person, Ticket
from api.serializers import PersonSerializer, TicketSerializer


class TicketTests(APITestCase):
    fixtures = ["tickets", "persons"]

    def test_get_all_tickets(self):
        response = self.client.get("/api/tickets")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 6)

    def test_get_ticket(self):
        response = self.client.get("/api/tickets/5d69b330-ac08-47e6-9fd6-dc8d293a8499")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["time_spent"], 120)

    def test_put_ticket(self):

        ticket = {
            "id": "5d69b330-ac08-47e6-9fd6-dc8d293a8499",
            "title": "TestTitle",
            "customer": "Customer A",
            "assignee": str(Person.objects.first().id),
            "time_spent": 120,
            "active": True,
            "status": "OPEN",
        }

        response = self.client.put("/api/tickets/" + ticket["id"], ticket)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["time_spent"], 120)
        self.assertEqual(response.json()["title"], "TestTitle")
        self.assertEqual(response.json()["status"], "OPEN")

    def test_post_ticket(self):
        ticket = {
            "title": "NewTicket",
            "assignee": str(Person.objects.first().id),
            "customer": "Customer A",
            "time_spent": 0,
            "active": True,
            "status": "OPEN",
        }

        response = self.client.post("/api/tickets", ticket)
        self.assertEqual(response.status_code, 201)
