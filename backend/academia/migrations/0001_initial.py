# Generated by Django 4.0.8 on 2023-05-08 09:07

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Academia',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Alumno',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
        migrations.CreateModel(
            name='Boletin',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('trimestre', models.CharField(choices=[('1', '1er Trimestre'), ('2', '2er Trimestre'), ('3', '3er Trimestre')], max_length=1)),
                ('skill_writing', models.CharField(max_length=50, verbose_name='Writing* / Escritura*')),
                ('skill_reading', models.CharField(max_length=50, verbose_name='Reading* / Lectura*')),
                ('skill_speaking', models.CharField(max_length=50, verbose_name='Speaking / Expresión oral')),
                ('skill_listening', models.CharField(max_length=50, verbose_name='Listening / Comprensión auditiva')),
                ('actitud_interes', models.CharField(max_length=50, verbose_name='Shows interest / Muestra interés')),
                ('actitud_esfuerzo', models.CharField(max_length=50, verbose_name='Makes an effort / Se esfuerza')),
                ('actitud_participa', models.CharField(max_length=50, verbose_name='Participates / Participa en la clase')),
                ('actitud_comportamiento', models.CharField(max_length=50, verbose_name='Good Behaviour /Buen comportamiento')),
                ('comentario', models.TextField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Curso',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=50)),
                ('descripcion', models.TextField()),
                ('precio', models.DecimalField(decimal_places=2, default=0.0, max_digits=10)),
                ('ingles', models.BooleanField(default=True, help_text='Marcar si la curso no es de apoyo')),
            ],
        ),
        migrations.CreateModel(
            name='Evento',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('dia_semana', models.CharField(choices=[('L', 'Lunes'), ('M', 'Martes'), ('X', 'Miércoles'), ('J', 'Jueves'), ('V', 'Viernes'), ('S', 'Sábado'), ('D', 'Domingo')], max_length=1)),
                ('nombre', models.CharField(max_length=50)),
                ('descripcion', models.TextField()),
                ('hora_inicio', models.TimeField()),
                ('hora_fin', models.TimeField()),
            ],
        ),
        migrations.CreateModel(
            name='Profesor',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
    ]
