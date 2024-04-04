import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { Button } from '../components/Button'
import { InputText } from '../components/InputText'

type inputValid = null | boolean

export function Components() {
  const aritcleClass = 'flex flex-col justify-center items-center gap-3'
  const titleClass = 'text-2xl'

  const [email, setEmail] = useState('')
  const [isValidEmail, setIsValidEmail] = useState<inputValid>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target

    setEmail(value)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    setIsValidEmail(emailRegex.test(value))
  }

  return (
    <section className='px-20 pt-10 w-full h-screen '>
      <div className='flex flex-col gap-5 pb-14'>
        <article className={aritcleClass}>
          <h1 className={titleClass}>Botones</h1>
          <div className='flex gap-x-3 justify-center items-center'>
            <div className='flex flex-col gap-3 items-center'>
              <h2 className='text-xl'>Botón Primario</h2>
              <Button className='w-60' typeVariant='primary'>
                Iniciar Sesión
              </Button>
              <Button className='w-60 bg-primary-700' typeVariant='primary'>
                Iniciar Sesión
              </Button>
              <Button disabled className='w-60' typeVariant='primary'>
                Iniciar Sesión
              </Button>
            </div>
            <div className='flex flex-col gap-3 items-center'>
              <h2 className='text-xl'>Botón Secundario</h2>
              <Button className='w-60' typeVariant='secondary'>
                Siguiente
              </Button>
              <Button
                className='w-60 bg-primary-200 font-semibold'
                typeVariant='secondary'
              >
                Siguiente
              </Button>
              <Button disabled className='w-60' typeVariant='secondary'>
                Siguiente
              </Button>
            </div>
          </div>
        </article>
        <article className={aritcleClass}>
          <h1 className={titleClass}>Input text</h1>
          <InputText
            type='email'
            className='w-60'
            placeholder='Correo Electronico'
          />
          <InputText
            ref={inputRef}
            type='email'
            className='w-60'
            placeholder='Correo Electronico'
          />

          <div className='flex flex-col'>
            <InputText
              onChange={handleChangeEmail}
              value={email}
              type='email'
              className={`${
                !isValidEmail
                  ? 'border-error-400 outline-none ring-error-500 ring-2'
                  : ''
              } w-60`}
              placeholder='Correo Electronico'
            />
            {!isValidEmail && (
              <span className='text-error-500 text-xs'>Carreo no valido</span>
            )}
          </div>
          <InputText
            type='email'
            className='w-60'
            placeholder='Correo Electronico'
            disabled
          />
        </article>
      </div>
    </section>
  )
}
