from django.http import response
from django.test import TestCase

class URLTests(TestCase):
    def test_tickets(self):
        response = self.client.get("/api/tickets")
        self.assertEqual(response.status_code, 200)
    def test_persons(self):
        response = self.client.get("/api/persons")
        self.assertEqual(response.status_code, 200)

# class GetTests(TestCase):
#     def test_get_tickets(self):


# Create your tests here.
