from agora_token_builder import RtcTokenBuilder
from django.http import JsonResponse
from django.shortcuts import render
import random
import time

# Create your views here.

def getToken(request):
    appId = '881a0dc5643c45d1ad08fb3fea0d9f03'
    appCertificate = 'fdf8a7fb57af4bac869639a5960a01e9'
    channelName = request.GET.get('channel')
    uid = random.randint(1, 230)
    expirationTimeInSeconds = 3600 * 48
    currentTimeStamp = time.time()
    privilegeExpiredTs = currentTimeStamp + expirationTimeInSeconds
    role = 1 #1 = host | 2 = guess
    
    
    token = RtcTokenBuilder.buildTokenWithUid(appId, appCertificate, channelName, uid, role, privilegeExpiredTs)
    return JsonResponse({'token':token, 'uid':uid},safe=False)

def lobby(request):
    return render(request, "videochat/lobby.html")

def room(request):
    return render(request, "videochat/room.html")