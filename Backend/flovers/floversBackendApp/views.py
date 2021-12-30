from django.http.response import Http404, JsonResponse
from django.db import IntegrityError
from django.contrib.auth import authenticate, login, logout
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework import serializers, status
from .models import User
from .serializers import  UserSerializer


@api_view(['GET'])
@authentication_classes(())
@permission_classes(())
def apiRoutes(request):
    api_urls = {
        'Login':'login/',
        'Register':'register/',
        'Users':'users/',
        'Get Token':'token/',
    }
    return Response(api_urls)

@api_view(['POST'])
@permission_classes(())
def login_view(request):

    try:
        user_data = request.data
        username = user_data["username"]
        password = user_data["password"]
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            serializer = UserSerializer(user)
            return Response(
            {
                "user":serializer.data,
                "login": True
            })
        else:
            raise Http404
    except:
        raise Http404

@api_view(['POST'])
@permission_classes(())
def register(request):

    user_data = request.data
    username = user_data["username"]
    email = user_data["email"]
    password = user_data["password"]
    confirmation = user_data["confirmation"]
    
    if password != confirmation:
        raise Http404

    try:
        user = User.objects.create_user(username, email, password)
        user.save()
    except IntegrityError:
        raise Http404
    login(request, user)
    serializer = UserSerializer(user)
    return Response(
        {
            "user":serializer.data,
            "login": True
        }) 

@api_view(['GET'])
def AllUsers(request):
    try:
        users = User.objects.all()
    except:
        raise Http404

    serializer = UserSerializer(users, many=True)
    return Response(
        {
            "users":serializer.data,
            "length":len(users)
        })