import { CircularProgress, Divider } from '@mui/material'
import { FormEvent } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useDataUser } from '../Service/global/user'
import { Button } from '../components/Button'
import { FrameCredential } from '../components/Frame/FrameCredential'
import { InputText } from '../components/InputText'
import { routes } from '../routes'

function ModalLoading() {
  return (
    <div className='w-screen min-h-screen absolute flex justify-center items-center'>
      <div className='bg-black opacity-30 w-full h-full absolute'></div>
      <div className='relative'>
        <CircularProgress color='success' />
      </div>
    </div>
  )
}

export function Login() {
  const {
    fetchUser,
    isLogin,
    isLoading,
    isLoadingFalse,
    isLoadingTrue,
    logout
  } = useDataUser()
  const navigate = useNavigate()
  const { state } = useLocation()

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const email = data.get('email')?.toString() || ''
    const password = data.get('password')?.toString() || ''
    try {
      isLoadingTrue()
      await fetchUser({
        userName: email,
        password
      })
      isLoadingFalse()
      navigate(state?.location?.pathname ?? '/')
    } catch (error) {
      console.log('Ocurrio un error ', error)
      console.error('Error al iniciar sesión:', error)
    } finally {
      isLoadingFalse()
    }
  }
  return (
    <div className='lg:flex lg:flex-col lg:justify-center lg:items-center'>
      {isLoading && <ModalLoading />}
      {isLogin && <Navigate to={routes.home} replace={true} />}
      <FrameCredential title='Medicall'>
        <div className='flex flex-col gap-y-4'>
          <div className='w-full flex items-center justify-center text-xl font-bold mb-8'>
            <h2>Inicia sesión</h2>
          </div>
          <form
            action=''
            className='flex flex-col gap-4'
            onSubmit={handleLogin}
          >
            <div className='flex flex-col gap-y-4'>
              <InputText
                name='email'
                className='w-full'
                placeholder='Correo electrónico'
              />
              <InputText
                type='password'
                name='password'
                className='w-full'
                placeholder='Contraseña'
              />
            </div>
            <div className='flex justify-end text-primary-700'>
              Olvidaste tu contraseña?
            </div>
            <div className='flex  gap-4'>
              <Button type='submit' className='w-full' typeVariant='primary'>
                Iniciar sesión
              </Button>
              <Button
                onClick={logout}
                type='submit'
                className='w-full'
                typeVariant='primary'
              >
                logout
              </Button>
            </div>
          </form>
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
