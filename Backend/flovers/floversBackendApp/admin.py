from django.contrib import admin
from .models import *

admin.site.register(User)
admin.site.register(Flower)
admin.site.register(Delivery)
admin.site.register(Bouquet)
admin.site.register(Sale)
admin.site.register(Florist)