from django.shortcuts import render
from .models import Horse, Employee, Food
from .serializers import HorseSerializer, EmployeeSerializer, FoodSerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from rest_framework import viewsets
from django.db.models import Q
from django.http import JsonResponse

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

def search_view(request):
    query = request.GET.get('query', '')
    
    horses = Horse.objects.filter(Q(name__icontains=query) | Q(breed__icontains=query))
    employees = Employee.objects.filter(Q(name__icontains=query) | Q(role__icontains=query))
    food = Food.objects.filter(Q(name__icontains=query) | Q(type__icontains=query))

    results = list(horses.values()) + list(employees.values()) + list(food.values())
    return JsonResponse(results, safe=False)