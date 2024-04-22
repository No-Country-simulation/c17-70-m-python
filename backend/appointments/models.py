import uuid
from datetime import datetime
from datetime import timedelta
from django.db import models
from django.utils import timezone
from accounts.models import Patient, Doctor


def current_time():
    return timezone.now().time().strftime('%H:%M:%S')


class AppointmentManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(work_shift__date__gte=timezone.now().date())


class WorkShift(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    date = models.DateField(default=timezone.now)
    start_time = models.TimeField()
    end_time = models.TimeField()
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE, default=1)

    objects = models.Manager()

    def create_appointments(self):
        """
        Crear citas para el turno de trabajo.

        Este método crea citas para el turno de trabajo según 
        la hora de inicio y finalización del turno.
        Cada cita se crea con una duración de 30 minutos. 
        Las citas se crean para el turno de trabajo.
        e inicialmente no se asignan a ningún paciente.

        Parámetros:
            self (WorkShift): el objeto del turno de trabajo para el que se crean las citas.

        Returns:
            Ninguno

        """
        appointment_duration = timedelta(minutes=30)  # 30 minutes
        start_time = datetime.combine(self.date, self.start_time)
        end_time = datetime.combine(self.date, self.end_time)
        while start_time <= end_time:
            Appointment.objects.create(id=uuid.uuid4(),
                                       work_shift=self, date=self.date, start_time=start_time.time(), patient=None)
            start_time += appointment_duration

        class Meta:
            verbose_name = 'WorkShift'
            verbose_name_plural = 'WorkShifts'


class Appointment(models.Model):
    """
    Modelo de cita.

    Este modelo representa una cita medica. Una cita es un cita medica
    asignada a un paciente. 

    Atributos:
        patient (Patient): el paciente asociado a la cita.
        work_shift (WorkShift): el turno de trabajo asociado a la cita.
        start_time (Time): la hora de inicio de la cita.
        cancelled (bool): indica si la cita fue cancelada por algún motivo.

    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    patient = models.OneToOneField(
        Patient, on_delete=models.CASCADE, blank=True, null=True)

    work_shift = models.ForeignKey(
        WorkShift, on_delete=models.CASCADE, related_name='appointments'
    )
    date = models.DateField(default=timezone.now)
    start_time = models.TimeField(default=current_time)
    cancelled = models.BooleanField(default=False)
    objects = AppointmentManager()

    class Meta:
        verbose_name = 'Appointment'
        verbose_name_plural = 'Appointments'
        unique_together = (('work_shift', 'start_time'))
