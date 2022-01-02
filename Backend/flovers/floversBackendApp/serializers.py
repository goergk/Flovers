from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id', 
            'username', 
            'date_joined'
        ]

class FloristSerializer(serializers.ModelSerializer):
    class Meta:
        model = Florist
        fields = '__all__'