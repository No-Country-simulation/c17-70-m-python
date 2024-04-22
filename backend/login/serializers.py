from rest_framework import serializers
from accounts.models import CustomUser


class CustomUserSerializer(serializers.ModelSerializer):
    role = serializers.IntegerField(source='groups.first.id', read_only=True)

    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'user_photo',
                  'birthdate', 'country', 'phone_number', 'gender', 'role']
