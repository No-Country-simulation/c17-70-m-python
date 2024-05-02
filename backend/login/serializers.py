from rest_framework import serializers
from accounts.models import CustomUser
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class CustomUserSerializer(serializers.ModelSerializer):
    role = serializers.IntegerField(source='groups.first.id', read_only=True)

    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'user_photo', 'first_name', 'last_name', 'id_number',
                  'birthdate', 'country', 'phone_number', 'gender', 'role']


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def create(self, validated_data):
        raise NotImplementedError('create() method not implemented')

    def update(self, instance, validated_data):
        raise NotImplementedError('update() method not implemented')

    def validate(self, attrs):
        data = super().validate(attrs)
        user = self.user
        user_data = CustomUserSerializer(user, context=self.context).data
        if user.groups.first().name == 'Doctors':
            user_data['specialty'] = user.doctor.specialty
        data['user'] = user_data
        return data
