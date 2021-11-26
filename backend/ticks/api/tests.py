from datetime import datetime
from django.test import TestCase
from api.models import Person, Ticket
from api.serializers import PersonSerializer, TicketSerializer



person = Person(
    id="7b202019-e115-46a4-a561-f12eb7a5113b", 
    name="TestUser")

class PersonTests(TestCase):
    global person

    def test_post_person(self):
        serialized = PersonSerializer(person)             
        response = self.client.post("/api/persons", serialized.data)                
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


class TicketTests(TestCase):
    global person

    ticket = Ticket(
        title="Ticket A",
        created=datetime.today(),
        assignee=person,
        customer="Customer A", 
        time_spent=120, 
        active=True, 
        status="OPEN")

    def test_post_ticket(self):
        serialized = TicketSerializer(self.ticket)
        response = self.client.post("/api/tickets", serialized.data)                
        self.assertEqual(response.status_code, 201)

    def test_get_ticket(self):
        response = self.client.get("/api/tickets/" + str(self.ticket.id))                
        self.assertEqual(response.status_code, 200)

# Create your tests here.
