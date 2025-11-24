from django.urls import path,include
from .views import *

urlpatterns = [
    path('signup/', view=signup,name="signup"),
    path('login/', view=login,name="login"),
    path('add_expense/', view=add_expense,name="add_expense"),
    path('manage_expense/<int:user_id>/', view=manage_expense,name="manage_expense"),
    path('update_expense/<int:expense_id>/', view=update_expense,name="update_expense"),
    path('delete_expense/<int:expense_id>/', view=delete_expense,name="delete_expense"),
    path('search_expense/<int:user_id>/', view=search_expense,name="search_expense"),
    path('change_password/<int:user_id>/', view=change_password,name="change_password"),
]