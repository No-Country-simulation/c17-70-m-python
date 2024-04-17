import { ReactNode, useState } from 'react'
import { Link } from 'react-router-dom'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'
import { FreeMode } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Dots } from '../Icons/Dots'
import { HeartRate } from '../Icons/HearthRate'
import { Medical } from '../Icons/Medical'
import { Pediatrics } from '../Icons/Pediatrics'
import { useDataUser } from '../Service/global/user'
import { Button } from '../components/Button'
import { DrawerRight } from '../components/ComboBox/Drawer'
import { routes } from '../routes'
import { TypeButton } from '../type'

interface Props {
  children: ReactNode
  type: TypeButton
  classname?: string
}
function TipLink({ children, type, classname }: Props) {
  const variantButton: Record<TypeButton, string> = {
    primary: 'bg-primary-100',
    secondary: 'bg-secondary-100'
  }

  const selectColor = variantButton[type]

  const className = `${selectColor} ${
    classname != null ? classname : ''
  } rounded-lg text-secondary-700 font-bold text-sm px-6 py-5 shadow-md max-w-[152px] max-h-[72px] flex items-center justify-center`

  return <div className={`${className}`}>{children}</div>
}

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

function DoctorInfo() {
  return (
    <div className='bg-neutral-50 p-2 rounded-2xl shadow-md flex gap-x-4 min-w-[276px]'>
      <div className=' w-[89px] h-[87px] rounded-xl overflow-hidden min-w-[62px]'>
        <img
          className='object-contain'
          src='https://s3-alpha-sig.figma.com/img/f817/6a72/b73a5ae73a8008dd384ab16c5048d684?Expires=1713744000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=mdHPiTAdHkwFUV2SS9PL9wLfRzs23mS9pgCbJ2uvWq1WK0Errrfq4oCQhxqd0kiMnH~J809ORWPKBDgRtWYUp2aFreMR5WwzdMFi05RW-Vn2icW9IJ7rn1bwQyYs4EP71iD2GrP9xbd3Ed46b~xEfLZui5drRZXi-EIHwTBJOvnN8gUKUDYAtc2q3qybPpA2zNtv9pZOy6BaVo1VOIcxxbTm3J5kXoUfEs-S73Iop9Z6pwSgNBk9O~T15J5oam0Q0LWF9YPP42Ka18YF0VdgT5u5-~pkIMbFGJ~kkb6XxfB-Y6H65jBERQGrJm8oGU4-kg1jbd8glzslD3Y5y7sp6w__'
          alt='Imagen del doctor'
        />
      </div>
      <div className='flex flex-col gap-2 justify-center'>
        <h2 className=' text-secondary-600 font-bold '>Otorrinolaringología</h2>
        <span className='text-sm'>Dr. Pedro Fernández</span>
        <div className='flex text-xs gap-1'>
          <span>19 de marzo 2024</span>
          <span>●</span>
          <span>12:00</span>
        </div>
      </div>
      <div className='ml-auto pr-2 pt-1'>
        <Dots />
      </div>
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
  const { first } = user[0].name
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
          <Link to={routes.schedule}>
            <TipLink classname='text-center' type='primary'>
              Agenda una consulta médica
            </TipLink>
          </Link>
          <TipLink type='secondary'>
            <span className='text-center'>Tus próximas consultas</span>
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
          <div>
            <DoctorInfo />
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
