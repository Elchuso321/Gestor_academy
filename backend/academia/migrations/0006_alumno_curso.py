# Generated by Django 4.0.8 on 2023-05-09 17:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('academia', '0005_aula_evento_aula_alter_evento_unique_together'),
    ]

    operations = [
        migrations.AddField(
            model_name='alumno',
            name='curso',
            field=models.ManyToManyField(to='academia.evento'),
        ),
    ]
