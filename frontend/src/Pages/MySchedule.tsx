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
import { PropsDoctor } from '../type'
import { convertirAFechaISO8601 } from '../utils/date'

export function MySchedule() {
  const [appointments, setAppointments] = useState<PropsDoctor[]>([])
  const { access } = dataUser()
  useEffect(() => {
    const getAppointments = async () => {
      const appointment = await getAppointment({ access })
      setAppointments(appointment)
    }
    getAppointments()
  }, [access])

  const dateShortArray = appointments.map(info => {
    const date = new Date(convertirAFechaISO8601(info.date))
    const formatDate = format(date, 'DD/MM/YYYY', 'en')
    return formatDate
  })

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
      <Calendar selectedDates={dateShortArray} />
      <div className='flex flex-col gap-4'>
        <h2 className='font-semibold'>Próximas consultas</h2>
        {appointments.map((info, index) => {
          return <DoctorInfo key={index} infoDoctor={info} />
        })}
      </div>

      <Link className='w-full' to={routes.schedule}>
        <Button className='w-full' typeVariant='primary'>
          Agendar nueva consulta
        </Button>
      </Link>
    </section>
  )
}
