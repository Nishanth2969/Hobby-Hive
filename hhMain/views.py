from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate, logout
from .serializers import UserSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

@api_view(['POST'])
def register(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'User registered successfully!'},status = 201)
    return Response(serializer.errors, status=400)

@api_view(['POST'])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(username=username, password=password)

    if user is not None:
        return Response({'message': 'Login successful!'})
    return Response({'error': 'Invalid credentials'}, status=401)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def home(request):
    return Response({'message': 'Welcome to HobbyHive!'})

@api_view(['POST'])
def logout_view(request):
    logout(request)
    return Response({'message': 'User logged out successfully!'})