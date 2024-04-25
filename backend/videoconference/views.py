from django.shortcuts import render, redirect
from login import views

# Create your views here.

def dashboard(request):
    return render(request, 'dashboard.html')


def videocall(request):
    return render(request, 'videocall.html', {'name': request.user.name})


def joinroom(request):
    if request.method =='POST':
        roomID = request.POST['roomID']
        return redirect('/meeting?roomID=' +roomID)
    return render(request, 'joinroom.html', {'name': request.user.name})