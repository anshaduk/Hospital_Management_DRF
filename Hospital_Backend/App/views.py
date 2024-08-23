from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView

from . models import User,Doctor
from . serializers import MyTokenObtainPairSerializer,UserRegistrationSerializer,DoctorGetEditSerializer,UserSerializer,DoctorSerializer

from django.conf import settings
from threading import Thread
from django.core.mail import EmailMessage
from django.utils import timezone

# Create your views here.


class TokenObtainView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


# send email
def send_email(subject, message, sender, recipient_list):
    email = EmailMessage(subject, message, sender, recipient_list)
    email.send()


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
                allow_admin = serializer.validated_data.get('allow_admin',False),
                is_active = False
            )
            if user.is_doctor:
                doctor = Doctor.objects.create(
                    doctor = user,
                    doctor_proof = serializer.validated_data['doctor_proof'],
                    department = serializer.validated_data['department'],
                    profile_picture = serializer.validated_data['profile_picture']
                )
                doctor.save()

            user.set_password(serializer.validated_data['password'])
            user.save()

            #! Email Verification
            user.generate_verification_code()
            subject = 'Email Verification Code'
            message = f'Your Verification Code is {user.verification_code}.This code will expired in 5 minutes'
            email_thread =Thread(
                target=send_email, args=(subject, message, settings.EMAIL_HOST_USER, [user.email])
            )
            email_thread.start()


            return Response({'message':'Registration Successful'})
        return Response({'message':serializer.errors},status=status.HTTP_400_BAD_REQUEST)


########### EMAIL VERIFICATION ##########
class VerifyEmail(APIView):
    def post(self, request):
        code = request.data.get('code')
        email = request.data.get('email')
        # print(code,'code.....')
        # print(email,'email....')

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'message':'invalid email address.'},status=status.HTTP_200_OK)
        if user.verification_code == code and timezone.now() < user.code_expires_at:
            user.is_verified = True
            user.is_active = True
            user.verification_code = None
            user.code_expires_at = None
            user.save()
            return Response({'message' : 'email verification successfully.'},status=status.HTTP_200_OK)
        else:
            return Response({'message' : 'invalid or verification code expired.'},status=status.HTTP_400_BAD_REQUEST)
            

########LOGOUT###########
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
        

##############USER GET AND EDIT##############
class UserView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self,requset):
        user = requset.data
        try:
            user = User.objects.get(username=user)
        except User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def patch(self,request):
        user = request.user
        try:
            user = User.objects.get(username=user)
        except User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = UserSerializer(user,data=request.data,partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)    







##############DOCTOR GET AND EDIT############
class DoctorGetEditView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self,requset):
        doctor = requset.user
        try:
            doctors = Doctor.objects.get(doctor__username = doctor)
            serilizer = DoctorGetEditSerializer(doctors)
            return Response(serilizer.data,status=status.HTTP_200_OK)
        except Doctor.DoesNotExist:
            return Response(serilizer.errors, status=status.HTTP_404_NOT_FOUND)

    def patch(self,request):
        doctor = request.user
        try:
            doctor_instance = Doctor.objects.get(doctor__username=doctor)
        except Doctor.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = DoctorGetEditSerializer(doctor_instance, data = request.data,partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  



##############ADMIN SIDE###############

#############DOCTOR GET AND EDIT##############
class DoctorView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self,request):
        doctor = Doctor.objects.all()
        if doctor.exists():
            serializer = DoctorSerializer(doctor, many=True)
            return Response({'doctors':serializer.data},status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_204_NO_CONTENT) 
    
    def patch(self,request,pk):
        try:
            doctor = Doctor.objects.get(pk=pk)
        except Doctor.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        serializer = DoctorSerializer(doctor,data=request.data,partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_200_OK)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


############## ADMIN VIEW ###############  
class AdminView(APIView):
    permission_classes = [IsAdminUser]

    def get(self,request):
        users = User.objects.all()
        if users.exists():
            serializers = UserSerializer(users,many=True)
            return Response(serializers.data,status=status.HTTP_200_OK)
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    def patch(self,request,pk):
        try:
            user = User.objects.get(pk=pk)
            action = request.data.get('action')
            if action == 'block':
                user.is_active = False
            elif action == 'unblock':
                user.is_active = True
            
            is_admin  = request.data.get('is_admin',user.is_admin)
            user.is_admin = is_admin
            if is_admin:
                user.allow_admin = False
            user.save()
            serializer = UserSerializer(user)
            return Response(serializer.data,status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({"error":"user not found."},status=status.HTTP_404_NOT_FOUND)    