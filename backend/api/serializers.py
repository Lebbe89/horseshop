from rest_framework import serializers
from .models import Horse, Employee ,Food

class HorseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Horse
        fields = '__all__'

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'

class FoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Food
        fields = '__all__'
        