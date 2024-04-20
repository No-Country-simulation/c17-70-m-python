import { Link } from 'react-router-dom'
import { ReducedLogo } from '../Icons/ReducedLogo'
import { RightArrow } from '../Icons/RightArrow'
import { User } from '../Icons/User'
import { useDataUser } from '../Service/global/user'
import { DrawerRight } from '../components/ComboBox/Drawer'
import { routes } from '../routes'

export function Profile() {
  const { user } = useDataUser()
  const profile = user[0]

  return (
    <div
      className='w-screen max-h-screen'
      style={{
        background:
          'linear-gradient(179.71deg, #1460A8 0.25%, #56C9CC 25.36%, #66E2D5 38.65%)',
        maxWidth: '500px'
      }}
    >
      <div className='px-8 py-9'>
        <div className='flex justify-between items-center'>
          <Link to={routes.home}>
            <ReducedLogo />
          </Link>
          <h1 className='text-neutral-50 font-semibold text-xl'>Mi perfil</h1>
          <DrawerRight type='secondary' />
        </div>
        <div className='flex flex-col items-center justify-center'>
          <div className='w-[78px] h-[78px] overflow-hidden rounded-full my-5'>
            <img
              className='object-contain object-center'
              src={profile.picture.large}
              alt={`imagen de perfil del usuario ${profile.name.first}`}
            />
          </div>
          <span className='text-white font-bold text-2xl'>
            {profile.name.first} {profile.name.last}
          </span>
        </div>
      </div>
      <div className='w-full bg-white h-full px-8 py-9 rounded-t-[50px] flex flex-col gap-5'>
        <Link className='flex justify-between' to={routes.account}>
          <div className='flex gap-4'>
            <User />
            <span className='font-semibold text-xl'>Datos personales</span>
          </div>
          <div>
            <RightArrow />
          </div>
        </Link>
        <Link className='flex justify-between' to={routes.profileHistory}>
          <div className='flex gap-4'>
            <User />
            <span className='font-semibold text-xl'>Historial médico</span>
          </div>
          <div>
            <RightArrow />
          </div>
        </Link>
        <Link className='flex justify-between' to={routes.profileShedule}>
          <div className='flex gap-4'>
            <User />
            <span className='font-semibold text-xl'>
              Mi agenda de consultas
            </span>
          </div>
          <div>
            <RightArrow />
          </div>
        </Link>
        <Link className='flex justify-between' to={routes.home}>
          <div className='flex gap-4'>
            <User />
            <span className='font-semibold text-xl'>
              Configuración de cuenta
            </span>
          </div>
          <div>
            <RightArrow />
          </div>
        </Link>
      </div>
    </div>
  )
}
