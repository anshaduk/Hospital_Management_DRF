from models import Doctor,User
from django.dispatch import receiver
from django.db.models.signals import post_save
from django.conf import settings
from threading import Thread
from django.core.mail import EmailMessage

def send_email(subject, message, sender, recipient_list):
    email = EmailMessage(subject, message, sender, recipient_list)
    email.send()

def send_notification(sender,instance,created,**kwargs):
    if created:
        doctor = instance
        subject = f'New doctor Added'
        message  =f'A new Doctor is added...please verify.\n Username:{doctor.doctor.username}'
        admins = User.objects.filter(is_admin=True)

        for admin in admins:
            email_thread = Thread(
                target=send_email, args=(subject, message, settings.EMAIL_HOST_USER, [admin.email])
            )
            email_thread.start()