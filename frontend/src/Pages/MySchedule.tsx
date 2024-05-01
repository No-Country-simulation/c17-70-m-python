import { format } from '@formkit/tempo'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { LeftArrow } from '../Icons/LeftArrow'
import { getAppointment } from '../Service/getAppointment'
import { dataUser } from '../Service/global/user'
import { Button } from '../components/Button'
import { Calendar } from '../components/Calendar'
import { DrawerRight } from '../components/ComboBox/Drawer'
import { DoctorInfo } from '../components/DoctorInfo'
import { routes } from '../routes'
import { Meeting, PropsDoctor } from '../type'
import { convertirAFechaISO8601 } from '../utils/date'
import { ROLE } from '../constants'
import { getAppointmentDoctor } from '../Service/doctor/getAppointment'
import { PatientInfo } from '../components/PatientInfo'

function formatDate (date: string) {
  const [day, month, year] = date.split("/").map(Number)
  const newDate = new Date(year, month - 1, day)
  const formatDate = format(newDate, 'long')
  return formatDate
}

export function MySchedule () {
  const [appointments, setAppointments] = useState<PropsDoctor[] | Meeting[]>([])
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const { user, access } = dataUser()
  const isPatient = user.role === ROLE.patient
  useEffect(() => {
    const getAppointments = async () => {
      let appointment
      if (isPatient) {
        appointment = await getAppointment({ access }) as PropsDoctor[]
      } else {
        appointment = await getAppointmentDoctor({ access }) as Meeting[]
      }
      setAppointments(appointment)
    }
    getAppointments()
  }, [access, isPatient])

  const dateShortArray = appointments.map(info => {
    const date = new Date(convertirAFechaISO8601(info.date))
    const formatDate = format(date, 'DD/MM/YYYY', 'en')
    return formatDate
  })

  const filteredDates = appointments.filter(filter => {
    const date = new Date(convertirAFechaISO8601(filter.date))
    const formatDate = format(date, 'DD/MM/YYYY', 'en')
    return formatDate === selectedDate
  })

  const isSelected = selectedDate === null
  const conditionDates = isSelected && filteredDates.length === 0
  const newDates = conditionDates ? appointments : filteredDates
  return (
    <section className='px-8 py-9 max-w-[500px] flex flex-col gap-4'>
      <div className='flex justify-between items-center'>
        <Link to={routes.profileHistory}>
          <LeftArrow />
        </Link>
        <h1 className='text-xl text-primary-500 font-semibold'>
          Mi agenda de consultas
        </h1>
        <DrawerRight />
      </div>

      <Calendar onDateChange={setSelectedDate} selectedDates={dateShortArray} />
      <div className='flex flex-col gap-4'>
        <h2 className='font-semibold'>Próximas consultas el</h2>
        <h1 className='font-bold text-2xl text-primary-500'>{selectedDate !== null && formatDate(selectedDate)}</h1>
        {isPatient && appointments.map((info, index) => {
          return <DoctorInfo key={index} infoDoctor={info as PropsDoctor} />
        })}

        {!isPatient && newDates.map((info, index) => {
          return <PatientInfo key={index} meetingInfo={info as Meeting} />
        })}
      </div>

      {
        user.role === ROLE.patient && (
          <Link className='w-full' to={routes.schedule}>
            <Button className='w-full' typeVariant='primary'>
              Agendar nueva consulta
            </Button>
          </Link>
        )}
    </section>
  )
}
