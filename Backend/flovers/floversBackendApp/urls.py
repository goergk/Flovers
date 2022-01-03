from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('', views.apiRoutes, name="api-routes"),
    path("login/", views.login_view, name="Login"),
    path("register/", views.register, name="Register"),
    path("users/", views.AllUsers, name="Users"),
    path("florists/<int:id>/", views.Florists, name="Florists"),
    path("florists/add/", views.CreateFlorist, name="Add-Florists"),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]