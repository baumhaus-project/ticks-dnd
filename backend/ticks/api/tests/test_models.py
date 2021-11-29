from django.test import TestCase
from api.models import Person, Ticket


class PersonModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        Person.objects.create(name="TestPerson")

    def test_person_name(self):
        person = Person.objects.first()
        name = getattr(person, "name")
        self.assertEqual(name, "TestPerson")


class TicketModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        Person.objects.create(name="TestPerson")
        Ticket.objects.create(
            title="TestTitle",
            customer="Customer A",
            assignee=Person.objects.first(),
            time_spent=120,
            active=True,
            status="ASSIGNED",
        )

    def test_ticket_title(self):
        ticket = Ticket.objects.first()
        title = getattr(ticket, "title")
        self.assertEqual(title, "TestTitle")

    def test_ticket_customer(self):
        ticket = Ticket.objects.first()
        customer = getattr(ticket, "customer")
        self.assertEqual(customer, "Customer A")

    def test_ticket_assignee(self):
        ticket = Ticket.objects.first()
        assignee = getattr(ticket, "assignee")
        self.assertEqual(assignee, Person.objects.first())

    def test_ticket_time_spent(self):
        ticket = Ticket.objects.first()
        time_spent = getattr(ticket, "time_spent")
        self.assertEqual(time_spent, 120)

    def test_ticket_active(self):
        ticket = Ticket.objects.first()
        active = getattr(ticket, "active")
        self.assertEqual(active, True)

    def test_ticket_status(self):
        ticket = Ticket.objects.first()
        status = getattr(ticket, "status")
        self.assertEqual(status, "ASSIGNED")
