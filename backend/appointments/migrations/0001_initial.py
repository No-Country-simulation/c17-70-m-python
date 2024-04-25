# Generated by Django 5.0.4 on 2024-04-25 17:12

import appointments.models
import django.db.models.deletion
import django.utils.timezone
import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Medication',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('photo_medicament', models.URLField(blank=True, max_length=500, null=True)),
                ('name', models.CharField(max_length=100)),
                ('Frequency', models.CharField(max_length=100)),
                ('quantity', models.CharField(max_length=100)),
                ('description', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Appointment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(default=django.utils.timezone.now)),
                ('start_time', models.TimeField(default=appointments.models.current_time)),
                ('end_time', models.TimeField(default=appointments.models.current_time)),
                ('cancelled', models.BooleanField(default=False)),
                ('patient', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='accounts.patient')),
            ],
            options={
                'verbose_name': 'Appointment',
                'verbose_name_plural': 'Appointments',
            },
        ),
        migrations.CreateModel(
            name='Diagnosis',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('issue', models.TextField(default='')),
                ('date', models.DateField(default=django.utils.timezone.now)),
                ('appointment', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='appointments', to='appointments.appointment')),
                ('medications', models.ManyToManyField(to='appointments.medication')),
            ],
        ),
        migrations.CreateModel(
            name='WorkShift',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('date', models.DateField(default=django.utils.timezone.now)),
                ('start_time', models.TimeField()),
                ('end_time', models.TimeField()),
                ('doctor', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='accounts.doctor')),
            ],
        ),
        migrations.AddField(
            model_name='appointment',
            name='work_shift',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='appointments', to='appointments.workshift'),
        ),
    ]
