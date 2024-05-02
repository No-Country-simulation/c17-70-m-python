import { Link } from "react-router-dom"
import { routes } from "../routes"
import { TipLink } from "./TipLink"
import { Meeting } from "../type"
import { useEffect, useState } from "react"
import { getAppointmentDoctor } from "../Service/doctor/getAppointment"
import { dataUser } from "../Service/global/user"
import { PatientInfo } from "./PatientInfo"

interface Props {
  first: string
  prefix: string
}

export function HomeDoctor ({ first, prefix }: Props) {
  const [appointments, setAppointments] = useState<Meeting[]>([])
  const { access } = dataUser()
  useEffect(() => {
    const getAppointments = async () => {
      const appointment = await getAppointmentDoctor({ access })
      setAppointments(appointment)
    }
    getAppointments()
  }, [access])
  return (
    <section className='flex flex-col gap-4 max-w-[360px] overflow-hidden pb-4'>
      <div className='flex flex-col mb-2'>
        <h2 className='text-xl font-bold '>Hola, {prefix}. {first}!</h2>
        <span className='tracking-wide'>Gestiona tus consultas médicas</span>
      </div>

      <div className='flex gap-4'>
        <Link to={routes.schedule} className='max-w-[152px] max-h-[72px]'>
          <TipLink
            classname='text-center max-w-[152px] max-h-[72px]'
            type='primary'
          >
            Historial de pacientes
          </TipLink>
        </Link>
        <Link to={routes.profileShedule} className='max-w-[152px] w-full max-h-[72px]'>
          <TipLink type='secondary' classname='w-full text-center max-w-[152px] max-h-[72px] text-balance'>
            Agenda de consultas médicas
          </TipLink>
        </Link>
      </div>

      <div className='flex flex-col gap-4'>
        <h2 className='text-xl font-semibold'>Tus próximas consultas</h2>
        <div className='flex flex-col gap-4'>
          {appointments.length !== 0 &&
            appointments.map((info, index) => {
              return info.patient !== null && (
                <PatientInfo key={index} meetingInfo={info} />
              )
            })}
        </div>

      </div>
    </section>
  )
}