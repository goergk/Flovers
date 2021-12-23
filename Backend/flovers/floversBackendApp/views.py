from django.http.response import Http404, JsonResponse
from django.db import IntegrityError
from django.contrib.auth import authenticate, login, logout
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import serializers, status
from .models import User
from .serializers import  UserSerializer


@api_view(['GET'])
def apiRoutes(request):
    api_urls = {
        'Login':'login/',
        'Register':'register/',
        'Users':'users/',
    }
    return Response(api_urls)

@api_view(['POST'])
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
            return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)
    except:
        raise Http404


@api_view(['POST'])
def register(request):

    user_data = request.data
    username = user_data["username"]
    email = user_data["email"]
    password = user_data["password"]
    confirmation = user_data["confirmation"]
    
    if password != confirmation:
        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = User.objects.create_user(username, email, password)
        user.save()
    except IntegrityError:
        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)
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
            "events":serializer.data,
            "length":len(users)
        })