import { Button } from '../components/Button'

export function Components() {
  return (
    <section className='px-20 pt-10 w-full h-screen bg-gray-700 text-white'>
      <article className='flex flex-col justify-center items-center gap-3'>
        <h1 className='text-xl'>Botones</h1>
        <h2>Botón Primario</h2>
        <Button className='w-60' typeVariant='primary'>
          Iniciar Sesión
        </Button>
        <h2>Botón Secundario</h2>
        <Button className='w-60' typeVariant='secondary'>
          Siguiente
        </Button>
      </article>
    </section>
  )
}
