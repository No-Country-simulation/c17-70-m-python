import { Button } from '../components/Button'
import { InputText } from '../components/InputText'

export function Components() {
  const aritcleClass = 'flex flex-col justify-center items-center gap-3'
  const titleClass = 'text-xl'
  return (
    <section className='px-20 pt-10 w-full h-screen bg-gray-700 text-white flex flex-col gap-5'>
      <article className={aritcleClass}>
        <h1 className={titleClass}>Botones</h1>
        <h2>Botón Primario</h2>
        <Button className='w-60' typeVariant='primary'>
          Iniciar Sesión
        </Button>
        <h2>Botón Secundario</h2>
        <Button className='w-60' typeVariant='secondary'>
          Siguiente
        </Button>
      </article>
      <article className={aritcleClass}>
        <h1 className={titleClass}>Input text</h1>
        <InputText className='w-60' placeholder='Correo Electronico' />
      </article>
    </section>
  )
}
