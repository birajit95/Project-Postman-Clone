from django.shortcuts import render
from django.http import HttpResponse

def PostmanView(request):
    return render(request, 'index.html')
