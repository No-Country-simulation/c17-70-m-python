import { format } from '@formkit/tempo'
import { Box, Modal } from '@mui/material'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { CheckCircle } from '../Icons/CheckCircle'
import { LeftArrow } from '../Icons/LeftArrow'
import {
  getDoctorSpecialties,
  getSpecialties,
  postAppointment
} from '../Service/getAppointment'
import { dataUser } from '../Service/global/user'
import { Button } from '../components/Button'
import { ComboBox } from '../components/ComboBox/ComboBox'
import { DrawerRight } from '../components/ComboBox/Drawer'
import { routes } from '../routes'
import { PropsDoctor } from '../type'
import { convertirFormatoHora } from '../utils/date'

interface PropsDoctors {
  doctor: PropsDoctor
  setShowCompleted: (isSelected: boolean) => void
}
function DoctorSelect({ doctor, setShowCompleted }: PropsDoctors) {
  const date = new Date(doctor.date)
  const formatDate = format(date, 'long')
  return (
    <div className='bg-neutral-50 rounded-xl shadow-md p-2 flex gap-2'>
      <div className='w-[89px] rounded-md overflow-hidden h-[89px]'>
        <img
          className='w-[89px] h-[89px] object-cover object-top'
          src={doctor.doctor.user_photo}
          alt={`imagen del doctor/a ${doctor.doctor.first_name}`}
        />
      </div>
      <div className='w-full'>
        <div>
          <h2 className='text-secondary-500 font-bold'>
            {convertirFormatoHora(doctor.start_time)} a{' '}
            {convertirFormatoHora(doctor.end_time)} hs
          </h2>
          <span className='text-secondary-500 text-sm'>{formatDate}</span>
        </div>
        <div className='w-full flex justify-between'>
          <div className='flex flex-col'>
            <span className='text-xs'>{`${
              doctor.doctor.gender === 'Femenino' ? 'Dra' : 'Dr'
            } ${doctor.doctor.first_name} ${doctor.doctor.last_name}`}</span>
            <span className='text-xs'>{doctor.doctor.specialty}</span>
          </div>
          <BasicModal
            id={doctor.id}
            setShowCompleted={setShowCompleted}
            date={formatDate}
            hour={`${convertirFormatoHora(
              doctor.start_time
            )} a ${convertirFormatoHora(doctor.end_time)} hs`}
            doctor={`${doctor.doctor.gender === 'Femenino' ? 'Dra' : 'Dr'} ${
              doctor.doctor.first_name
            } ${doctor.doctor.last_name}`}
            speciality={doctor.doctor.specialty}
          />
        </div>
      </div>
    </div>
  )
}

interface Specialty {
  value: string
}

interface PropModal {
  date: string
  hour: string
  doctor: string
  speciality: string
  id: number
  setShowCompleted: (isSelected: boolean) => void
}
function BasicModal({
  date,
  hour,
  doctor,
  speciality,
  id,
  setShowCompleted
}: PropModal) {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 294,
    height: 407,
    bgcolor: 'white',
    borderRadius: '19px',
    p: 2
  }
  const { access } = dataUser()

  const handleBook = async () => {
    setShowCompleted(true)
    await postAppointment({ access, id })
  }
  return (
    <div>
      <button
        onClick={handleOpen}
        className='bg-primary-500 rounded-full w-8 h-8 text-white'
      >
        +
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <div className='w-full flex flex-col gap-4'>
            <h2 className='w-[213px] font-semibold text-lg self-center text-center'>
              ¿Estás seguro de agendar esta consulta?
            </h2>
            <div className='flex flex-col gap-4'>
              <span>
                <strong>Fecha</strong>: {date}
              </span>
              <span>
                <strong>Hora</strong>: {hour}
              </span>
              <span>
                <strong>Médico/a</strong>: {doctor}
              </span>
              <span>
                <strong>Especialidad</strong>: {speciality}
              </span>
            </div>
            <div className='flex flex-col gap-4 mt-5'>
              <Button onClick={handleBook} typeVariant='primary'>
                Agendar consulta
              </Button>
              <Button onClick={handleClose} typeVariant='secondary'>
                Seguir viendo
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  )
}

function ScheduledTime() {
  return (
    <div className='w-full flex flex-col items-end gap-10'>
      <div className=''>
        <DrawerRight />
      </div>
      <div className='flex flex-col items-center justify-center gap-8'>
        <CheckCircle />

        <h2 className='font-semibold text-xl mx-10 text-center'>
          ¡Tu consulta se ha agendado con éxito!
        </h2>
        <span className='text-sm mx-10 text-center'>
          El día de la consulta ingresa a la agenda de consultas y accede desde
          allí a la videoconsulta.
        </span>

        <div className='flex flex-col gap-4 w-full px-10'>
          <Link to={routes.profileShedule} className='w-full'>
            <Button className='w-full' typeVariant='primary'>
              Ver agenda de consultas
            </Button>
          </Link>
          <Link className='w-full' to={routes.home}>
            <Button className='w-full' typeVariant='secondary'>
              Volver a inicio
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export function Schedule() {
  const [showCompleted, setShowCompleted] = useState(false)
  const { state } = useLocation()
  const [selectedSpecialty, setSelectedSpecialty] = useState(state?.specialty)
  const [doctors, setDoctors] = useState([])
  const [speciality, setSpecialty] = useState<Specialty[]>([])
  const { access } = dataUser()

  useEffect(() => {
    const specialties = async () => {
      const specialties = await getSpecialties({ access })
      setSpecialty(specialties)
    }
    specialties()
  }, [access])

  useEffect(() => {
    const getDoctors = async () => {
      const doctors = await getDoctorSpecialties({
        access,
        specialty: selectedSpecialty
      })
      setDoctors(doctors)
    }
    getDoctors()
  }, [access, selectedSpecialty])

  return (
    <section className='px-4 py-2 max-w-[500px] flex flex-col gap-4'>
      {showCompleted === false ? (
        <div className='flex flex-col gap-4'>
          <div className='flex justify-between items-center'>
            <Link to={routes.home}>
              <LeftArrow />
            </Link>
            <h2 className='text-xl text-primary-500 font-semibold'>
              Programa una consulta
            </h2>
            <DrawerRight />
          </div>
          <div className='flex flex-col'>
            <h3 className='font-semibold'>Selecciona una especialidad</h3>
            <div className='w-full flex flex-col justify-center items-start'>
              {speciality.length !== 0 && (
                <ComboBox
                  handleCountryChange={setSelectedSpecialty}
                  className='w-full'
                  iconShow={false}
                  isCapitalized={true}
                  options={speciality}
                  placeholder={state?.specialty ?? speciality[0].value}
                />
              )}
            </div>
          </div>
          <div className='flex flex-col gap-4'>
            {doctors.length !== 0 &&
              doctors.map((doc, index) => {
                return (
                  <DoctorSelect
                    setShowCompleted={setShowCompleted}
                    key={index}
                    doctor={doc}
                  />
                )
              })}
          </div>
        </div>
      ) : (
        <ScheduledTime />
      )}
    </section>
  )
}
