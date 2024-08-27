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

from drf_spectacular.utils import extend_schema, OpenApiParameter, OpenApiResponse
from drf_spectacular.types import OpenApiTypes





# Create your views here.


class TokenObtainView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


# send email
def send_email(subject, message, sender, recipient_list):
    email = EmailMessage(subject, message, sender, recipient_list)
    email.send()


############# USER REGISTRATION #################
class RegistrationUser(APIView):
    '''
    List all users, or create a new user.
    user may be Patient or Doctor.
    '''
    
    

    @extend_schema(
        operation_id='list_users',
        description="Retrieve a list of all users",
        responses={
            200: UserRegistrationSerializer(many=True)
        }
    )
    def get(self,request):
        users = User.objects.all()
        serializer = UserRegistrationSerializer(users,many=True)
        return Response(serializer.data)

    @extend_schema(
        operation_id='create_user',
        description="Create a new Patient or Doctor.",
        request=UserRegistrationSerializer,
        responses={
            201: OpenApiTypes.OBJECT,
            400: OpenApiTypes.OBJECT
        }
    )
   
    def post(self,request):
        data = request.data
        print(data,'request dataaa')
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
    '''
    Verify email using a verification code.
    '''
    @extend_schema(
        request={
            'application/json': {
                'type': 'object',
                'properties': {
                    'code': {
                        'type': 'string',
                        'description': 'The verification code sent to the user\'s email.'
                    },
                    'email': {
                        'type': 'string',
                        'description': 'The email address of the user who is verifying their email.'
                    }
                },
                'required': ['code', 'email']
            }
        },
        responses={
            200: OpenApiResponse(
                description='Email verification successful.',
                response={
                    'application/json': {
                        'type': 'object',
                        'properties': {
                            'message': {
                                'type': 'string',
                                'example': 'Email verification successful.'
                            }
                        }
                    }
                }
            ),
            400: OpenApiResponse(
                description='Invalid email address or verification code.',
                response={
                    'application/json': {
                        'type': 'object',
                        'properties': {
                            'message': {
                                'type': 'string',
                                'example': 'Invalid email address.'  # This example message can be customized.
                            }
                        }
                    }
                }
            )
        }
    )
    def post(self, request):
        code = request.data.get('code')
        email = request.data.get('email')

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'message': 'Invalid email address.'}, status=status.HTTP_400_BAD_REQUEST)

        if user.verification_code == code and timezone.now() < user.code_expires_at:
            user.is_verified = True
            user.is_active = True
            user.verification_code = None
            user.code_expires_at = None
            user.save()
            return Response({'message': 'Email verification successful.'}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'Invalid or expired verification code.'}, status=status.HTTP_400_BAD_REQUEST)
            

