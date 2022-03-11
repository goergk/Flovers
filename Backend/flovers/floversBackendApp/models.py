from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    pass

class Flower(models.Model):
    name = models.CharField(max_length=16, blank=False)
    price = models.DecimalField(max_digits=5, decimal_places=2, blank=False)
    amount = models.IntegerField(blank=False, default=0)
    creation_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name}. Price: {self.price}$. Amount:{self.amount}"

class Delivery(models.Model):
    flowers = models.ManyToManyField(Flower, related_name="delivery_flowers", blank=True)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Delivery id: {self.id}."

class Bouquet(models.Model):
    name = models.CharField(max_length=16, blank=False)
    flowers = models.ManyToManyField(Flower, related_name="flowers_in_bouquet", blank=True)
    creation_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Bouquet: {self.name}."    

class BouquetObject(models.Model):
    bouquet = models.ForeignKey(Bouquet, null=True, on_delete=models.CASCADE, related_name="bouquet_obj")
    amount = models.IntegerField(blank=False, default=0)

    def __str__(self):
        return f"Bouquet: {self.bouquet.name}."  

class Sale(models.Model):
    flowers = models.ManyToManyField(Flower, related_name="sold_flowers", blank=True)
    bouquets = models.ManyToManyField(BouquetObject, related_name="sold_bouquets", blank=True)
    creation_date = models.DateTimeField(auto_now_add=True, null=True)

    def __str__(self):
        return f"Sale: {self.id}." 

class Florist(models.Model):
    owner =  models.ForeignKey(User, on_delete=models.CASCADE, related_name="florist_owner")
    name = models.CharField(max_length=10, blank=False)
    flowers = models.ManyToManyField(Flower, related_name="flowers_in_florist", blank=True)
    bouquets = models.ManyToManyField(Bouquet, related_name="bouquets_in_florist", blank=True)
    deliveries = models.ManyToManyField(Delivery, related_name="deliveries_in_florist", blank=True)
    sales = models.ManyToManyField(Sale, related_name="sales_in_florist", blank=True)

    def __str__(self):
        return f"{self.owner}: {self.name}."