# Generated by Django 5.0.4 on 2024-04-26 00:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('appointments', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='appointment',
            name='room_id',
            field=models.CharField(default='q3wed', max_length=10),
        ),
    ]
