from django.contrib import admin
from django.urls import path

# from rest_framework_simplejwt.views import (
#     TokenObtainPairView,
#     TokenRefreshView,
#     TokenVerifyView,
# )

from .views import(
    # purchase_video,
    username_change,
    profile_change, 
    image_change,
    PublicProfileView,
    # UsernameChangeView,
    # has_purchased,
)

app_name="users"

urlpatterns = [
    path('username/', username_change, name='username-change'),
    path('profile/', profile_change, name='profile-change'),
    path('image/', image_change, name='image-change'),
    path('profile/<int:pk>',PublicProfileView.as_view(), name='public-profile')
]
