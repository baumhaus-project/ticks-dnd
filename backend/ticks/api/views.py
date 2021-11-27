from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import Http404
from . import serializers
from . import models

class TicketList(APIView):
    def get(self, request, format=None):
        queryset = models.Ticket.objects.all()

        customer = request.query_params.get('customer')
        if customer:
            queryset = queryset.filter(customer=customer)
        assignee = request.query_params.get('assignee')
        if assignee:
            queryset = queryset.filter(assignee=assignee)

        serializer = serializers.TicketSerializer(queryset, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = serializers.TicketSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TicketDetail(APIView):
    def get_object(self, pk):
        try:
            return models.Ticket.objects.get(pk=pk)
        except models.Ticket.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        obj = self.get_object(pk)
        serializer = serializers.TicketSerializer(obj)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        obj = self.get_object(pk)
        serializer = serializers.TicketSerializer(obj, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        obj = self.get_object(pk)
        obj.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class PersonList(APIView):
    def get(self, request, format=None):
        queryset = models.Person.objects.all()
        serializer = serializers.PersonSerializer(queryset, many=True)
        return Response(serializer.data)
    
    def post(self, request, format=None):
        serializer = serializers.PersonSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PersonDetail(APIView):
    def get_object(self, pk):
        try:
            return models.Person.objects.get(pk=pk)
        except models.Person.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        obj = self.get_object(pk)
        serializer = serializers.PersonSerializer(obj)
        return Response(serializer.data)
