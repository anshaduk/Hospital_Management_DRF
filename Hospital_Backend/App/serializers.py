from rest_framework import serializers
from . models import User,Doctor
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.exceptions import ValidationError
import re

class UserRegistrationSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type':'password'},required=False, write_only=True)
    doctor_proof = serializers.ImageField(required=False)
    profile_picture = serializers.ImageField(required=False)
    department = serializers.CharField(required=False)
    
    class Meta:
        model = User
        fields = ['username','email','password','password2',
                  'is_doctor','is_admin','profile_picture',
                  'doctor_proof','department','is_active',
                  'allow_admin','first_name','last_name'
                  ] 

    #VALIDATION REGISTRATION FIELDS

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("This username is already taken. Please choose another one.")
        return value

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("This email is already registered. Please use another email.")
        return value

    def validate_password(self, value):
        if len(value) < 8:
            raise serializers.ValidationError("Password must be at least 8 characters long.")
        if not re.search(r'[A-Z]', value):
            raise serializers.ValidationError("Password must contain at least one uppercase letter.")
        if not re.search(r'\d', value):
            raise serializers.ValidationError("Password must contain at least one digit.")
        if not re.search(r'[@$!%*?&#]', value):
            raise serializers.ValidationError("Password must contain at least one special character.")
        return value

    # def validate(self,data):
    #     if User.objects.filter(username=data['username']).exists():
    #         raise serializers.ValidationError({'username':'Duplicate user name,enter another one'})
    #     if User.objects.filter(email=data['email']).exists():
    #         raise serializers.ValidationError({'email':'Email already exists ,enter another one'})
    #     if data['password']!=data['password2']:
    #         raise serializers.ValidationError({'non_field_errors':'Password does not match'})
    #     if len(data['password'])<8:
    #         raise serializers.ValidationError({'password':'Password must be atleast 8 character long'})
    #     if not re.search(r'[A-Z]', data['password']):
    #         raise serializers.ValidationError({'password':'Password must be contain one capital letter'})
    #     if not re.search(r'\d', data['password']):
    #         raise serializers.ValidationError({'password': 'Password must contain  one digit'})
    #     if not re.search(r'[@$!%*?&#]', data['password']):
    #         raise serializers.ValidationError({'password': 'Password must contain  one spcial character'})
    #     return data
    
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def get_token(cls,user):
        token = super().get_token(user)
        token['username'] = user.username
        token['email'] = user.email
        token['is_doctor'] = user.is_doctor
        token['is_admin'] = user.is_admin
        token['is_active'] = user.is_active
        token['allow_admin'] = user.allow_admin
        return token

#! user detail edit and update
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'username', 'email', 'is_doctor','is_admin']

    def update(self, instance, validated_data):
        new_username = validated_data.get('username', instance.username)
        if User.objects.filter(username=new_username).exclude(id=instance.id).exists():
            raise serializers.ValidationError({'username':'username already exists, Please enter another one..'})
        
        new_email = validated_data.get('email', instance.email)
        if User.objects.filter(email=new_email).exclude(id=instance.id).exists():
            raise serializers.ValidationError({'email':'Email already exists,Please enter another one...'})
        
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        
        instance.save()
        return instance

# Doctor get.. edit...
class DoctorGetEditSerializer(serializers.ModelSerializer):
    doctor = UserRegistrationSerializer()
    username = serializers.CharField(source = 'doctor.username')
    email = serializers.CharField(source = 'doctor.email')
    first_name = serializers.CharField(source = 'doctor.first_name')
    last_name = serializers.CharField(source = 'doctor.last_name')
    
    class Meta:
        model = Doctor
        fields = ['id','department','doctor','is_verified', 'profile_picture', 'doctor_proof','username', 'email', 'first_name', 'last_name']
        # read_only_fields = ('user',)
    
    def update(self,instance,validated_data):
        doctor_data = validated_data.pop('doctor', None)
        if doctor_data:
            user_instance = instance.doctor
            new_username = doctor_data.get('username', user_instance.username)
            if User.objects.filter(username=new_username).exclude(id=user_instance.id).exists():
                raise serializers.ValidationError({'username':'username already exists,please choose another one..'})
            
            new_email = doctor_data.get('email',user_instance.email)
            if User.objects.filter(email=new_email).exclude(id=user_instance.id).exists():
                raise serializers.ValidationError({'email':'email already exists,please choose another one..'})
            
            user_instance.username = doctor_data.get('username', user_instance.username)
            user_instance.email = doctor_data.get('email',user_instance.email)
            user_instance.first_name  = doctor_data.get('first_name', user_instance.first_name)
            print(user_instance.last_name,'before update')
            user_instance.last_name = doctor_data.get('last_name', user_instance.last_name)
            print(user_instance.last_name,'after update')

            user_instance.save()
        instance.department = validated_data.get('department', instance.department)
        instance.save()
        return instance    
    
# Admin side Doctor validation
class DoctorSerializer(serializers.ModelSerializer):
    doctor = UserSerializer()
    class Meta:
        model = Doctor
        fields  =['id', 'doctor', 'department', 'is_verified', 'profile_picture', 'doctor_proof']

    def update(self,instance,validated_data):
        instance.is_verified = validated_data.get('is_verified', instance.is_verified)
        instance.save()
        return instance    

