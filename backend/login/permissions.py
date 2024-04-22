from rest_framework.permissions import BasePermission


class IsPatient(BasePermission):
    def has_permission(self, request, view):
        return request.user.groups.filter(name='Patients').exists()


class IsDoctor(BasePermission):
    def has_permission(self, request, view):
        return request.user.groups.filter(name='Doctors').exists()


class IsDoctorOrPatient(BasePermission):
    def has_permission(self, request, view):
        return request.user and (request.user.is_doctor or request.user.is_patient)
