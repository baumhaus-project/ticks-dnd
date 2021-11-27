from django.db import models
import uuid


class Person(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name


class Ticket(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=200)
    customer = models.CharField(max_length=100)
    assignee = models.ForeignKey(Person, null=True, on_delete=models.SET_NULL)
    time_spent = models.IntegerField(default=0)
    active = models.BooleanField(default=False)

    STATUS = (
        ("OPEN", "Offen"),
        ("ASSIGNED", "Zugewiesen"),
        ("PROCESSING", "In Bearbeitung"),
    )
    status = models.CharField(max_length=20, choices=STATUS, default="OPEN")

    def __str__(self):
        return self.title
