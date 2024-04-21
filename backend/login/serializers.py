from rest_framework import serializers
from accounts.models import CustomUser


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'user_photo',
                  'groups', 'birthdate', 'country', 'phone_number', 'gender', 'user_permissions', 'role']
