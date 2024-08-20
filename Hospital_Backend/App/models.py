from django.db import models
from django.contrib.auth.models import AbstractBaseUser,BaseUserManager
from django.db.models.query import QuerySet

# Create your models here.


class UserManager(BaseUserManager):
    def create_user(self,username,email,is_doctor=False,password=None,**extra_fields):
        """
        Creates and saves a User with the given email, username, is_doctor and password.
        """
        if not email:
            raise ValueError('User must have an email Address...!')
        
        user = self.model(
            email = self.normalize_email(email),
            username = username,
            is_doctor = is_doctor
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
        first_name = models.CharField(max_length=50)
        last_name = models.CharField(max_length=50)
        is_doctor = models.BooleanField(default=False)
        is_admin = models.BooleanField(default=False)
        is_active = models.BooleanField(default=True)

        objects = UserManager()

        USERNAME_FIELD = 'email'
        REQUIRED_FIELDS = ['username']

        def has_perm(self,perm,obj=None):
             return self.is_admin
        
        def has_module_perms(self,app_label):
             return True
        
        def is_staff(self):
             return self.is_admin
        
class Doctor(models.Model):
     user = models.OneToOneField(User,on_delete=models.CASCADE) 
     hospital= models.CharField(max_length=255,null=True,blank=True)
     department = models.CharField(max_length=255,null=True,blank=True)
     is_verified = models.BooleanField(default=False)

        


    
