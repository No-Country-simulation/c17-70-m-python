import { ReactNode, useState } from 'react'
import { Link } from 'react-router-dom'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'
import { FreeMode } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { HeartRate } from '../Icons/HearthRate'
import { Medical } from '../Icons/Medical'
import { Pediatrics } from '../Icons/Pediatrics'
import { useDataUser } from '../Service/global/user'
import { Button } from '../components/Button'
import { DrawerRight } from '../components/ComboBox/Drawer'
import { DoctorInfo } from '../components/DoctorInfo'
import { TipLink } from '../components/TipLink'
import { scheduleDoctor } from '../mocks/doctor'
import { routes } from '../routes'

interface PropType {
  children: ReactNode
}
function TypeCategory({ children }: PropType) {
  return (
    <div className='bg-neutral-50 w-[90px] h-[80px] px-5 py-1 flex flex-col items-center justify-center shadow-md rounded-xl'>
      {children}
    </div>
  )
}

const listOfSpecialties = [
  {
    Element: <Medical />,
    description: 'Medicina'
  },
  {
    Element: <HeartRate />,
    description: 'Cardiología'
  },
  {
    Element: <Pediatrics />,
    description: 'Pediatría'
  },
  {
    Element: <Medical />,
    description: 'Medicina'
  }
]

export function Home() {
  const [showAllSpecialties, setShowAllSpecialties] = useState(false)
  const { user } = useDataUser()
  const first = user?.first_name
  const handleShowSpecialties = () => {
    setShowAllSpecialties(prev => !prev)
  }

  return (
    <main className='px-5 py-8 max-w-[500px]'>
      <nav className='flex justify-between mb-7'>
        <img className=' object-contain' src='logo.png' />
        <DrawerRight />
      </nav>
      <section className='flex flex-col gap-4 max-w-[360px] overflow-hidden pb-4'>
        <div className='flex flex-col mb-2'>
          <h2 className='text-xl font-bold '>Hola, {first}!</h2>
          <span className='tracking-wide'>Agenda tu consulta virtual</span>
        </div>
        <div>
          <img
            className='object-contain min-w-[276px]'
            src='anuncio.png'
            alt='anuncio de consulta medica'
          />
        </div>
        <div className='flex gap-4'>
          <Link to={routes.schedule} className='max-w-[152px] max-h-[72px]'>
            <TipLink
              classname='text-center max-w-[152px] max-h-[72px]'
              type='primary'
            >
              Agenda una consulta médica
            </TipLink>
          </Link>
          <TipLink type='secondary' classname='max-w-[152px] max-h-[72px]'>
            <span className='text-center max-w-[152px] max-h-[72px]'>
              Tus próximas consultas
            </span>
          </TipLink>
        </div>
        <div className='flex flex-col gap-4'>
          <div className='flex justify-between items-center'>
            <h2 className='text-xl font-semibold'>Especialidades</h2>
            <span
              onClick={handleShowSpecialties}
              className='cursor-pointer hover:text-secondary-400 text-xs text-secondary-600'
            >
              {!showAllSpecialties ? 'Ver Todos' : 'Contraer'}
            </span>
          </div>

          <div>
            {showAllSpecialties ? (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(90px,1fr))'
                }}
                className='gap-x-2 gap-y-6'
              >
                {listOfSpecialties.map((specialty, index) => {
                  return (
                    <TypeCategory key={index}>
                      {specialty.Element}
                      <span className='text-secondary-500 text-xs'>
                        {specialty.description}
                      </span>
                    </TypeCategory>
                  )
                })}
              </div>
            ) : (
              <Swiper
                slidesPerView={3.3}
                spaceBetween={10}
                freeMode={true}
                modules={[FreeMode]}
              >
                {listOfSpecialties.map((specialty, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <TypeCategory>
                        {specialty.Element}
                        <span className='text-secondary-500 text-xs'>
                          {specialty.description}
                        </span>
                      </TypeCategory>
                    </SwiperSlide>
                  )
                })}
              </Swiper>
            )}
          </div>
        </div>
        <div className='flex flex-col gap-4'>
          <h2 className='text-xl font-semibold'>Tu próxima consulta</h2>
          <div className='flex flex-col gap-4'>
            {scheduleDoctor.map((info, index) => {
              return <DoctorInfo key={index} infoDoctor={info} />
            })}
          </div>
          <div
            className='w-[320px] bg-primary-400 h-[145px] bg-no-repeat rounded-3xl self-center flex flex-col items-center justify-center gap-2'
            style={{
              backgroundPosition: 'center',
              backgroundImage: 'url("fondo.svg")'
            }}
          >
            <span className='font-bold'>Reserva ahora</span>
            <span className='max-w-[178px] text-center text-xs'>
              Elige el día y horario que prefieras para tu consulta médica
            </span>
            <Link to={routes.schedule}>
              <Button typeVariant='primary'>Agendar una consulta</Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
