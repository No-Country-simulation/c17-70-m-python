from rest_framework.permissions import BasePermission
from rest_framework.authentication import SessionAuthentication, BasicAuthentication


class IsPatient(BasePermission):
    def has_permission(self, request, view):
        return request.user.groups.filter(name='Patients').exists()


class IsDoctor(BasePermission):
    def has_permission(self, request, view):
        return request.user.groups.filter(name='Doctors').exists()


class IsDoctorOrPatient(BasePermission):
    def has_permission(self, request, view):
        if request.user.groups.filter(name='Patients').exists():
            return True
        if request.user.groups.filter(name='Doctors').exists():
            return True
        return False


class CsrfExemptSessionAuthentication(SessionAuthentication):

    def enforce_csrf(self, request):
        return
