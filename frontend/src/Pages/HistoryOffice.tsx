import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Health } from '../Icons/Health'
import { LeftArrow } from '../Icons/LeftArrow'
import { Note } from '../Icons/Note'
import { Recipe } from '../Icons/Recipe'
import { Button } from '../components/Button'
import { DrawerRight } from '../components/ComboBox/Drawer'
import { routes } from '../routes'

interface Doctor {
  name: string
  specialty: string
  img: string
}

interface Date {
  full: string
  fromHour: string
  toHour: string
}

interface Action {
  value: string
  action: () => void
  icon: ReactNode
}
interface Actions {
  diagnostic: Action
  prescription: Action
  note: Action
}

interface OfficeDoctor {
  doctor: Doctor
  date: Date
  actions: Actions
}

const office = [
  {
    date: {
      mounth: 'Marzo',
      year: '2024'
    },
    queries: [
      {
        doctor: {
          name: 'Dr. Pedro Fernández',
          specialty: 'Otorrinolaringología',
          img: 'https://s3-alpha-sig.figma.com/img/f817/6a72/b73a5ae73a8008dd384ab16c5048d684?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ov9o-iG1mkbbCN86LlzUNLIXEcxQROqOvkHuY~L7JPRkV3Z1ZrwfDPfQTFtpJTN8~djW6U~Il9RjdBSEJpuIL2rgt0GCZhDnUP0wQ-L3I7YSwAR55Odu5Y2JOBSuhjrhidMV6q~PWYaueIJMJQfCg~VflasOlThrl1nwY3fCFYWf~TPs-hV9-NJLu8tTV9ZSR6y8xltsMRwiZ17l1XZHzqP7OQ1PAbfhq5ChTTajC6imoNtOGaMaq7XSs2gwdtTlUAfE1D7nUL239v1qvU2a6h4YZ1Hyoc6kujOcY8rMoE6J~7a4XOEUuqfU-s8EBJrBms9qbiPtFiUETd7bl2Z4yw__'
        },
        date: {
          full: '14 de marzo 2024',
          fromHour: '12:00',
          toHour: '12:30'
        },
        actions: {
          diagnostic: {
            icon: <Health height={15} width={15} color='secondary' />,
            value: 'Diagnostico',
            action: () => {
              return 'Diagnostico'
            }
          },
          prescription: {
            icon: <Recipe />,
            value: 'Receta',
            action: () => {
              return 'Receta'
            }
          },
          note: {
            icon: <Note height={14} width={14} color='secondary' />,
            value: 'Nota',
            action: () => {
              return 'Nota'
            }
          }
        }
      }
    ]
  },
  {
    date: {
      mounth: 'Diciembre',
      year: '2024'
    },
    queries: [
      {
        doctor: {
          name: 'Dr. Daniel M',
          specialty: 'Medicina General',
          img: 'https://s3-alpha-sig.figma.com/img/c8ab/3368/4443f77db8b8bbaf4b585c9ffedad91c?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=RemNQ1SJT6~PoKbQyVnFscBv66fC9lTVxcB-HMAQbDNPrjp908RrAh0bHYWcBRxuNhoqYhIE28P5jkshztarFT2IjA5xT72EiTSTZN0WsSPPVpRTofkkdZ75Rh5owy~oMBOBlMSVDIyXNzADQjLcItN29Ub3sg6WVplj8fN4vGaZ9p9pJmLWtGTTJxbaEpiA1-hx1~L32-fXQRW47Izd1o4B-HkUpnhF~LXdnhY6CEcQp8Djz4ZO30epFtW9x1QkjqHBw5jSmFZxQbNKnaXrM5wFtiyAB~-eoOyzhvsB4lOFccUrwlDKzZuOR-z6Es2f1SEbbwmGrz5LGWbZhII0Eg__'
        },
        date: {
          full: '12 de Diciembre 2024',
          fromHour: '15:00',
          toHour: '15:30'
        },
        actions: {
          diagnostic: {
            icon: <Health height={15} width={15} color='secondary' />,
            value: 'Diagnostico',
            action: () => {
              return 'Diagnostico'
            }
          },
          prescription: {
            icon: <Recipe />,
            value: 'Receta',
            action: () => {
              return 'Receta'
            }
          },
          note: {
            icon: <Note height={14} width={14} color='secondary' />,
            value: 'Nota',
            action: () => {
              return 'Nota'
            }
          }
        }
      },
      {
        doctor: {
          name: 'Dr. Daniel M',
          specialty: 'Medicina General',
          img: 'https://s3-alpha-sig.figma.com/img/c8ab/3368/4443f77db8b8bbaf4b585c9ffedad91c?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=RemNQ1SJT6~PoKbQyVnFscBv66fC9lTVxcB-HMAQbDNPrjp908RrAh0bHYWcBRxuNhoqYhIE28P5jkshztarFT2IjA5xT72EiTSTZN0WsSPPVpRTofkkdZ75Rh5owy~oMBOBlMSVDIyXNzADQjLcItN29Ub3sg6WVplj8fN4vGaZ9p9pJmLWtGTTJxbaEpiA1-hx1~L32-fXQRW47Izd1o4B-HkUpnhF~LXdnhY6CEcQp8Djz4ZO30epFtW9x1QkjqHBw5jSmFZxQbNKnaXrM5wFtiyAB~-eoOyzhvsB4lOFccUrwlDKzZuOR-z6Es2f1SEbbwmGrz5LGWbZhII0Eg__'
        },
        date: {
          full: '12 de Diciembre 2024',
          fromHour: '15:00',
          toHour: '15:30'
        },
        actions: {
          diagnostic: {
            icon: <Health height={15} width={15} color='secondary' />,
            value: 'Diagnostico',
            action: () => {
              return 'Diagnostico'
            }
          },
          prescription: {
            icon: <Recipe />,
            value: 'Receta',
            action: () => {
              return 'Receta'
            }
          },
          note: {
            icon: <Note height={14} width={14} color='secondary' />,
            value: 'Nota',
            action: () => {
              return 'Nota'
            }
          }
        }
      }
    ]
  }
]

