# from datetime import datetime
# from django.contrib.sessions.models import Session
# from rest_framework.views import APIView
# from rest_framework.authtoken.views import ObtainAuthToken
# from rest_framework.authtoken.models import Token
# from rest_framework.response import Response
# from rest_framework.permissions import AllowAny
# from rest_framework import status

# from apps.students.api.serializer.student_serializer import StudentTokenSerializer
# class UserToken(APIView):
#   def get(self, request, *args, **kwargs):
#     t100_boleta = request.GET.get('t100_boleta')
#     print(t100_boleta)
#     try:
#       user_token = Token.objects.get(student=StudentTokenSerializer().Meta.model.objects.filter(t100_boleta=t100_boleta).first())
#       return Response({'token': user_token.key})
#     except:
#       return Response({'error': 'Credenciales incorrectas'}, status=status.HTTP_200_OK)

# # 28
# class Login(ObtainAuthToken):
#   permission_classes = [AllowAny]
#   def post(self, request, *args, **kwargs):
#     login_serializer = self.serializer_class(data=request.data, context={'request':request})
#     print(login_serializer)
#     if login_serializer.is_valid():
#       print(login_serializer.validated_data['t100_name'])
#       user = login_serializer.validated_data['t100_name']
#       if user.is_active:
#         token, created = Token.objects.get_or_create(user=user)
#         user_serializer = StudentTokenSerializer(user)
#         if created:
#           return Response({
#             'token': token.key,
#             # 'user': user_serializer.data,
#             'message': 'Inicio de sesion correcto',
#             'authenticatedUser': {
#               'email': user_serializer.data['t100_email'],
#             }
#           }, status=status.HTTP_201_CREATED)
#         else: # si inicia sesion en otro navegador le borramos el token actual y le creamos uno nuevo
#           token.delete()
#           token = Token.objects.create(t100_name=user)
#           return Response({
#             'token': token.key,
#             'user': user_serializer.data,
#             'message': 'Inicio de sesion correcto'
#           }, status=status.HTTP_201_CREATED)
#       else:
#         return Response({'error': 'Este usuario no puede inicar sesion'}, status=status.HTTP_401_UNAUTHORIZED)
#     else:
#       Response({'error': 'Nombre de usuario o password incorrectos'}, status=status.HTTP_200_OK)
#     return Response({'error': 'Contraseña o nombre de usuario incorrectos', 'status':status.HTTP_200_OK})

# class Logout(APIView):
#   def get(self, request, *args, **kwargs):
#     try:
#       token = request.GET.get('token')
#       token = Token.objects.filter(key=token).first()
#       if token:
#         user = token.user
        
#         all_sessions = Session.objects.filter(expire_date__gte=datetime.now())
#         if all_sessions.exists():
#           for session in all_sessions:
#             session_data = session.get_decoded()
#             if user.id == int(session_data.get('_auth_user_id')):
#               session.delete()
        
#         token.delete()
#         session_message = 'sesiones de usuario eliminadas'
#         token_messsage = 'token eliminado'

#         return Response({'token_message': token_messsage, 'session_message': session_message}, status=status.HTTP_200_OK)
#       return Response({'error': 'No se encontro un usuario con estas credenciales'}, status=status.HTTP_200_OK)
#     except:
#       return Response({'error': 'No se ha encontrado token en la peticion'}, status=status.HTTP_409_CONFLICT)
