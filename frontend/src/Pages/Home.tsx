import { dataUser } from '../Service/global/user'
import { DrawerRight } from '../components/ComboBox/Drawer'
import { ROLE } from '../constants'
import { HomePatient } from '../components/HomePatient'
import { HomeDoctor } from '../components/HomeDoctor'

export function Home () {
  const { user } = dataUser()
  const first = user.first_name
  const prefix = user.gender === 'Masculino' ? 'Dr' : 'Dra'

  return (
    <main className='px-5 py-8 max-w-[500px]'>
      <nav className='flex justify-between mb-7'>
        <img className=' object-contain' src='logo.png' />
        <DrawerRight />
      </nav>
      {
        user.role === ROLE.patient && (
          <HomePatient first={first} />
        )
      }
      {
        user.role === ROLE.doctor && (
          <HomeDoctor first={first} prefix={prefix} />
        )
      }
    </main>
  )
}
