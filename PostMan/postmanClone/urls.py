from django.urls import path, include
from .views import PostmanView

urlpatterns = [
    path('',PostmanView, name = 'postman')

]
