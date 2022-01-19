from rest_framework import routers
from django.contrib import admin
from django.urls import include, path

from .views import (
    ReceiverMessageListView,
    MessageCreateView,
)


urlpatterns = [
    path('list', ReceiverMessageListView.as_view(), name='message-list'),
    path('create', MessageCreateView.as_view(), name='message-list'),


]
