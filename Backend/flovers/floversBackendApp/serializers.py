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

class FlowerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Flower
        fields = (
            'id',
            'name',
            'price',
            'amount',
            'creation_date'
        )

class DeliverySerializer(serializers.ModelSerializer):

    flowers = FlowerSerializer(many=True)
    class Meta:
        model = Delivery
        fields = (
            'id',
            'flowers',
            'date'           
        )

class BouquetSerializer(serializers.ModelSerializer):

    flowers = FlowerSerializer(many=True)
    class Meta:
        model = Bouquet
        fields = (
            'id',
            'name',
            'flowers',
            'creation_date',            
        )

class BouquetObjectSerializer(serializers.ModelSerializer):

    bouquet = BouquetSerializer(many=False)
    class Meta:
        model = BouquetObject
        fields = (
            'id',
            'bouquet',
            'amount',           
        )

class SaleSerializer(serializers.ModelSerializer):

    flowers = FlowerSerializer(many=True)
    bouquets = BouquetObjectSerializer(many=True)
    class Meta:
        model = Sale
        fields = (
            'id',            
            'flowers',
            'bouquets',
            'creation_date',    
        )

class FloristSerializer(serializers.ModelSerializer):
    
    owner = UserSerializer(many=False)
    flowers = FlowerSerializer(many=True)
    bouquets = BouquetSerializer(many=True)
    deliveries = DeliverySerializer(many=True)
    sales = SaleSerializer(many=True)

    class Meta:
        model = Florist
        fields = (
            'id',
            'name',
            'owner',
            'flowers',
            'bouquets',
            'deliveries',
            'sales'
        )