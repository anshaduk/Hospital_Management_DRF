from django.db import models
from django.contrib.auth.models import AbstractBaseUser,BaseUserManager
from django.db.models.query import QuerySet
from django.utils import timezone
import random
import string


# Create your models here.


class UserManager(BaseUserManager):
    def create_user(self,username,email,password=None,**extra_fields):
        """
        Creates and saves a User with the given email, username, is_doctor and password.
        """
        if not email:
            raise ValueError('User must have an email Address...!')
        
        user = self.model(
            email = self.normalize_email(email),
            username = username,
            **extra_fields
        )
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self,username,email,password=None,is_doctor=False):
        """
        Creates and saves a superuser with the given username, email,  and password.
        """
        user = self.create_user(
            username = username,
            email = email,
            password = password,
        )
        user.is_admin = True
        user.save(using=self._db)
        return user
    
class User(AbstractBaseUser):
        username = models.CharField(max_length=100)
        email = models.EmailField(max_length=255,verbose_name='email address',unique=True)
        password = models.CharField(max_length=255)
        first_name = models.CharField(max_length=50)
        last_name = models.CharField(max_length=50)
        is_doctor = models.BooleanField(default=False)
        is_admin = models.BooleanField(default=False)
        is_staff = models.BooleanField(default=False)
        is_active = models.BooleanField(default=True)
        allow_admin = models.BooleanField(default=False)
        is_verified = models.BooleanField(default=False)
        code_expires_at = models.DateTimeField(blank=True, null=True)
        verification_code = models.CharField(max_length=10,blank=True,null=True)
        
        def __str__(self):
             return self.username
        
        def generate_verification_code(self):
             self.verification_code = ''.join(random.choices(string.digits, k=6))
             self.code_expires_at = timezone.now() + timezone.timedelta(minutes=5)
             self.save()

        objects = UserManager()

        USERNAME_FIELD = 'email'
        REQUIRED_FIELDS = ['username']

        def has_perm(self,perm,obj=None):
             "This method is used to check whether the user has a specific permission"
             return self.is_admin
        
        def has_module_perms(self,app_label):
             "This method checks if the user has permissions for a particular app"
             return True
        
        @property
        def is_staff(self):
             "This property determines if the user is a member of staff and is used to control access to the Django admin site and other admin-specific functionality"
             return self.is_admin
        
class Doctor(models.Model):
     doctor = models.ForeignKey(User,on_delete=models.CASCADE) 
    #  hospital= models.CharField(max_length=255,null=True,blank=True)
     department = models.CharField(max_length=255,null=True,blank=True)
     is_verified = models.BooleanField(default=False)
     profile_picture = models.ImageField(upload_to='media',default='', null=False, blank=True)
     doctor_proof = models.ImageField(upload_to='media',default='', null=False, blank=True)

     def __str__(self):
          return self.doctor.username

        


    
