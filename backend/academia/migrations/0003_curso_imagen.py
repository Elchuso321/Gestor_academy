# Generated by Django 4.0.8 on 2023-05-17 19:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('academia', '0002_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='curso',
            name='imagen',
            field=models.ImageField(blank=True, null=True, upload_to='cursos/'),
        ),
    ]
