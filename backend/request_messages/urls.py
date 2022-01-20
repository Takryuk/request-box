from rest_framework import routers
from django.contrib import admin
from django.urls import include, path

from .views import (
    ReceiverMessageListView,
    MessageCreateView,
)

app_name = 'request_messages'
urlpatterns = [
    path('list', ReceiverMessageListView.as_view(), name='message-list'),
    path('create', MessageCreateView.as_view(), name='message-create'),


]
