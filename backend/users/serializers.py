from rest_framework import serializers
from djoser.serializers import UserSerializer
from django.contrib.auth import get_user_model
from django.db.models import Sum

from .models import Profile


User = get_user_model()


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = [
            'id',
            'profile',
            'image',
            'username',
        ]



#プライベートな情報に注意！
class UserProfileSerializer(UserSerializer):
    profile = ProfileSerializer()

    
    class Meta(UserSerializer.Meta):
        model = User
        fields = [
            'id', 
            'email', 
            # 'username',
            'profile',
            # 'profile_id',
            # 'profile', 
            # 'image',
        ]

    def to_representation(self, obj):
        representation = super().to_representation(obj)
        field = 'profile'
        inner_representation = representation.pop(field)
        if inner_representation:
            for key in inner_representation:
                representation[field+"_"+key] = inner_representation[key]    
        return representation







class PublicProfileSerializer(UserSerializer):
    class Meta(UserSerializer.Meta):
        model = Profile
        fields = ['id', 'username','profile', 'image']



        



