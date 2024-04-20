import { Link } from 'react-router-dom'
import { LeftArrow } from '../Icons/LeftArrow'
import { DrawerRight } from '../components/ComboBox/Drawer'
import { TipLink } from '../components/TipLink'
import { routes } from '../routes'

export function HistoryMedical() {
  return (
    <section className='max-w-[500px] px-8 py-9'>
      <div className='flex justify-between items-center'>
        <Link to={routes.profile}>
          <LeftArrow />
        </Link>
        <h1 className='text-xl text-primary-500 font-semibold'>
          Datos Personales
        </h1>
        <DrawerRight />
      </div>
      <div className='flex flex-col items-center justify-center gap-4 mt-10'>
        <Link to={routes.profileHistoryOffice} className='w-full'>
          <TipLink classname='w-full' type='primary'>
            <span className='text-center py-5'>Consultas anteriores</span>
          </TipLink>
        </Link>
        <Link to={routes.profileHistoryTreatment} className='w-full'>
          <TipLink type='secondary' classname='w-full'>
            <span className='text-center py-5'>Tratamientos</span>
          </TipLink>
        </Link>
      </div>
    </section>
  )
}
