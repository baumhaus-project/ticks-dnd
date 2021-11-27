from datetime import datetime
from django.test import TestCase
from rest_framework.test import APITestCase

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


class TicketTests(APITestCase):
    fixtures = ["tickets", "persons"]

    def test_get_all_tickets(self):
        response = self.client.get("/api/tickets")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 3)

    def test_get_ticket(self):
        response = self.client.get("/api/tickets/5d69b330-ac08-47e6-9fd6-dc8d293a8499")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["time_spent"], 120)

    def test_put_ticket(self):

        changes = {
            "id": "5d69b330-ac08-47e6-9fd6-dc8d293a8499",
            "created": "2021-11-27T14:49:46.801282Z",
            "title": "TestTitle",
            "customer": "Customer A",
            "assignee": "d685d5ea-a076-4642-9a66-4178176bd0fd",
            "time_spent": 120,
            "active": True,
            "status": "ASSIGNED",
        }
        response = self.client.put(
            "/api/tickets/5d69b330-ac08-47e6-9fd6-dc8d293a8499", changes
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["time_spent"], 120)
        self.assertEqual(response.json()["title"], "TestTitle")
        self.assertEqual(response.json()["status"], "ASSIGNED")

    def test_post_ticket(self):
        ticket = Ticket(
            title="NewTicket",
            created=datetime.today(),
            assignee=Person.objects.first(),
            customer="Customer A",
            time_spent=0,
            active=True,
            status="ASSIGNED",
        )

        serializer = TicketSerializer(ticket)
        response = self.client.post("/api/tickets", serializer.data)
        self.assertEqual(response.status_code, 201)
