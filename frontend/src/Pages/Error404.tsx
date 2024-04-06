import { Link } from 'react-router-dom'

export function Error404() {
  return (
    <section className='bg-white flex items-center justify-center w-screen h-screen'>
      <div className='py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6'>
        <div className='mx-auto max-w-screen-sm text-center'>
          <h1 className='mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600'>
            404
          </h1>
          <p className='mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl'>
            Ha ocurrido algun error.
          </p>
          <p className='mb-4 text-lg font-light text-gray-500'>
            Lo sentimos, no podemos encontrar esa página. Encontrará mucho que
            explorar en la página de inicio
          </p>
          <Link
            to='/'
            className='inline-flex text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-full text-sm px-5 py-2.5 text-cente my-4'
          >
            Regresar al inicio
          </Link>
        </div>
      </div>
    </section>
  )
}
