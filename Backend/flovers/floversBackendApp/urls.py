from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    ## MAIN ROUTES
    path('', views.apiRoutes, name="api-routes"),
    path("login/", views.login_view, name="Login"),
    path("register/", views.register, name="Register"),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    ## GET
    path("users/", views.AllUsers, name="Users"),
    path("florists/<int:user_id>/", views.Florists, name="Florists"),
    path("florist/<int:florist_id>", views.GetFlorist, name="GetFlorist"),

    ##POST
    path("florists/add/", views.CreateFlorist, name="CreateFlorist"),
    path("flowers/add/", views.CreateFlower, name="CreateFlower"),
    path("deliveries/add/", views.CreateDelivery, name="CreateDelivery"),
    path("bouquets/add/", views.CreateBouquet, name="CreateBouquet"),

    ##PUT
    path("flower/<int:flower_id>/update/", views.UpdateFlower, name="UpdateFlower"),
    path("bouquet/<int:bouquet_id>/update/", views.UpdateBouquet, name="UpdateBouquet"),

    ## PUT FLOWER, BOUQUET & DELIVERY IN FLORIST
    path("florist/<int:florist_id>/flower/", views.UpdateFloristFlowers, name="UpdateFloristFlowers"),
    path("florist/<int:florist_id>/bouquet/", views.UpdateFloristBouquets, name="UpdateFloristBouquets"),
    path("florist/<int:florist_id>/delivery/", views.UpdateFloristDeliveries, name="UpdateFloristDeliveries"),
    path("florist/<int:florist_id>/sale/", views.UpdateFloristSales, name="UpdateFloristSales"),

    ## DELETE
    path("flower/<int:flower_id>/delete/", views.DeleteFlower, name="DeleteFlower"),
    path("delivery/<int:delivery_id>/delete/", views.DeleteDelivery, name="DeleteDelivery"),
    path("bouquet/<int:bouquet_id>/delete/", views.DeleteBouquet, name="DeleteBouquet"),
    path("florist/<int:florist_id>/delete/", views.DeleteFlorist, name="DeleteFlorist"),
]