import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import * as React from 'react'
import { Link } from 'react-router-dom'
import { BurgerMenu } from '../../Icons/BurgerMenu'
import { Close } from '../../Icons/Close'
import { Health } from '../../Icons/Health'
import { Home } from '../../Icons/Home'
import { LeftArrowCircle } from '../../Icons/LeftArrowCircle'
import { Note } from '../../Icons/Note'
import { Option } from '../../Icons/Option'
import { User } from '../../Icons/User'
import { routes } from '../../routes'
import { Result } from '../../type'

const drawerWidth = 280

interface Props {
  user: Result[]
}
export function DrawerRight({ user }: Props) {
  const profile = user[0]
  const [open, setOpen] = React.useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <div className='flex flex-col'>
      <button onClick={handleDrawerOpen} className='p-1 rounded-full'>
        <BurgerMenu className='w-7 h-7' />
      </button>

      <Drawer
        onClose={handleDrawerClose}
        sx={{
          width: drawerWidth,
          '& .MuiDrawer-paper': {
            width: drawerWidth
          }
        }}
        variant='temporary'
        anchor='right'
        open={open}
      >
        <div>
          <div className='flex justify-between px-5 py-8'>
            <img src='logo.png' className=' object-contain' />
            <button onClick={handleDrawerClose}>
              <Close className='w-7 h-7' />
            </button>
          </div>

          <div className='flex px-5 gap-x-4 mb-5'>
            <div className='w-9 h-9 rounded-full overflow-hidden border-2 border-primary-500'>
              <img
                className=' object-contain w-full'
                src={profile.picture.thumbnail}
                alt={`picture the user ${profile.name.first}`}
              />
            </div>
            <div className='flex flex-col items-start justify-start'>
              <h2 className='font-semibold text-xl text-secondary-600 h-[22px]'>
                {profile.name.first} {profile.name.last}
              </h2>
              <Link className=' text-secondary-600 text-sm' to={routes.profile}>
                ver perfil
              </Link>
            </div>
          </div>
        </div>
        <Divider />
        <div className='px-5 py-5 flex flex-col gap-4'>
          <Link
            to={routes.home}
            className='flex gap-x-4 justify-start items-center'
          >
            <Home />
            <span className='text-xl'>Inicio</span>
          </Link>
          <Link
            to={routes.home}
            className='flex gap-x-4 justify-start items-center'
          >
            <Health />
            <span className='text-xl'>Especialidades</span>
          </Link>
          <Link
            to={routes.home}
            className='flex gap-x-4 justify-start items-center'
          >
            <User />
            <span className='text-xl'>Agenda de consultas</span>
          </Link>
          <Link
            to={routes.home}
            className='flex gap-x-4 justify-start items-center'
          >
            <Note />
            <span className='text-xl'>Programa una consulta</span>
          </Link>
          <Link
            to={routes.home}
            className='flex gap-x-4 justify-start items-center'
          >
            <Option />
            <span className='text-xl'>Ayuda y soporte</span>
          </Link>
        </div>
        <div className='mt-auto'>
          <Divider />
          <button className='flex gap-x-4 px-5 py-5 items-center justify-center '>
            <LeftArrowCircle />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </Drawer>
    </div>
  )
}
