from django.conf import settings
from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView
from .serializers import CustomUserSerializer


class LoginView(APIView):
    """
    Vista API para autenticación de usuarios.
    Esta clase proporciona un método POST para autenticar a un usuario según
    nombre de usuario y contraseña proporcionados.
    """
    permission_classes = [AllowAny]

    def post(self, request):
        """
        Autenticar al usuario con el nombre de usuario y contraseña proporcionados.

        Parámetros:
            - Solicitud: el objeto de solicitud HTTP que contiene datos del usuario.

        Devoluciones:
            - Una respuesta JSON que indica el éxito o el fracaso del intento de inicio de sesión.
        """
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)
        try:
            if user is not None:
                login(request, user)
                user_data = CustomUserSerializer(user).data
                sessionid = request.session.session_key
                return Response({'message': 'Login Exitoso',
                                 'user_data': user_data, 'sessionid': sessionid},
                                status=status.HTTP_200_OK)
            return Response({'message': 'Usuario o constraseña invalido'},
                            status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'message': str(e)},
                            status=status.HTTP_400_BAD_REQUEST)


class GoogleLogin(SocialLoginView):
    permission_classes = [AllowAny]
    adapter_class = GoogleOAuth2Adapter
    callback_url = settings.SOCIAL_AUTH_GOOGLE_OAUTH2_REDIRECT_URI
    client_class = OAuth2Client


class LogoutView(APIView):
    """Maneja la funcionalidad de cierre de sesión del usuario.
    Atributos:
        - Permiso_clases (lista): lista de clases de permisos requeridas para esta vista..
    """

    def post(self, request):
        """
        Cerrar la sesión del usuario del sistema
        Parámetros:
            Solicitud: el objeto de la solicitud
        Devoluciones:
            JsonResponse: un mensaje de éxito
        """
        logout(request)
        return JsonResponse({'message': 'Logout exitoso'})


class HomeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return JsonResponse({"hello": "hello world"})
