# Generated by Django 4.0.8 on 2023-04-20 18:11

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('api', '0007_remove_horario_asignatura_remove_horario_eventos_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Alumno',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=50)),
                ('apellidos', models.CharField(max_length=50)),
                ('correo_electronico', models.EmailField(max_length=254, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Asignatura',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=50)),
                ('descripcion', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Evento',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('dia', models.CharField(choices=[('L', 'Lunes'), ('M', 'Martes'), ('X', 'Miércoles'), ('J', 'Jueves'), ('V', 'Viernes'), ('S', 'Sábado'), ('D', 'Domingo')], max_length=1)),
                ('nombre', models.CharField(max_length=50)),
                ('descripcion', models.TextField()),
                ('fecha', models.DateField()),
                ('hora_inicio', models.TimeField()),
                ('hora_fin', models.TimeField()),
            ],
        ),
        migrations.CreateModel(
            name='Profesor',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=50)),
                ('apellidos', models.CharField(max_length=50)),
                ('email', models.EmailField(max_length=254, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='ProfesorAsignatura',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('asignatura', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.asignatura')),
                ('profesor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.profesor')),
            ],
        ),
        migrations.CreateModel(
            name='Matricula',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('alumno', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.alumno')),
                ('asignatura', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.asignatura')),
            ],
        ),
        migrations.CreateModel(
            name='Horario',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('asignatura', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.asignatura')),
                ('eventos', models.ManyToManyField(related_name='horarios', to='api.evento')),
            ],
        ),
    ]