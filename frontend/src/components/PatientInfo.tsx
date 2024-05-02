import { format } from '@formkit/tempo'
import { dataUser } from '../Service/global/user'
import { type Meeting } from '../type'
import { convertirAFechaISO8601, convertirFormatoHora } from '../utils/date'
import { deleteAppointmentDoctor } from '../Service/getAppointment'
import { Trash } from '../Icons/Trash'
import { Link } from 'react-router-dom'

interface Props {
  meetingInfo: Meeting
}
export function PatientInfo ({ meetingInfo }: Props) {
  const { patient } = meetingInfo
  const date = new Date(convertirAFechaISO8601(meetingInfo.date))
  const url = `/videocall?roomID=${meetingInfo.room_id}`
  const formatDate = format(date, 'long')
  const { user, access } = dataUser()
  return (
    <div className='bg-neutral-50 p-2 rounded-2xl shadow-md flex gap-x-4 min-w-[276px]'>
      <div className='rounded-xl overflow-hidden min-w-[62px]'>
        <img
          className='w-[89px] aspect-square object-cover object-center'
          src={patient.user_photo}
          alt={`patient ${patient.first_name}`}
        />
      </div>
      <div className='flex flex-col '>
        <h2 className=' text-secondary-600 font-bold '>
          {patient.first_name} {patient.last_name}
        </h2>
        <span className=' text-sm'>{user.specialty}</span>
        <div className='flex text-xs gap-1'>
          <span>{formatDate}</span>
          <span>●</span>
          <span>{convertirFormatoHora(meetingInfo.start_time)}</span>
        </div>
        <Link
          to={url}
          className='bg-secondary-400 w-full text-center text-neutral-50 px-3 rounded-full hover:bg-secondary-500 disabled:bg-secondary-200 disabled:text-secondary-300'
        >
          Ir a llamada
        </Link>
      </div>
      <div className='ml-auto pr-2 '>
        <button
          onClick={() => deleteAppointmentDoctor({ access, id: meetingInfo.id })}
        >
          <Trash />
        </button>
      </div>
    </div>
  )
}
