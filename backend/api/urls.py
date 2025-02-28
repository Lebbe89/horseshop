from django.urls import path, include
from .views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'employee', EmployeeViewSet, basename='employee')
router.register(r'food', FoodViewSet, basename='food')
router.register(r'horse', HorseViewSet, basename='horse')


urlpatterns = [
    path('', include(router.urls)),
]
