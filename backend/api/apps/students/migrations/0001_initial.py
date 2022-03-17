# Generated by Django 4.0.2 on 2022-03-14 01:12

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Student',
            fields=[
                ('t100_boleta', models.CharField(max_length=12, primary_key=True, serialize=False)),
                ('t100_name', models.CharField(max_length=50)),
                ('t100_last_name', models.CharField(blank=True, max_length=50, null=True)),
                ('t100_username', models.CharField(blank=True, max_length=40, null=True)),
                ('t100_password', models.CharField(max_length=100)),
                ('t100_rfc', models.CharField(blank=True, max_length=12, null=True)),
                ('t100_nss', models.CharField(blank=True, max_length=12, null=True)),
                ('t100_cv', models.FileField(blank=True, null=True, upload_to='')),
                ('t100_email', models.EmailField(max_length=50)),
                ('t100_gender', models.CharField(blank=True, choices=[('F', 'Femenino'), ('M', 'Masculino')], default='F', max_length=1, null=True)),
                ('t100_date_of_birth', models.DateField(blank=True, null=True)),
                ('t100_travel', models.BooleanField(default=False)),
                ('is_active', models.BooleanField(default=True)),
            ],
            options={
                'verbose_name': 'Student',
                'verbose_name_plural': 'Students',
                'db_table': 't100_alumno',
                'unique_together': {('t100_boleta', 't100_email')},
            },
        ),
        migrations.CreateModel(
            name='Skill',
            fields=[
                ('t102_id_skill', models.AutoField(primary_key=True, serialize=False)),
                ('t102_description', models.CharField(max_length=100)),
                ('t100_boleta', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='StudentSkills', to='students.student')),
            ],
            options={
                'verbose_name': 'Skill',
                'verbose_name_plural': 'Skills',
                'db_table': 'Skill',
            },
        ),
        migrations.CreateModel(
            name='residence',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('t101_state', models.CharField(blank=True, choices=[('01', 'AGUASCALIENTES'), ('02', 'BAJA CALIFORNIA'), ('03', 'BAJA CALIFORNIA SUR'), ('04', 'CAMPECHE'), ('05', 'COAHUILA'), ('06', 'COLIMA'), ('07', 'CHIAPAS'), ('08', 'CHIHUAHUA'), ('09', 'CIUDAD DE MEXICO'), ('10', 'DURANGO'), ('11', 'GUANAJUATO'), ('12', 'GUERRERO'), ('13', 'HIDALGO'), ('14', 'JALISCO'), ('15', 'MEXICO'), ('16', 'MICHOACAN'), ('17', 'MORELOS'), ('18', 'NAYARIT'), ('19', 'NUEVO LEON'), ('20', 'OAXACA'), ('21', 'PUEBLA'), ('22', 'QUERETARO DE ARTEAGA'), ('23', 'QUINTANA ROO'), ('24', 'SAN LUIS POTOSI'), ('25', 'SINALOA'), ('26', 'SONORA'), ('27', 'TABASCO'), ('28', 'TAMAULIPAS'), ('29', 'TLAXCALA'), ('30', 'VERACRUZ '), ('31', 'YUCATAN'), ('32', 'ZACATECAS'), ('33', 'NO ESPECIFICADA')], default='33', max_length=50, null=True)),
                ('t101_mucipality', models.CharField(blank=True, max_length=70, null=True)),
                ('t101_locality', models.CharField(blank=True, max_length=100, null=True)),
                ('t100_boleta', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='StudentResidence', to='students.student')),
            ],
            options={
                'verbose_name': 'Residence',
                'db_table': 't101_domicilio',
            },
        ),
        migrations.CreateModel(
            name='Link',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('t113_link', models.CharField(blank=True, max_length=100, null=True)),
                ('t100_boleta', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='StudentLinks', to='students.student')),
            ],
            options={
                'verbose_name': 'Link',
                'verbose_name_plural': 'Links',
                'db_table': 't114_enlaces',
            },
        ),
        migrations.CreateModel(
            name='Lenguage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('t110_written_level', models.PositiveSmallIntegerField(blank=True, null=True)),
                ('t110_reading_level', models.PositiveSmallIntegerField(blank=True, null=True)),
                ('t110_speaking_level', models.PositiveSmallIntegerField(blank=True, null=True)),
                ('t110_comprension_level', models.PositiveSmallIntegerField(blank=True, null=True)),
                ('t110_native', models.BooleanField(default=False)),
                ('t100_boleta', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='StudentLenguages', to='students.student')),
            ],
            options={
                'verbose_name': 'Lenguage',
                'verbose_name_plural': 'Lenguages',
                'db_table': 't110_idiomas',
            },
        ),
        migrations.CreateModel(
            name='InterestArea',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('t100_boleta', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='StudentInterests', to='students.student')),
            ],
            options={
                'verbose_name': 'Areas of interest',
                'db_table': 't113_areas_interes',
            },
        ),
        migrations.CreateModel(
            name='EmploymentHistory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('t103_corporation', models.CharField(blank=True, max_length=80, null=True)),
                ('t103_employment', models.CharField(blank=True, max_length=80, null=True)),
                ('t103_description', models.TextField()),
                ('t103_start_date', models.DateField(null=True)),
                ('t103_end_date', models.DateField(null=True)),
                ('t100_boleta', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='StudentEmployments', to='students.student')),
            ],
            options={
                'verbose_name': 'Employment history',
                'db_table': 't103_historial_laboral',
            },
        ),
        migrations.CreateModel(
            name='AcademicHistory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('t104_academic_unit', models.CharField(blank=True, max_length=100, null=True)),
                ('t104_carreer', models.CharField(blank=True, max_length=100, null=True)),
                ('t104_start_date', models.DateField(blank=True, null=True)),
                ('t104_end_date', models.DateField(blank=True, null=True)),
                ('t100_boleta', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='StudentAcademics', to='students.student')),
            ],
            options={
                'verbose_name': 'Academic history',
                'db_table': 't104_historial_academico',
            },
        ),
    ]
