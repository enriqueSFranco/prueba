from django.db import models
from apps.users.models import User

# Create your models here.
class Admin(models.Model):
    id_user = models.OneToOneField(User,on_delete=models.CASCADE,null=False,blank=False)
    t400_id_admin = models.AutoField(primary_key=True)
    t400_name = models.CharField(max_length=60,blank=True,null=True)
    t400_last_names = models.CharField(max_length=70, blank=True,null=True)
    t400_email = models.EmailField(null=False,blank=False,default="")
    t400_admin = models.CharField(max_length=60,blank=True,null=True)
    t400_position = models.CharField(max_length=60,blank=True,null=True,default="No definido")
    class Meta:
        verbose_name = 'Amdmin'
        verbose_name_plural = 'Admins'
        db_table = 't400_administradores'

    def __str__(self) -> str:
        return self.t400_email