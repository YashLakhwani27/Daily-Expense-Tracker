from django.db import models

# Create your models here.
class UserDetail(models.Model):
    FullName = models.CharField(max_length=100)
    Email = models.EmailField(max_length=100 , unique=True)
    Password = models.CharField(max_length=50)
    RegDate = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.FullName

class Expense(models.Model):
    UserId = models.ForeignKey(UserDetail,on_delete=models.CASCADE)
    ExpenseItem = models.CharField(max_length=100)
    ExpenseCost = models.IntegerField()
    ExpenseDate = models.DateField(null=True,blank=True)
    NoteDate = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.ExpenseItem} - {self.ExpenseCost}'
