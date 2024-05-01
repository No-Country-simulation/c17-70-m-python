import { Checkbox } from '@mui/material'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../components/Button'
import { ComboBox } from '../components/ComboBox/ComboBox'
import { FrameCredential } from '../components/Frame/FrameCredential'
import { InputText } from '../components/InputText'
import { CountryPhone, countryFlags } from '../mocks/constantesCountry'
import { routes } from '../routes'
import BasicDatePicker from '../components/DataPicker'

const gender = [
  {
    value: 'Femenino'
  },
  {
    value: 'Masculino'
  },
  {
    value: 'Otro'
  }
]

export function Register () {
  // TODO-FEATURE: No dejar avanzar si no se han completado los datos
  //               No dejar crear cuenta sin validar datos
  // TODO-FEATURE: Falta agregar presistencia de datos
  //       Regresar y volver borra los datos
  const [selectedCountry, setSelectedCountry] = useState('')
  const [, setSelectedGenre] = useState('')
  const [, setSelectedCheckbox] = useState(false)
  const [dataForm, setDataForm] = useState({
    firstName: '',
    lastName: '',
    dni: '',
    birthday: '',
    contry: '',
    phone: '',
    gnre: ''
  })
  const [step, setStep] = useState(1)
  const handleCountryChange = (countryName: string) => {
    setSelectedCountry(countryName)
  }
  const handleGenreChage = (genre: string) => {
    setSelectedGenre(genre)
  }
  const handleChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.checked
    console.log(value)
    setSelectedCheckbox(value)
  }
  const handleChangeStep =
    (step: number) =>
      (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault()
        setStep(step)
      }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    //const form = event.currentTarget
    //const data = new FormData(form)
  }

  const handleInputChange = (evenet: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evenet.target
    setDataForm((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }
  console.log(dataForm)
  return (
    <form onSubmit={handleSubmit}>
      {step === 1 && (
        <FrameCredential title='Medicall'>
          <div className='flex flex-col items-center justify-center gap-4'>
            <div className='mb-8'>
              <h2 className='text-xl font-bold'>Crea tu cuenta</h2>
            </div>
            <div className='flex gap-x-4'>
              <InputText onChange={handleInputChange} name='firstName' type='text' className='w-full' placeholder='Nombre' />
              <InputText
                onChange={handleInputChange}
                name='lastName'
                type='text'
                className='w-full'
                placeholder='Apellido'
              />
            </div>
            <div className='w-full flex flex-col gap-y-4'>
              <InputText
                onChange={handleInputChange}
                name='dni'
                type='text'
                className='w-full'
                placeholder='Número de documento'
              />

              <BasicDatePicker />
              <ComboBox
                flagShow={true}
                className='w-full'
                isCapitalized={true}
                options={countryFlags}
                placeholder={countryFlags[0].value}
                handleCountryChange={handleCountryChange}
                iconShow={true}
              />
              <div className='flex flex-row gap-4 w-full items-center justify-center'>
                <ComboBox
                  flagShow={true}
                  className='w-32'
                  isCapitalized={false}
                  options={CountryPhone}
                  placeholder={CountryPhone[0].value}
                  readonly={true}
                  selected={CountryPhone.find(
                    country => country.country === selectedCountry
                  )}
                />
                <div className='w-full'>
                  <InputText
                    onChange={handleInputChange}
                    name='phone'
                    type='number'
                    className='w-full'
                    placeholder='Número'
                  />
                </div>
              </div>
              <ComboBox
                handleCountryChange={handleGenreChage}
                flagShow={false}
                className='w-full'
                isCapitalized={true}
                options={gender}
                placeholder={gender[0].value}
              />
              <Button
                onClick={handleChangeStep(2)}
                className='w-full'
                typeVariant='secondary'
              >
                Siguiente
              </Button>
              <div className='w-full flex flex-col items-center justify-center'>
                <span>¿Ya tienes una cuenta?</span>
                <Link
                  className='text-primary-600 font-bold text-sm'
                  to={routes.login}
                >
                  Iniciar sesión
                </Link>
              </div>
            </div>
          </div>
        </FrameCredential>
      )}
      {step === 2 && (
        <FrameCredential title='Medicall'>
          <div className='flex flex-col items-center justify-center gap-4'>
            <div className='mb-8'>
              <h2 className='text-xl font-bold'>Crea tu cuenta</h2>
            </div>
            <div className='w-full flex flex-col gap-4'>
              <InputText
                name='email'
                type='email'
                className='w-full'
                placeholder='Correo electrónico'
              />
              <InputText
                name='password'
                type='password'
                className='w-full'
                placeholder='Contraseña'
              />
              <InputText
                name='confirmPassword'
                type='password'
                className='w-full'
                placeholder='Confirma tu contraseña'
              />
            </div>
            <div className='w-full flex items-center '>
              <label className=' text-primary-600 select-none'>
                <Checkbox
                  onChange={handleChangeCheckbox}
                  sx={{
                    color: '#1CA9A0', // primary-500
                    '&.Mui-checked': {
                      color: '#168780' // primary-600
                    }
                  }}
                />
                Acepta términos y condiciones y envío de correo.
              </label>
            </div>
            <Button className='w-full' typeVariant='primary'>
              Crear Cuenta
            </Button>
            <Button
              onClick={handleChangeStep(1)}
              className='w-full'
              typeVariant='secondary'
            >
              Regresar
            </Button>
            <div className='w-full flex flex-col items-center justify-center'>
              <span>¿Ya tienes una cuenta?</span>
              <Link
                className='text-primary-600 font-bold text-sm'
                to={routes.login}
              >
                Iniciar sesión
              </Link>
            </div>
          </div>
        </FrameCredential>
      )}
    </form>
  )
}
