# Generated by Django 4.2 on 2023-04-17 18:44

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_remove_asignatura_alumnos_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='profesor',
            name='email',
        ),
    ]