interface Props {
  officeDoctor: OfficeDoctor
}
function DoctorSelect({ officeDoctor }: Props) {
  return (
    <div className='bg-neutral-50 rounded-xl shadow-md p-2 flex gap-2 flex-col'>
      <div className='flex gap-2 w-full'>
        <div className='w-[89px] h-[84px] rounded-md overflow-hidden'>
          <img
            className='w-[89px] h-[84px] object-cover object-top'
            src={officeDoctor.doctor.img}
            alt={`imagen del doctor/a ${officeDoctor.doctor.name}`}
          />
        </div>
        <div className='w-full'>
          <div>
            <h2 className='text-secondary-500 font-bold'>
              {officeDoctor.doctor.specialty}
            </h2>
            <span className=' text-sm'>{officeDoctor.doctor.name}</span>
          </div>
          <div className='w-full flex justify-between'>
            <div className='flex gap-1 items-center justify-center'>
              <span className='text-xs'>{officeDoctor.date.full}</span>
              <span className='text-xs'>●</span>
              <span className='text-xs'>{officeDoctor.date.fromHour}</span>
            </div>
          </div>
        </div>
      </div>
      <div className='flex w-full gap-2'>
        <Button
          typeVariant='primary'
          className='text-xs flex gap-2  items-center justify-center w-full'
        >
          {officeDoctor.actions.diagnostic.icon}
          {officeDoctor.actions.diagnostic.value}
        </Button>
        <Button
          typeVariant='tertiary'
          className='text-xs flex gap-1 items-center justify-center w-full'
        >
          {officeDoctor.actions.prescription.icon}
          {officeDoctor.actions.prescription.value}
        </Button>
        <Button
          typeVariant='primary'
          className='text-xs w-full flex gap-2 items-center justify-center'
        >
          {officeDoctor.actions.note.icon}
          {officeDoctor.actions.note.value}
        </Button>
      </div>
    </div>
  )
}

export function HistoryOficce() {
  return (
    <section className='px-8 py-9 max-w-[500px]'>
      <div className='flex justify-between items-center'>
        <Link to={routes.profileHistory}>
          <LeftArrow />
        </Link>
        <h1 className='text-xl text-primary-500 font-semibold'>
          Consultas anteriores
        </h1>
        <DrawerRight />
      </div>
      <div>
        <section className='flex flex-col gap-4 mt-6'>
          {office.map((elemento, index) => {
            return (
              <div className='flex flex-col gap-3'>
                <h2 key={index}>
                  {elemento.date.mounth} {elemento.date.year}
                </h2>

                {elemento.queries.map((office, index) => {
                  return <DoctorSelect key={index} officeDoctor={office} />
                })}
              </div>
            )
          })}
        </section>
      </div>
    </section>
  )
}
