import { Box, Modal } from '@mui/material'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle } from '../Icons/CheckCircle'
import { LeftArrow } from '../Icons/LeftArrow'
import { Button } from '../components/Button'
import { ComboBox } from '../components/ComboBox/ComboBox'
import { DrawerRight } from '../components/ComboBox/Drawer'
import { routes } from '../routes'

interface Doctor {
  id: `${string}-${string}-${string}-${string}-${string}`
  nameDoctor: string
  specialty: string
  img: string
}

const specialty = [
  'Medicina General',
  'Cardiología',
  'Pediatría',
  'Ginecología',
  'Otorrinolaringología',
  'Psicología'
]

const jsonDoctors = [
  {
    id: crypto.randomUUID(),
    nameDoctor: 'Dr. Pedro Fernández',
    specialty: 'Otorrinolaringología',
    img: 'https://s3-alpha-sig.figma.com/img/f817/6a72/b73a5ae73a8008dd384ab16c5048d684?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ov9o-iG1mkbbCN86LlzUNLIXEcxQROqOvkHuY~L7JPRkV3Z1ZrwfDPfQTFtpJTN8~djW6U~Il9RjdBSEJpuIL2rgt0GCZhDnUP0wQ-L3I7YSwAR55Odu5Y2JOBSuhjrhidMV6q~PWYaueIJMJQfCg~VflasOlThrl1nwY3fCFYWf~TPs-hV9-NJLu8tTV9ZSR6y8xltsMRwiZ17l1XZHzqP7OQ1PAbfhq5ChTTajC6imoNtOGaMaq7XSs2gwdtTlUAfE1D7nUL239v1qvU2a6h4YZ1Hyoc6kujOcY8rMoE6J~7a4XOEUuqfU-s8EBJrBms9qbiPtFiUETd7bl2Z4yw__'
  },
  {
    id: crypto.randomUUID(),
    nameDoctor: 'Dra. Vilma Hernández',
    specialty: 'Otorrinolaringología',
    img: 'https://s3-alpha-sig.figma.com/img/6a90/c78a/ef91deca2f50730c95ea24ebfdfbf170?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=aa8vPYbO8v-U8b34BIZlTRcPY9QnlXfZ~bYaoeP63AHluPh4z~KBsvc5LMSkwICvWsWqp7~Y3XnAI-ehdttYsBRkwEY6ff4zlbrTynrDWIqXWuibIE7rV4ozZ~d2rFNNe4Ahd2xuUedp~McyW18CxcbnRFjAMBOGX15ej46VHGSEOOT6ER~bU2sX0j3fpGXH9wnzPXlOjggAdaL5F2vUZJ-Xg-sujTYJSPiMhizoGr6GmIMBuHM2~0urox8IfOea9XSI8WbADUtibME2IDD75op1olWw1W0bWFUDOP48VahdwmSMCEoBoeJICfqiyksPI2r~ux0rhQ37jvIdVkggOQ__'
  },
  {
    id: crypto.randomUUID(),
    nameDoctor: 'Dr. Tomás Fernández',
    specialty: 'Otorrinolaringología',
    img: 'https://s3-alpha-sig.figma.com/img/65bd/e20b/101a28a84b641739b4b25664e0ac2274?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ObuX1BTMlcg-xDSPy97M9FpH5oxHz297CvJognvQdc9mR4a10mRC73z4aBBz6cClw1eRK5RXGGclPZoKO-mchRICfr8PD2~E9BVeTlq5VWkAdjp3OvU1~Gg4pvzAfCA3ZntuSVMrL~DVfBG2LIBytc7ye8SAVjDWO1ZobHzkWBnJPpS2iXvIfZ66RJgjeIwiXtdzEAxbaaHYeJHxFMG7ypQPuDop-sO6cHw4Tzh1AFrVX9MirURrKHCXTYuw4bTcN-7euoRbEWwT2GidvIcBpW8JhP2PFuNGXVbQTj9rv-APU4UmnaryPpbalJf0UpUiKwvxrcWnVlSOTBYRwd5TSw__'
  }
]

interface PropsDoctor {
  doctor: Doctor
  toDate: string
  fromDate: string
  date: string
  changeSpecialty?: string
}

function jsonFormatDoctors({
  doctor,
  toDate,
  fromDate,
  date,
  changeSpecialty
}: PropsDoctor) {
  const newDoctor = changeSpecialty
    ? {
        ...doctor,
        specialty: changeSpecialty
      }
    : doctor

  return {
    doctor: { ...newDoctor },
    toDate,
    fromDate,
    date
  }
}

