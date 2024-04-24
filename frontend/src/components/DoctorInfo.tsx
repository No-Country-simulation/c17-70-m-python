import { format } from '@formkit/tempo'
import { Dots } from '../Icons/Dots'
import { PropsDoctor } from '../type'
import { convertirFormatoHora } from '../utils/date'

interface Props {
  infoDoctor: PropsDoctor
}

export function DoctorInfo({ infoDoctor }: Props) {
  const date = new Date(infoDoctor.date)
  const formatDate = format(date, 'long')
  return (
    <div className='bg-neutral-50 p-2 rounded-2xl shadow-md flex gap-x-4 min-w-[276px]'>
      <div className=' w-[89px] h-[87px] rounded-xl overflow-hidden min-w-[62px]'>
        <img
          className='object-cover object-center w-[89px] h-[87px]'
          src={infoDoctor.doctor.user_photo}
          alt={`Imagen doctor/a ${infoDoctor.doctor.first_name}`}
        />
      </div>
      <div className='flex flex-col gap-2 justify-center'>
        <h2 className=' text-secondary-600 font-bold '>
          {infoDoctor.doctor.specialty}
        </h2>
        <span className='text-sm'>{`${
          infoDoctor.doctor.gender === 'Femenino' ? 'Dra' : 'Dr'
        } ${infoDoctor.doctor.first_name} ${
          infoDoctor.doctor.last_name
        }`}</span>
        <div className='flex text-xs gap-1'>
          <span>{formatDate}</span>
          <span>●</span>
          <span>{convertirFormatoHora(infoDoctor.start_time)}</span>
        </div>
      </div>
      <div className='ml-auto pr-2 pt-1'>
        <Dots />
      </div>
    </div>
  )
}
