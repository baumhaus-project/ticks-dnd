from django.urls import path
from . import views


urlpatterns = [
    path('tickets', views.TicketList.as_view()),
    path('tickets/<pk>', views.TicketDetail.as_view()),
    path('persons', views.PersonList.as_view()),
    path('persons/<pk>', views.PersonDetail.as_view()),
]
