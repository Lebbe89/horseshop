from django.db import models

class Horse(models.Model):
    breed = models.CharField(max_length=50,null=True)
    sex =models.CharField(max_length=50,null=True)
    location = models.CharField(max_length=50,null=True)
    birthdate = models.DateField(null=True)
    
    


    def __str__(self):
        return self.horse_id
    
class Employee(models.Model):
    firstname = models.CharField(max_length=50,null=True)
    lastname = models.CharField(max_length=50,null=True)
    department = models.CharField(max_length=50,null=True)
    birthdate = models.DateField(null=True)
    
    def __str__(self):
        return self.firstname + ' ' + self.lastname
    
class Food(models.Model):
    foodname = models.CharField(max_length=100, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2,null=True)
    kg = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    
    def __str__(self):
        return self.foodname