########LOGOUT###########
class LogoutView(APIView):
    '''
    Logout the user account.
    '''
    permission_classes = (IsAuthenticated,)

    @extend_schema(
        request={
            'application/json': {
                'type': 'object',
                'properties': {
                    'refresh_token': {
                        'type': 'string',
                        'description': 'The refresh token to be blacklisted.'
                    }
                },
                'required': ['refresh_token']
            }
        },
        responses={
            205: OpenApiResponse(
                description='Logout successful. Refresh token has been blacklisted.',
                response={
                    'application/json': {
                        'type': 'object',
                        'properties': {
                            'message': {
                                'type': 'string',
                                'example': 'Logout successful.'
                            }
                        }
                    }
                }
            ),
            400: OpenApiResponse(
                description='Bad request. The request is missing the refresh token or has an invalid token.',
                response={
                    'application/json': {
                        'type': 'object',
                        'properties': {
                            'message': {
                                'type': 'string',
                                'example': 'Invalid request or token.'
                            }
                        }
                    }
                }
            )
        }
    )
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
    '''
    Get user details or Edit user details.
    '''
    permission_classes = [IsAuthenticated]

    @extend_schema(
        responses={
            200: OpenApiResponse(
                description='User details retrieved successfully.',
                response=UserSerializer
            ),
            404: OpenApiResponse(
                description='User not found.',
                response={
                    'application/json': {
                        'type': 'object',
                        'properties': {
                            'detail': {
                                'type': 'string',
                                'example': 'Not found user.'
                            }
                        }
                    }
                }
            )
        }
    )
    def get(self,requset):
        user = requset.user
        print(user)
        try:
            user = User.objects.get(username=user)
        except User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @extend_schema(
        request=UserSerializer,
        responses={
            200: OpenApiResponse(
                description='User details updated successfully.',
                response=UserSerializer
            ),
            400: OpenApiResponse(
                description='Invalid request data.',
                response={
                    'application/json': {
                        'type': 'object',
                        'properties': {
                            'detail': {
                                'type': 'string',
                                'example': 'Invalid data.'
                            }
                        }
                    }
                }
            ),
            404: OpenApiResponse(
                description='User not found.',
                response={
                    'application/json': {
                        'type': 'object',
                        'properties': {
                            'detail': {
                                'type': 'string',
                                'example': 'User not found.'
                            }
                        }
                    }
                }
            )
        }
    )
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
    '''
    Get the doctor deatails and edit it in Admin side.
    '''
    permission_classes = [IsAuthenticated]
    
    @extend_schema(
        responses={
            200: OpenApiResponse(
                description='Doctor details retrieved successfully.',
                response=DoctorGetEditSerializer
            ),
            404: OpenApiResponse(
                description='Doctor not found.',
                response={
                    'application/json': {
                        'type': 'object',
                        'properties': {
                            'detail': {
                                'type': 'string',
                                'example': 'Doctor not found.'
                            }
                        }
                    }
                }
            )
        }
    )
    def get(self,requset):
        doctor = requset.user
        try:
            doctors = Doctor.objects.get(doctor__username = doctor)
            serilizer = DoctorGetEditSerializer(doctors)
            return Response(serilizer.data,status=status.HTTP_200_OK)
        except Doctor.DoesNotExist:
            return Response({'detail': 'Doctor not found.'}, status=status.HTTP_404_NOT_FOUND)

    @extend_schema(
        responses={
            200: OpenApiResponse(
                description='Doctor details updated successfully.',
                response=DoctorGetEditSerializer
            ),
            400: OpenApiResponse(
                description='Invalid request data.',
                response={
                    'application/json': {
                        'type': 'object',
                        'properties': {
                            'detail': {
                                'type': 'string',
                                'example': 'Invalid data.'
                            }
                        }
                    }
                }
            ),
            404: OpenApiResponse(
                description='Doctor not found.',
                response={
                    'application/json': {
                        'type': 'object',
                        'properties': {
                            'detail': {
                                'type': 'string',
                                'example': 'Doctor not found.'
                            }
                        }
                    }
                }
            )
        }
    )
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
    '''
    Retrieve list of doctors and partially update the doctor's details.
    '''

    permission_classes = [IsAuthenticated]

    @extend_schema(
        responses={
            200: OpenApiResponse(
                description='List of doctors retrieved successfully.',
                response=DoctorSerializer(many=True)
            ),
            204: OpenApiResponse(
                description='No doctors found.',
                response={
                    'application/json': {
                        'type': 'object',
                        'properties': {
                            'detail': {
                                'type': 'string',
                                'example': 'No content.'
                            }
                        }
                    }
                }
            )
        }
    )
    def get(self,request):
        doctor = Doctor.objects.all()
        if doctor.exists():
            serializer = DoctorSerializer(doctor, many=True)
            return Response({'doctors':serializer.data},status=status.HTTP_200_OK)
        else:
            return Response({'detail': 'No content.'},status=status.HTTP_204_NO_CONTENT) 
    
    @extend_schema(
        request=DoctorSerializer,
        responses={
            200: OpenApiResponse(
                description='Doctor details updated successfully.',
                response=DoctorSerializer
            ),
            400: OpenApiResponse(
                description='Invalid request data.',
                response={
                    'application/json': {
                        'type': 'object',
                        'properties': {
                            'detail': {
                                'type': 'string',
                                'example': 'Invalid data.'
                            }
                        }
                    }
                }
            ),
            404: OpenApiResponse(
                description='Doctor not found.',
                response={
                    'application/json': {
                        'type': 'object',
                        'properties': {
                            'detail': {
                                'type': 'string',
                                'example': 'Doctor not found.'
                            }
                        }
                    }
                }
            )
        },
        parameters=[
            OpenApiParameter(
                name='pk',
                type=int,
                description='Primary key of the doctor',
                required=True,
                location=OpenApiParameter.PATH
            )
        ]
    )
    def patch(self,request,pk):
        try:
            doctor = Doctor.objects.get(pk=pk)
        except Doctor.DoesNotExist:
            return Response({'detail': 'Doctor not found.'},status=status.HTTP_404_NOT_FOUND)
        
        serializer = DoctorSerializer(doctor,data=request.data,partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_200_OK)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


############## ADMIN VIEW ###############  
class AdminView(APIView):
    '''
    Retrieve a list of all users and Partially update a user's status (block/unblock) and admin rights.
    '''
    permission_classes = [IsAdminUser]

    @extend_schema(
        responses={
            200: OpenApiResponse(
                description='List of all users retrieved successfully.',
                response=UserSerializer(many=True)
            ),
            204: OpenApiResponse(
                description='No users found.',
                response={
                    'application/json': {
                        'type': 'object',
                        'properties': {
                            'detail': {
                                'type': 'string',
                                'example': 'No content.'
                            }
                        }
                    }
                }
            )
        }
    )
    def get(self,request):
        users = User.objects.all()
        if users.exists():
            serializers = UserSerializer(users,many=True)
            return Response(serializers.data,status=status.HTTP_200_OK)
        return Response({'detail': 'No content.'},status=status.HTTP_204_NO_CONTENT)
    

    @extend_schema(
        request=UserSerializer,  
        responses={
            200: OpenApiResponse(
                description='User details updated successfully.',
                response=UserSerializer
            ),
            400: OpenApiResponse(
                description='Invalid request data.',
                response={
                    'application/json': {
                        'type': 'object',
                        'properties': {
                            'error': {
                                'type': 'string',
                                'example': 'Invalid data.'
                            }
                        }
                    }
                }
            ),
            404: OpenApiResponse(
                description='User not found.',
                response={
                    'application/json': {
                        'type': 'object',
                        'properties': {
                            'error': {
                                'type': 'string',
                                'example': 'User not found.'
                            }
                        }
                    }
                }
            )
        },
        parameters=[
            OpenApiParameter(
                name='pk',
                description="Primary key of the user",
                required=True,
                type=int,
                location=OpenApiParameter.PATH
            ),
            OpenApiParameter(
                name='action',
                description="Action to perform: 'block' or 'unblock'",
                required=True,
                type=str
            ),
            OpenApiParameter(
                name='is_admin',
                description="Set this user's admin status.",
                required=False,
                type=bool
            )
        ]
    )
    def patch(self,request,pk):
        try:
            user = User.objects.get(pk=pk)
            action = request.data.get('action')
            print(action,'action')
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