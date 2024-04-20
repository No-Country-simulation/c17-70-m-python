import { format } from '@formkit/tempo'
import { useState } from 'react'
import { LeftArrowChevron } from '../Icons/LeftArrowChevron'
import { RightArrowChevron } from '../Icons/RightArrowChevron'

const l = 'en'
const t = new Date()
interface CalendarProps {
  selectedDates: string[]
}

export function Calendar({ selectedDates }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  console.log(selectedDate)
  const today = format(t, 'DD/MM/YYYY', l)
  const newSelectedDate = [...selectedDates, today]
  // Función para verificar si una fecha está seleccionada
  const isDateSelected = (date: string) => {
    return newSelectedDate.includes(date)
  }

  const handleDayClick = (date: string) => {
    setSelectedDate(date)
  }

  // Función para obtener el primer día de la semana del mes
  const getFirstDayOfWeekOfMonth = (date: Date) => {
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1)
    const dayOfWeek = firstDayOfMonth.getDay() // 0: domingo, 1: lunes, ..., 6: sábado
    return dayOfWeek === 0 ? 6 : dayOfWeek - 1 // Ajuste para que 0 represente lunes, 1 martes, etc.
  }

  // Función para generar los días del mes actual
  const generateCalendarDays = () => {
    // Obtener el primer día de la semana del mes actual
    const firstDayOfWeek = getFirstDayOfWeekOfMonth(currentDate)
    // Obtener el último día del mes actual
    const lastDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    )
    // Array para almacenar los días del mes
    const daysOfMonth: JSX.Element[] = []

    // Agregar días vacíos para completar la primera semana
    for (let i = 0; i < firstDayOfWeek; i++) {
      daysOfMonth.push(<div key={`empty-${i}`} className='p-2'></div>)
    }

    // Iterar sobre todos los días del mes
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      const dateString = `${i.toString().padStart(2, '0')}/${(
        currentDate.getMonth() + 1
      )
        .toString()
        .padStart(2, '0')}/${currentDate.getFullYear()}`
      // Determinar las clases de estilo basadas en si la fecha está seleccionada o no
      const dayClasses = isDateSelected(dateString)
        ? today === dateString
          ? 'ring-1 ring-primary-500 text-black hover:bg-primary-100'
          : 'bg-primary-500 text-neutral-50 hover:bg-primary-600'
        : 'hover:bg-gray-200'

      // Agregar el día al array
      daysOfMonth.push(
        <div
          onClick={() => handleDayClick(dateString)}
          key={dateString}
          className={`p-2 text-center rounded-full cursor-pointer ${dayClasses} ${
            selectedDate === dateString
              ? 'ring-1 ring-secondary-500 hover:bg-secondary-100 text-black'
              : ''
          }`}
        >
          {i}
        </div>
      )
    }

    return daysOfMonth
  }

  // Función para cambiar al mes anterior
  const goToPreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    )
  }

  // Función para cambiar al mes siguiente
  const goToNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    )
  }

  return (
    <div className='bg-white shadow rounded-lg  max-w-[300px]'>
      <div className='p-4 border-b flex justify-between items-center'>
        <button onClick={goToPreviousMonth}>
          <LeftArrowChevron />
        </button>
        <h2 className='text-2xl font-semibold'>
          {currentDate.toLocaleDateString('default', {
            month: 'long',
            year: 'numeric'
          })}
        </h2>
        <button onClick={goToNextMonth} className='text-gray-500'>
          <RightArrowChevron />
        </button>
      </div>
      <div className='grid grid-cols-7 gap-y-2 p-1'>
        <div className='text-center text-gray-500'>Lun</div>
        <div className='text-center text-gray-500'>Mar</div>
        <div className='text-center text-gray-500'>Mie</div>
        <div className='text-center text-gray-500'>Jue</div>
        <div className='text-center text-gray-500'>Vie</div>
        <div className='text-center text-gray-500'>Sab</div>
        <div className='text-center text-gray-500'>Dom</div>
        {generateCalendarDays()}
      </div>
    </div>
  )
}
