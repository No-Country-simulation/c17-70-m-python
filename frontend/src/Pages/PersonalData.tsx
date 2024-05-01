import { format } from '@formkit/tempo'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { LeftArrow } from '../Icons/LeftArrow'
import { dataUser } from '../Service/global/user'
import { Button } from '../components/Button'
import { ComboBox } from '../components/ComboBox/ComboBox'
import { DrawerRight } from '../components/ComboBox/Drawer'
import { InputText } from '../components/InputText'
import { routes } from '../routes'

const countryFlags = [
  {
    image: 'https://flagicons.lipis.dev/flags/4x3/cl.svg',
    value: 'Chile',
    alt: 'image of country Chile'
  },
  {
    image: 'https://flagicons.lipis.dev/flags/4x3/ar.svg',
    value: 'Argentina',
    alt: 'image of country Argentina'
  },
  {
    image: 'https://flagicons.lipis.dev/flags/4x3/bo.svg',
    value: 'Bolivia',
    alt: 'image of country Bolivia'
  }
]

const CountryPhone = [
  {
    image: 'https://flagicons.lipis.dev/flags/4x3/cl.svg',
    value: '+56',
    country: 'Chile',
    alt: 'image of country Chile'
  },
  {
    image: 'https://flagicons.lipis.dev/flags/4x3/ar.svg',
    value: '+54',
    country: 'Argentina',
    alt: 'image of country Argentina'
  },
  {
    image: 'https://flagicons.lipis.dev/flags/4x3/bo.svg',
    value: '+591',
    country: 'Bolivia',
    alt: 'image of country Bolivia'
  }
]

export function PersonalData () {
  const { user } = dataUser()
  const profile = user
  const date = new Date(profile.birthdate)
  const formateDate = format(date, 'DD/MM/YYYY', 'en')
  //const newFormat = format(profileBirthdate, 'DD/MM/YYYY', 'en')
  const [selectedCountry, setSelectedCountry] = useState('Chile')

  const handleCountryChange = (countryName: string) => {
    setSelectedCountry(countryName)
  }
  return (
    <section className='max-w-[500px] px-8 py-9'>
      <div className='flex justify-between items-center'>
        <Link to={routes.profile}>
          <LeftArrow />
        </Link>
        <h1 className='text-xl text-primary-500 font-semibold'>
          Datos Personales
        </h1>
        <DrawerRight />
      </div>
      <div className='flex justify-center items-center py-11'>
        <div className='rounded-full overflow-hidden border-2 border-primary-500 w-[128px] h-[128px]'>
          <img
            className='w-[128px] h-[128px] aspect-square object-cover object-center'
            src={profile.user_photo}
            alt={`imagen de perfil del usuario ${profile?.first_name}`}
          />
        </div>
      </div>
      <div className='flex flex-col gap-4 w-full'>
        <h2 className='font-bold text-xl'>Datos personales</h2>
        <div className='flex gap-4'>
          <InputText className='w-full' placeholder={profile.first_name} />
          <InputText className='w-full' placeholder={profile.last_name} />
        </div>
        <InputText placeholder={profile.id_number.toString()} />
        <InputText placeholder={formateDate} />
        <ComboBox
          className='w-full'
          iconShow={true}
          flagShow={true}
          isCapitalized={true}
          handleCountryChange={handleCountryChange}
          options={countryFlags}
          placeholder={countryFlags[0].value}
        />
        <div className='flex gap-4 w-full items-center'>
          <ComboBox
            flagShow={true}
            className=' w-32'
            isCapitalized={false}
            options={CountryPhone}
            placeholder='+56'
            readonly={true}
            selected={CountryPhone.find(
              country => country.country === selectedCountry
            )}
          />
          <div className='w-full'>
            <InputText className='w-full' placeholder={profile.phone_number} />
          </div>
        </div>
      </div>

      <Button className='my-4 w-full' typeVariant='primary'>
        Guardar Cambios
      </Button>
    </section>
  )
}