function genateArrayDoctorType(id: number) {
  const arrayDoctor: PropsDoctor[] = []
  const randomFromDate = ['12:00', '13:00', '14:00', '15:00']
  const randomToDate = ['12:30', '13:30', '14:30', '15:30']

  const randomDateString = [
    'Viernes 12 de abril 2024',
    'Lunes 15 de abril 2024',
    'Martes 16 de abril 2024',
    'Miercoles 17 de abril 2024'
  ]

  // Medicina General
  for (let i = 0; i < 3; i++) {
    const randomNumer = Math.random() * jsonDoctors.length
    const randomNumerDate = Math.floor(Math.random() * (jsonDoctors.length + 1))
    const randomIndex = Math.floor(randomNumer)
    const fromDate = randomFromDate[randomNumerDate]
    const toDate = randomToDate[randomNumerDate]
    const date = randomDateString[randomNumerDate]
    const doctor: PropsDoctor = {
      doctor: jsonDoctors[randomIndex],
      toDate,
      fromDate,
      date,
      changeSpecialty: specialty[id]
    }
    const newDoctor = jsonFormatDoctors(doctor)
    arrayDoctor.push(newDoctor)
  }
  return arrayDoctor
}

function createArrayDoctor() {
  const newArrayDoctors = []

  newArrayDoctors[0] = genateArrayDoctorType(0)
  newArrayDoctors[1] = genateArrayDoctorType(1)
  newArrayDoctors[2] = genateArrayDoctorType(2)
  newArrayDoctors[3] = genateArrayDoctorType(3)
  newArrayDoctors[4] = genateArrayDoctorType(4)
  newArrayDoctors[5] = genateArrayDoctorType(5)

  return newArrayDoctors
}

function arrayToComboBoxFormat(array: string[]) {
  return array.map(element => ({ value: element }))
}

interface PropsDoctors {
  doctor: PropsDoctor
  setShowCompleted: (isSelected: boolean) => void
}
function DoctorSelect({ doctor, setShowCompleted }: PropsDoctors) {
  return (
    <div className='bg-neutral-50 rounded-xl shadow-md p-2 flex gap-2'>
      <div className='w-[89px] rounded-md overflow-hidden h-[89px]'>
        <img
          className='w-[89px] h-[89px] object-cover object-top'
          src={doctor.doctor.img}
          alt={`imagen del doctor/a ${doctor.doctor.nameDoctor}`}
        />
      </div>
      <div className='w-full'>
        <div>
          <h2 className='text-secondary-500 font-bold'>
            {doctor.fromDate} a {doctor.toDate} hs
          </h2>
          <span className='text-secondary-500 text-sm'>{doctor.date}</span>
        </div>
        <div className='w-full flex justify-between'>
          <div className='flex flex-col'>
            <span className='text-xs'>{doctor.doctor.nameDoctor}</span>
            <span className='text-xs'>{doctor.doctor.specialty}</span>
          </div>
          <BasicModal
            setShowCompleted={setShowCompleted}
            date={doctor.date}
            hour={`${doctor.fromDate} a ${doctor.toDate}`}
            doctor={doctor.doctor.nameDoctor}
            speciality={doctor.doctor.specialty}
          />
        </div>
      </div>
    </div>
  )
}

interface PropModal {
  date: string
  hour: string
  doctor: string
  speciality: string
  setShowCompleted: (isSelected: boolean) => void
}
function BasicModal({
  date,
  hour,
  doctor,
  speciality,
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
              <Button
                onClick={() => setShowCompleted(true)}
                typeVariant='primary'
              >
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
          <Button className='w-full' typeVariant='primary'>
            Ver agenda de consultas
          </Button>
          <Button className='w-full' typeVariant='secondary'>
            <Link to={routes.home}>Volver a inicio</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export function Schedule() {
  const [showCompleted, setShowCompleted] = useState(false)
  const [selectedSpecialty, setSelectedSpecialty] = useState('')

  const doctors = createArrayDoctor()
  const index = specialty.indexOf(selectedSpecialty)
  const selectedArrayDoctors = doctors[index]
  const specialtyFormat = arrayToComboBoxFormat(specialty)

  return (
    <section className='px-4 py-2 max-w-[500px] flex flex-col gap-4'>
      {showCompleted === false ? (
        <div className='flex flex-col gap-4'>
          <div className='flex justify-between items-center'>
            <Link to={routes.home}>
              <LeftArrow />
            </Link>
            <h2 className='text-xl text-primary-500 font-semibold'>
              Programá una consulta
            </h2>
            <DrawerRight />
          </div>
          <div className='flex flex-col'>
            <h3 className='font-semibold'>Selecciona una especialidad</h3>
            <div className='w-full flex flex-col justify-center items-start'>
              <ComboBox
                handleCountryChange={setSelectedSpecialty}
                className='w-full'
                iconShow={false}
                isCapitalized={true}
                options={specialtyFormat}
                placeholder={specialtyFormat[0].value}
              />
            </div>
          </div>
          <div className='flex flex-col gap-4'>
            {selectedSpecialty &&
              specialty.includes(selectedSpecialty) &&
              selectedArrayDoctors.map((doc, index) => {
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
