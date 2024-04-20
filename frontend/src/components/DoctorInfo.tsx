import { Dots } from '../Icons/Dots'
import { Props } from '../type'

export function DoctorInfo({ infoDoctor }: Props) {
  return (
    <div className='bg-neutral-50 p-2 rounded-2xl shadow-md flex gap-x-4 min-w-[276px]'>
      <div className=' w-[89px] h-[87px] rounded-xl overflow-hidden min-w-[62px]'>
        <img
          className='object-contain'
          src={infoDoctor.img}
          alt={`Imagen del doctor ${infoDoctor.name}`}
        />
      </div>
      <div className='flex flex-col gap-2 justify-center'>
        <h2 className=' text-secondary-600 font-bold '>
          {infoDoctor.specialty}
        </h2>
        <span className='text-sm'>{infoDoctor.name}</span>
        <div className='flex text-xs gap-1'>
          <span>{infoDoctor.date.full}</span>
          <span>●</span>
          <span>{infoDoctor.date.fromDate}</span>
        </div>
      </div>
      <div className='ml-auto pr-2 pt-1'>
        <Dots />
      </div>
    </div>
  )
}
