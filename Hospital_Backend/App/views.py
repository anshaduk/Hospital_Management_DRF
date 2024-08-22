from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView

from . models import User,Doctor
from . serializers import MyTokenObtainPairSerializer,UserRegistrationSerializer,DoctorSerializer

# Create your views here.

class TokenObtainView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


############# USER REGISTRATION #################
class RegistrationUser(APIView):
    def get(self,request):
        users = User.objects.all()
        serializer = UserRegistrationSerializer(users,many=True)
        return Response(serializer.data)

    def post(self,request):
        data = request.data
        serializer = UserRegistrationSerializer(data=data)
        if serializer.is_valid():
            user = User.objects.create(
                username = serializer.validated_data['username'],
                email = serializer.validated_data['email'],
                is_doctor = serializer.validated_data['is_doctor'],
                is_active = False
            )
            if user.is_doctor:
                doctor = Doctor.objects.create(
                    user = user,
                    doctor_proof = serializer.validated_data['doctor_proof'],
                    department = serializer.validated_data['department'],
                    profile_picture = serializer.validated_data['profile_picture']
                )
                doctor.save()
            user.set_password(serializer.validated_data['password'])
            user.save()
            return Response({'message':'Registration Successful'})
        return Response({'message':serializer.errors},status=status.HTTP_400_BAD_REQUEST)


class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self,request):
        try:
            refresh_token = request.data['refresh_token']
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)

