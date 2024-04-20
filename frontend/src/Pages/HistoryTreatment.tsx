import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import { Link } from 'react-router-dom'
import { LeftArrow } from '../Icons/LeftArrow'
import { DrawerRight } from '../components/ComboBox/Drawer'
import { routes } from '../routes'
function Diagnostic() {
  return (
    <div className='w-full bg-neutral-50 rounded-2xl shadow-md'>
      <div className=' px-4 py-2'>
        <h2 className='font-bold text-secondary-600'>Diagnóstico: farigitis</h2>
        <div className='flex text-xs gap-1'>
          <span>14 de marzo 2024</span>
          <span>●</span>
          <span>12:00</span>
        </div>
      </div>
      <Accordion
        sx={{
          bgcolor: '#EDF0F0'
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: '#1CA9A0' }} />}
        >
          <h3 className='font-bold'>Paracetamol</h3>
        </AccordionSummary>
        <AccordionDetails>
          <ul className='flex flex-col gap-3'>
            <li className='flex gap-2'>
              <span className='text-sm text-secondary-500'>Dosis:</span>
              <span className='text-sm'>500 mg</span>
            </li>
            <li className='flex gap-2'>
              <span className='text-sm text-secondary-500'>
                Frecuencia de uso:
              </span>
              <span className='text-sm'>cada 8 horas</span>
            </li>
            <li className='flex gap-2'>
              <span className='text-sm text-secondary-500'>Fecha inicio:</span>
              <span className='text-sm'>12/12/2023</span>
            </li>
            <li className='flex gap-2'>
              <span className='text-sm text-secondary-500'>Fecha fin:</span>
              <span className='text-sm'>18/12/2023</span>
            </li>
          </ul>
        </AccordionDetails>
      </Accordion>
      <Accordion
        sx={{
          bgcolor: '#EDF0F0'
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: '#1CA9A0' }} />}
        >
          <h3 className='font-bold'>Oximetazolina</h3>
        </AccordionSummary>
        <AccordionDetails>
          <ul className='flex flex-col gap-3'>
            <li className='flex gap-2'>
              <span className='text-sm text-secondary-500'>Dosis:</span>
              <span className='text-sm'>500 mg</span>
            </li>
            <li className='flex gap-2'>
              <span className='text-sm text-secondary-500'>
                Frecuencia de uso:
              </span>
              <span className='text-sm'>cada 8 horas</span>
            </li>
            <li className='flex gap-2'>
              <span className='text-sm text-secondary-500'>Fecha inicio:</span>
              <span className='text-sm'>12/12/2023</span>
            </li>
            <li className='flex gap-2'>
              <span className='text-sm text-secondary-500'>Fecha fin:</span>
              <span className='text-sm'>18/12/2023</span>
            </li>
          </ul>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}

export function HistoryTreatment() {
  return (
    <section className='px-8 py-9 max-w-[500px]'>
      <div className='flex justify-between items-center'>
        <Link to={routes.profileHistory}>
          <LeftArrow />
        </Link>
        <h1 className='text-xl text-primary-500 font-semibold'>Tratamientos</h1>
        <DrawerRight />
      </div>
      <div className='flex flex-col gap-4 mt-6'>
        <Diagnostic />
        <Diagnostic />
      </div>
    </section>
  )
}
