from datetime import datetime
from django.test import TestCase
from rest_framework.test import APITestCase

from api.models import Person, Ticket
from api.serializers import PersonSerializer, TicketSerializer





class PersonTests(APITestCase):
    person = Person(name="TestUser")

    def test_post_person(self):
        serializer = PersonSerializer(self.person)             
        response = self.client.post("/api/persons", serializer.data)                
        self.assertEqual(response.status_code, 201)

    # def test_put_person(self):
    #     response = self.client.put("/api/persons", {"name": "FakeUser"})
    #     self.assertEqual(response.status_code, 200)
    #     self.assertEqual(response.data["name"], "FakeUser")

    # def test_delete_person(self):
    #     serialized = PersonSerializer(self.person)             
    #     response = self.client.delete("/api/persons", serialized.data)                
    #     self.assertEqual(response.status_code, 201)

    # def test_get_person(self):
    #     response = self.client.get("/api/persons" str(self.person.id))
    #     self.assertEqual(response.status_code, 200)
    #     self.assertEqual(response.data["name"], "TestUser")


class TicketTests(APITestCase):
    person = Person(name="TestUser")
    
    ticket = Ticket(
        id="46fa4703-0248-49f4-bb54-800c2900bb78",
        title="Ticket A",
        created=datetime.today(),
        assignee=person,
        customer="Customer A", 
        time_spent=120, 
        active=True, 
        status="OPEN")

    def test_post_ticket(self):
        serializer = TicketSerializer(self.ticket)

        print(Person.objects.all())

        test_data = {
            "id":"46fa4703-0248-49f4-bb54-800c2900bb78",
            "created":"2021-11-27T14:49:46.801282Z",
            "title":"Ticket A",
            "customer":"Customer A",
            "time_spent":120,
            "active":True,
            "status":"OPEN",
            #"assignee": str(self.person.id)
            }

        response = self.client.post("/api/tickets", test_data)                
        self.assertEqual(response.status_code, 201)

    # def test_get_ticket(self):               
    #     response = self.client.get("/api/tickets/" + str(self.ticket.id))                
    #     self.assertEqual(response.status_code, 200)

# Create your tests here.
