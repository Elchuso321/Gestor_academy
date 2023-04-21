# Generated by Django 4.0.8 on 2023-04-20 18:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_alumno_asignatura_evento_profesor_email_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='horario',
            name='asignatura',
        ),
        migrations.RemoveField(
            model_name='horario',
            name='eventos',
        ),
        migrations.RemoveField(
            model_name='matricula',
            name='alumno',
        ),
        migrations.RemoveField(
            model_name='matricula',
            name='asignatura',
        ),
        migrations.RemoveField(
            model_name='profesorasignatura',
            name='asignatura',
        ),
        migrations.RemoveField(
            model_name='profesorasignatura',
            name='profesor',
        ),
        migrations.DeleteModel(
            name='Alumno',
        ),
        migrations.DeleteModel(
            name='Asignatura',
        ),
        migrations.DeleteModel(
            name='Evento',
        ),
        migrations.DeleteModel(
            name='Horario',
        ),
        migrations.DeleteModel(
            name='Matricula',
        ),
        migrations.DeleteModel(
            name='Profesor',
        ),
        migrations.DeleteModel(
            name='ProfesorAsignatura',
        ),
    ]