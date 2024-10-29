from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate, logout
from rest_framework.authtoken.models import Token
from django.views.decorators.csrf import csrf_exempt
from .serializers import UserSerializer

@api_view(['POST'])
@csrf_exempt
def register(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        token, _ = Token.objects.get_or_create(user=user)
        return Response({
            'message': 'User registered successfully!',
            'token': token.key
        }, status=201)
    return Response(serializer.errors, status=400)

@api_view(['POST'])
@csrf_exempt
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(username=username, password=password)

    if user is not None:
        token, _ = Token.objects.get_or_create(user=user)
        return Response({
            'message': 'Login successful!',
            'token': token.key,
            'username': user.username
        })
    return Response({'error': 'Invalid credentials'}, status=401)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def home(request):
    return Response({
        'username': request.user.username
    })

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    try:
        request.user.auth_token.delete()
    except Exception as e:
        pass
    
    logout(request)
    return Response({'message': 'User logged out successfully!'})