from django.shortcuts import render
from .models import Horse, Employee, Food
from .serializers import HorseSerializer, EmployeeSerializer, FoodSerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from rest_framework import viewsets

class HorseViewSet(viewsets.ModelViewSet):
    queryset = Horse.objects.all()
    serializer_class = HorseSerializer
    permission_classes = [IsAuthenticated]

class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    permission_classes = [IsAuthenticated]

class FoodViewSet(viewsets.ModelViewSet):
    queryset = Food.objects.all()
    serializer_class = FoodSerializer
    permission_classes = [AllowAny]

class EmployeeDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    permission_classes = [IsAuthenticated]

class HorseDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Horse.objects.all()
    serializer_class = HorseSerializer
    permission_classes = [IsAuthenticated]

class FoodDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Food.objects.all()
    serializer_class = FoodSerializer
    permission_classes = [IsAuthenticated]

