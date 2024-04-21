# Generated by Django 5.0.4 on 2024-04-21 16:44

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
            name='WorkShift',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('date', models.DateField(default=django.utils.timezone.now)),
                ('start_time', models.TimeField()),
                ('end_time', models.TimeField()),
                ('doctor', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='accounts.doctor')),
            ],
        ),
        migrations.CreateModel(
            name='Appointment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start_time', models.TimeField(default=appointments.models.current_time)),
                ('cancelled', models.BooleanField(default=False)),
                ('patient', models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='accounts.patient')),
                ('work_shift', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='appointments', to='appointments.workshift')),
            ],
            options={
                'verbose_name': 'Appointment',
                'verbose_name_plural': 'Appointments',
                'unique_together': {('patient', 'work_shift', 'start_time')},
            },
        ),
    ]
