from django.conf import settings
from django.http import JsonResponse
from rest_framework import status
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView
from .serializers import CustomUserSerializer
from rest_framework_simplejwt.authentication import JWTAuthentication


from rest_framework_simplejwt.views import TokenObtainPairView, TokenError
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import get_user_model
from django.views.decorators.csrf import csrf_exempt

User = get_user_model()


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def create(self, validated_data):
        raise NotImplementedError('create() method not implemented')

    def update(self, instance, validated_data):
        raise NotImplementedError('update() method not implemented')

    def validate(self, attrs):
        data = super().validate(attrs)
        user = self.user
        data['user'] = CustomUserSerializer(user, context=self.context).data
        return data


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
    permission_classes = [AllowAny]

    @csrf_exempt
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise PermissionDenied(str(e)) from e
        return Response(serializer.validated_data, status=status.HTTP_200_OK)


class GoogleLogin(SocialLoginView):
    permission_classes = [AllowAny]
    adapter_class = GoogleOAuth2Adapter
    callback_url = settings.SOCIAL_AUTH_GOOGLE_OAUTH2_REDIRECT_URI
    client_class = OAuth2Client

class HomeView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return JsonResponse({"hello": "hello world"})
