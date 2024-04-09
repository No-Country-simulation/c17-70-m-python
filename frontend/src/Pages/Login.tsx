import { Divider } from '@mui/material'
import { Link } from 'react-router-dom'
import { Button } from '../components/Button'
import { FrameCredential } from '../components/Frame/FrameCredential'
import { InputText } from '../components/InputText'
import { routes } from '../routes'

export function Login() {
  return (
    <div className='lg:flex lg:flex-col lg:justify-center lg:items-center'>
      <FrameCredential title='Medicall'>
        <div className='flex flex-col gap-y-4'>
          <div className='w-full flex items-center justify-center text-xl font-bold mb-8'>
            <h2>Inicia sesión</h2>
          </div>
          <div className='flex flex-col gap-y-4'>
            <InputText className='w-full' placeholder='Correo electrónico' />
            <InputText className='w-full' placeholder='Contraseña' />
          </div>
          <div className='flex justify-end text-primary-700'>
            Olvidaste tu contraseña?
          </div>
          <div>
            <Button className='w-full' typeVariant='primary'>
              Iniciar sesión
            </Button>
          </div>
          <Divider>O inicia sesión con</Divider>
          <div className='w-full flex flex-col items-center justify-center'>
            <a href='#'>
              <img src='google.svg' alt='google logo' />
            </a>
            <span>¿No tienes una cuenta?</span>
            <Link className='text-primary-600 font-bold' to={routes.register}>
              Regístrate aquí
            </Link>
          </div>
        </div>
      </FrameCredential>
    </div>
  )
}
