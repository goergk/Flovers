from django.http.response import Http404, JsonResponse
from django.db import IntegrityError
from django.contrib.auth import authenticate, login, logout
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework import serializers, status
from .models import *
from .serializers import  UserSerializer, FloristSerializer


@api_view(['GET'])
@authentication_classes(())
@permission_classes(())
def apiRoutes(request):
    api_urls = {
        'Login':'login/',
        'Register':'register/',
        'Users':'users/',
        'Florists':'florists/<user:id>/',
        'Add Florist':'florists/add/',
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

@api_view(['GET'])
def Florists(request, id):
    try:
        florists = Florist.objects.filter(owner__id=id)
    except:
        return Response(
        {
            "length": 0
        })

    serializer = FloristSerializer(florists, many=True)
    return Response(
        {
            "florists":serializer.data,
            "length":len(florists)
        })

@api_view(['POST'])
def CreateFlorist(request):
    if request.user.is_authenticated:  
        serializer = FloristSerializer(data=request.data)
        print(serializer)

        if serializer.is_valid():
            florist_data = request.data
            new_florist = Florist.objects.create(
                owner = User.objects.filter(id = florist_data['owner']).first(),
                name =  florist_data['name']
            )
            new_florist.save()
            serializer = FloristSerializer(new_florist)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        raise Http404
    else:
        return Response(status=status.HTTP_401_UNAUTHORIZED)