from django.db import models

# Create your models here.
class Admin(models.Model):
    t400_id_admin = models.AutoField(primary_key=True)
    t400_name = models.CharField(max_length=60,blank=True,null=True)
    t400_last_names = models.CharField(max_length=70, blank=True,null=True)
    t400_password = models.CharField(max_length=100,blank=False,null=False)
    t400_position = models.CharField(max_length=60,blank=True,null=True)

    class Meta:
        verbose_name = 'Amdmin'
        verbose_name_plural = 'Admins'
        db_table = 't400_administradores'

    def __str__(self) -> str:
        return self.t400_position+' : '+self.t400_name