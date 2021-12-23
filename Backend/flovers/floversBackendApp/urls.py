from django.urls import path
from . import views

urlpatterns = [
    path('', views.apiRoutes, name="api-routes"),
    path("login/", views.login_view, name="Login"),
    path("register/", views.register, name="Register"),
    path("users/", views.AllUsers, name="Users"),
]