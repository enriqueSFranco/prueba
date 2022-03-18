# Generated by Django 4.0.2 on 2022-03-18 03:56

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('students', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Announcement',
            fields=[
                ('t202_id_announcement', models.AutoField(primary_key=True, serialize=False)),
                ('t202_announcement', models.FileField(upload_to='')),
                ('T202_description', models.TextField()),
                ('t202_publish_date', models.DateField(null=True)),
                ('t202_close_date', models.DateField(null=True)),
            ],
            options={
                'verbose_name': 'Annuncement',
                'verbose_name_plural': 'Annuncements',
                'db_table': 't202_comunicados',
            },
        ),
        migrations.CreateModel(
            name='ApplicationState',
            fields=[
                ('c205_id_application_state', models.AutoField(primary_key=True, serialize=False)),
                ('c205_description', models.CharField(blank=True, max_length=50, null=True)),
            ],
            options={
                'verbose_name': 'ApplicationState',
                'db_table': 'c205_estado_solicitud',
            },
        ),
        migrations.CreateModel(
            name='CandidateProfile',
            fields=[
                ('c206_id_profile', models.AutoField(primary_key=True, serialize=False)),
                ('c206_description', models.TextField(max_length=50)),
            ],
            options={
                'verbose_name': 'CandidateProfile',
                'db_table': 'c206_perfil_candidato',
            },
        ),
        migrations.CreateModel(
            name='Experience',
            fields=[
                ('c207_id_experience', models.AutoField(primary_key=True, serialize=False)),
                ('c207_description', models.TextField(max_length=50)),
            ],
            options={
                'verbose_name': 'Experience',
                'db_table': 'c207_experiencia',
            },
        ),
        migrations.CreateModel(
            name='ReportState',
            fields=[
                ('c220_id_report_state', models.AutoField(primary_key=True, serialize=False)),
                ('c220_description', models.CharField(blank=True, max_length=60, null=True)),
            ],
            options={
                'verbose_name': 'ReporteState',
                'db_table': 'c220_estado_reporte',
            },
        ),
        migrations.CreateModel(
            name='ReportType',
            fields=[
                ('c210_id_report_type', models.AutoField(primary_key=True, serialize=False)),
                ('c210_description', models.CharField(blank=True, max_length=60, null=True)),
            ],
            options={
                'verbose_name': 'ReportType',
                'db_table': 'c210_tipo_reporte',
            },
        ),
        migrations.CreateModel(
            name='Vacant',
            fields=[
                ('t200_id_vacant', models.AutoField(primary_key=True, serialize=False)),
                ('t200_job', models.CharField(max_length=70)),
                ('t200_description', models.TextField()),
                ('t200_check_time', models.DateField()),
                ('t200_closing_hour', models.DateField()),
                ('t200_work_days', models.CharField(max_length=7)),
                ('t200_min_salary', models.IntegerField()),
                ('t200_max_salary', models.IntegerField()),
                ('t200_gross_salary', models.BooleanField()),
                ('t200_home_ofice', models.BooleanField()),
                ('t200_publish_date', models.DateField()),
                ('t200_close_date', models.DateField()),
            ],
            options={
                'verbose_name': 'Vacant',
                'verbose_name_plural': 'Vacants',
                'db_table': 't200_vacant',
            },
        ),
        migrations.CreateModel(
            name='VacantStatus',
            fields=[
                ('c204_id_status', models.AutoField(primary_key=True, serialize=False)),
                ('c204_description', models.TextField(max_length=50)),
            ],
            options={
                'verbose_name': 'Vacant status',
                'db_table': 'c204_estado_vacante',
            },
        ),
        migrations.CreateModel(
            name='Ubication',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('t213_state', models.CharField(default='No definido', max_length=30)),
                ('t213_mucipality', models.CharField(default='No definido', max_length=70)),
                ('t213_locality', models.CharField(default='No definido', max_length=100)),
                ('t213_street', models.CharField(blank=True, max_length=60, null=True)),
                ('t213_cp', models.IntegerField(blank=True, null=True)),
                ('t213_interior_number', models.CharField(blank=True, max_length=20, null=True)),
                ('t213_exterior_number', models.CharField(blank=True, max_length=20, null=True)),
                ('t200_id_vacant', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='ApplicationUbication', to='vacantes.vacant')),
            ],
            options={
                'verbose_name': 'Ubication',
                'db_table': 't213_ubicacion',
            },
        ),
        migrations.CreateModel(
            name='Report',
            fields=[
                ('t203_id_report', models.AutoField(primary_key=True, serialize=False)),
                ('t203_publish_type', models.BooleanField(default=True)),
                ('t203_report_date', models.DateField(null=True)),
                ('t203_atention_date', models.DateField(null=True)),
                ('t203_adittional_comment', models.TextField(blank=True, null=True)),
                ('t100_boleta', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='ReportStudent', to='students.student')),
                ('t200_id_vacant', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='Report', to='vacantes.vacant')),
            ],
            options={
                'verbose_name': 'Report',
                'verbose_name_plural': 'Reports',
                'db_table': 't203_reportes',
            },
        ),
        migrations.CreateModel(
            name='Application',
            fields=[
                ('t201_id_application', models.AutoField(primary_key=True, serialize=False)),
                ('t201_cv', models.FileField(blank=True, null=True, upload_to='')),
                ('t201_date_application', models.DateField()),
                ('t100_boleta', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='AppliedStudent', to='students.student')),
                ('t200_id_vacant', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='StudentApplication', to='vacantes.vacant')),
            ],
            options={
                'verbose_name': 'Application',
                'verbose_name_plural': 'Applications',
                'db_table': 't201_application',
            },
        ),
    ]
