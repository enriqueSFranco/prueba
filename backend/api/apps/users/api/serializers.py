from rest_framework import serializers
from apps.users.models import User

# creamos el serializador para el modelo usuario
class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = '__all__'
  # encriptamos el password al momento de que se crea un usuario
  def create(self, validate_data):
    user = User(**validate_data)
    user.set_password(validate_data["password"]) # encriptamos el password
    user.save()
    return user

  # encriptamos el password cuando el usuario quiera actualizar su informacion
  def update(self, instance, validate_data):
    update_user = super().update(instance, validate_data)
    update_user.set_password(validate_data['password'])
    update_user.save()
    return update_user

class UserListSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
  
  def to_representation(self, instance):
    return {
      'id': instance['id'],
      'username': instance['username'],
      'email': instance['email'],
      'password': instance['password'],
      'role': instance['role'],
    }

class CustomUserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ('username', 'email', 'password', 'role')

class UserTokenSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ('id', 'username', 'email', 'name', 'last_name', 'role')
