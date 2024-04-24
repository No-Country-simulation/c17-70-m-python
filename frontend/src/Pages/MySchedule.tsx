import { Link } from 'react-router-dom'
import { LeftArrow } from '../Icons/LeftArrow'
import { Button } from '../components/Button'
//import { Calendar } from '../components/Calendar'
import { DrawerRight } from '../components/ComboBox/Drawer'
import { routes } from '../routes'

export function MySchedule() {
  //const dateShortArray = scheduleDoctor.map(info => info.date.short)

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
      {/*<Calendar selectedDates={dateShortArray} />*/}
      <div className='flex flex-col gap-4'>
        <h2 className='font-semibold'>Próximas consultas</h2>
        {/*{scheduleDoctor.map((info, index) => {
          return <DoctorInfo key={index} infoDoctor={info} />
        })}*/}
      </div>

      <Link className='w-full' to={routes.schedule}>
        <Button className='w-full' typeVariant='primary'>
          Agendar nueva consulta
        </Button>
      </Link>
    </section>
  )
}
