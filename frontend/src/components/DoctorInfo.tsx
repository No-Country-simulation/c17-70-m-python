import { format } from '@formkit/tempo'
import { Link } from 'react-router-dom'
import { PropsDoctor } from '../type'
import { convertirAFechaISO8601, convertirFormatoHora } from '../utils/date'
import { deleteAppointment } from '../Service/getAppointment'
import { dataUser } from '../Service/global/user'
import { Trash } from '../Icons/Trash'
import { useState } from 'react'

interface Props {
  infoDoctor: PropsDoctor
  index?: number
  refresh: (state: boolean) => void
  state: boolean
}

export function DoctorInfo ({ infoDoctor, index, refresh, state }: Props) {
  const [isLoading, setIsLoading] = useState(false)
  const { access } = dataUser()
  const url = `/videocall?roomID=${infoDoctor.room_id}`
  const date = new Date(convertirAFechaISO8601(infoDoctor.date))
  const formatDate = format(date, 'long')
  const handleDelete = async () => {
    setIsLoading(true)
    await deleteAppointment({ access, id: infoDoctor.id })
    refresh(!state)
    setIsLoading(false)
  }
  return (
    <div className={`${isLoading ? 'opacity-10 select-none' : ''} bg-neutral-50 p-2 rounded-2xl shadow-md flex gap-x-4 min-w-[276px]`
    } >
      <div className=' w-[89px] h-[87px] rounded-xl overflow-hidden min-w-[62px]'>
        <img
          className='object-cover object-center w-[89px] h-[87px]'
          src={infoDoctor.doctor.user_photo}
          alt={`Imagen doctor/a ${infoDoctor.doctor.first_name}`}
        />
      </div>
      <div className='flex flex-col gap-1 justify-center'>
        <h2 className=' text-secondary-600 font-bold '>
          {infoDoctor.doctor.specialty}
        </h2>
        <span className='text-sm'>{`${infoDoctor.doctor.gender === 'Femenino' ? 'Dra' : 'Dr'
          } ${infoDoctor.doctor.first_name} ${infoDoctor.doctor.last_name
          }`}</span>
        <div className='flex text-xs gap-1'>
          <span>{formatDate}</span>
          <span>●</span>
          <span>{convertirFormatoHora(infoDoctor.start_time)}</span>
        </div>
        {index === 0 && (
          <Link
            to={url}
            className='bg-secondary-400 w-full text-center text-neutral-50 px-3 rounded-full hover:bg-secondary-500 disabled:bg-secondary-200 disabled:text-secondary-300'
          >
            Ir a llamada
          </Link>
        )}
      </div>
      <div className='ml-auto pr-2 pt-1'>
        <button onClick={handleDelete}>
          <Trash />
        </button>
      </div>
    </div>
  )
}
