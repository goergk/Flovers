from django.http.response import Http404, JsonResponse
from django.db import IntegrityError
from django.contrib.auth import authenticate, login, logout
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework import serializers, status
from .models import *
from .serializers import *


@api_view(['GET'])
@authentication_classes(())
@permission_classes(())
def apiRoutes(request):
    api_urls = {
        'Login':'login/',
        'Register':'register/',        
        'Get Token':'token/', 

        'Users':'users/',
        'User\'s Florists':'florists/<user:id>/',
        'User\'s Florist':'florist/<user:id>/<florist:id>',

        'Add Florist':'florists/add/',
        'Add Flower':'flowers/add/',
        'Add Delivery':'deliveries/add/',
        'Add Bouquet':'bouquets/add/',

        'Delete Flower': 'flower/<flower:id>/delete/',
        'Delete Bouquet': 'bouquet/<bouquet:id>/delete/',
        'Delete Florist': 'florist/<florist:id>/delete/',
        'Delete Delivery': 'delivery/<delivery:id>/delete/',

        'Update Flower': 'flower/<int:flower_id>/update/',
        'Update Bouquet': 'bouquet/<int:bouquet_id>/update/',
        'Update Florist': 'florist/<int:florist_id>/update/',
    }
    return Response(api_urls)

# ================================
# PUT VIEWS
@api_view(['PUT'])
@permission_classes(())
def UpdateFlower(request, flower_id):
    # if request.user.is_authenticated:  
    try:
        flower = Flower.objects.get(id=flower_id)
    except:
        raise Http404

    serializer = FlowerSerializer(flower, data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

    raise Http404
    # else:
    #    return Response(status=status.HTTP_401_UNAUTHORIZED)


@api_view(['PUT'])
@permission_classes(())
def UpdateBouquet(request, bouquet_id):
    # if request.user.is_authenticated:  
    try:
        bouquet = Bouquet.objects.get(id=bouquet_id)
    except:
        raise Http404

    serializer = BouquetSerializer(bouquet, data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

    raise Http404
    # else:
    #    return Response(status=status.HTTP_401_UNAUTHORIZED)
     

@api_view(['PUT'])
@permission_classes(())
def UpdateFloristFlowers(request, florist_id):
    # if request.user.is_authenticated:  
    try:
        florist = Florist.objects.get(id=florist_id)
    except:
        raise Http404

    serializer = FlowerSerializer(data=request.data)

    if serializer.is_valid():
        flower_data = request.data
        new_flower = Flower.objects.create(            
            name =  flower_data['name'],
            price =  flower_data['price'],
            amount =  flower_data['amount']
        )
        new_flower.save()
        florist.flowers.add(new_flower)
        florist.save()

        serializer = FloristSerializer(florist)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    raise Http404
    # else:
    #    return Response(status=status.HTTP_401_UNAUTHORIZED)


@api_view(['PUT'])
@permission_classes(())
def UpdateFloristBouquets(request, florist_id):
    # if request.user.is_authenticated:  
    try:
        florist = Florist.objects.get(id=florist_id)
    except:
        raise Http404

    serializer = FloristSerializer(florist, data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

    raise Http404
    # else:
    #    return Response(status=status.HTTP_401_UNAUTHORIZED)    
            

# ================================
# POST VIEWS

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

@api_view(['POST'])
@permission_classes(())
def CreateFlorist(request):
    # if request.user.is_authenticated:  
        serializer = FloristSerializer(data=request.data)

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
    # else:
    #     return Response(status=status.HTTP_401_UNAUTHORIZED)


@api_view(['POST'])
@permission_classes(())
def CreateFlower(request):
    # if request.user.is_authenticated:  
        serializer = FlowerSerializer(data=request.data)

        if serializer.is_valid():
            flower_data = request.data
            new_flower = Flower.objects.create(            
                name =  flower_data['name'],
                price =  flower_data['price'],
                amount =  flower_data['amount']
            )
            new_flower.save()
            serializer = FlowerSerializer(new_flower)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        raise Http404
    # else:
    #     return Response(status=status.HTTP_401_UNAUTHORIZED)


@api_view(['POST'])
@permission_classes(())
def CreateDelivery(request):
    # if request.user.is_authenticated:  
        serializer = DeliverySerializer(data=request.data)

        if serializer.is_valid():
            delivery_data = request.data        
            flowers_tab = delivery_data['flowers']

            new_delivery = Delivery()
            new_delivery.save()
            for flower in flowers_tab:
                new_flower = Flower.objects.create(            
                name =  flower['name'],
                price =  flower['price'],
                amount =  flower['amount']
            )
                new_delivery.flowers.add(new_flower)
                new_delivery.save()

            serializer = DeliverySerializer(new_delivery)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        raise Http404
    # else:
    #     return Response(status=status.HTTP_401_UNAUTHORIZED)


@api_view(['POST'])
@permission_classes(())
def CreateBouquet(request):
    # if request.user.is_authenticated:  
        serializer = BouquetSerializer(data=request.data)

        if serializer.is_valid():
            bouquet_data = request.data        
            flowers_tab = bouquet_data['flowers']

            new_bouquet = Bouquet.objects.create(
                name =  bouquet_data['name'],
            )        
            new_bouquet.save()

            for flower in flowers_tab:
                new_flower = Flower.objects.create(            
                name =  flower['name'],
                price =  flower['price'],
                amount =  flower['amount']
            )
                new_bouquet.flowers.add(new_flower)
                new_bouquet.save()

            serializer = BouquetSerializer(new_bouquet)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        raise Http404
    # else:
    #     return Response(status=status.HTTP_401_UNAUTHORIZED)

# ================================
# GET VIEWS

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
@permission_classes(())
def Florists(request, user_id):
    try:
        florists = Florist.objects.filter(owner__id=user_id)
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

@api_view(['GET'])
@permission_classes(())
def GetFlorist(request, user_id, florist_id):
    try:
        florist = Florist.objects.filter(owner__id=user_id, id=florist_id)
    except:
        return Response(
        {
            "error": "Florist doesn't exist."
        })

    serializer = FloristSerializer(florist, many=True)
    return Response(
        {
            "florist":serializer.data,
        })

# ================================
# DELETE VIEWS
@api_view(['DELETE'])
@permission_classes(())
def DeleteFlower(request, flower_id):
    # if request.user.is_authenticated:
    try:
        flower = Flower.objects.get(id=flower_id)
    except:
        raise Http404
    
    flower.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
    # else:
    #    return Response(status=status.HTTP_401_UNAUTHORIZED) 


@api_view(['DELETE'])
@permission_classes(())
def DeleteBouquet(request, bouquet_id):
    # if request.user.is_authenticated:
    try:
        bouquet = Bouquet.objects.get(id=bouquet_id)
    except:
        raise Http404
    
    bouquet.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
    # else:
    #    return Response(status=status.HTTP_401_UNAUTHORIZED) 


@api_view(['DELETE'])
@permission_classes(())
def DeleteFlorist(request, florist_id):
    # if request.user.is_authenticated:
    try:
        florist = Flower.objects.get(id=florist_id)
    except:
        raise Http404
    
    florist.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
    # else:
    #    return Response(status=status.HTTP_401_UNAUTHORIZED) 


