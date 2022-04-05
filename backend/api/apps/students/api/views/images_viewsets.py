import imp
from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import viewsets

from apps.students.models import Student
from apps.students.api.serializer.images_serializer import StudentImageSerializer

class StudentImageViewSet(viewsets.GenericViewSet):
	model = Student
	serializer_class = StudentImageSerializer	
	queryset = None

	def get_object(self, pk):
		self.queryset= None
		if self.queryset == None:
			self.queryset = self.model.objects\
				.filter(t100_boleta = pk)\
				.values('t100_boleta','t100_profile_picture')
		return  self.queryset

	def get_queryset(self):
		if self.queryset is None:
			self.queryset = self.model.objects\
				.filter()\
				.values('t100_boleta','t100_profile_picture')
		return self.queryset
  

	def list(self, request):
		print(request.data)
		student_image = self.get_queryset()
		image_serializer = self.serializer_class(student_image, many=True)
		return Response(image_serializer.data, status=status.HTTP_200_OK)
	

	def retrieve(self, request, pk):
		student_image = self.get_object(pk)
		image_serializer = self.serializer_class(student_image,many=True)
		return Response(image_serializer.data)

	def update(self, request, pk):
		print(request.data)
		u_image = self.model.objects.filter(t100_boleta = pk).first()
		image_serializer = self.serializer_class(u_image, data=request.data)
		if image_serializer.is_valid():
			image_serializer.save()
			return Response({
				'message': 'Imagen de perfil actualizada correctamente'
			}, status=status.HTTP_200_OK)
		return Response({
			'message': 'Hay errores en la actualización',
			'errors': image_serializer.errors
		}, status=status.HTTP_400_BAD_REQUEST)
