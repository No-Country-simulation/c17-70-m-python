import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { URL } from '../../constants'

const InitDataUser = {
  birthdate: 'cumpleaños',
  country: 'Pais',
  email: 'Email',
  first_name: 'Primer nombre',
  gender: 'Genero',
  id: 'Id',
  id_number: 0,
  last_name: 'Segundo nombre',
  phone_number: 'Numero',
  role: 0,
  user_photo: 'IMG',
  specialty: undefined
}

interface UserData {
  birthdate: string
  country: string
  email: string
  first_name: string
  gender: string
  id: string
  id_number: number
  last_name: string
  phone_number: string
  role: number
  user_photo: string
  specialty: string | undefined
}
interface UserState {
  user: UserData
  isLogin: boolean
  isLoading: boolean
  access: string
  fetchUser: ({ userName, password }: Props) => Promise<void>
  logout: () => void
  isLoadingTrue: () => void
  isLoadingFalse: () => void
}

interface Props {
  userName: string
  password: string
}

export const dataUser = create<UserState>()(
  devtools(
    persist(
      set => {
        return {
          user: InitDataUser,
          isLogin: false,
          isLoading: false,
          access: '',
          fetchUser: async ({ userName, password }: Props) => {
            const url = `${URL}/api/auth/login/`

            try {
              const response = await fetch(url, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Referer': `${URL}`
                },
                body: JSON.stringify({
                  email: userName,
                  password: password
                })
              })

              if (!response.ok) {
                throw new Error(
                  `Status ${response.status} Ha ocurrido un problema`
                )
              }

              const { user, access } = await response.json()
              set({ user, isLogin: true, access })
            } catch (error) {
              console.error('Hubo un problema con la solicitud:', error)
              throw error
            }
          },
          logout: async () => {
            set({
              user: InitDataUser,
              isLogin: false,
              isLoading: false,
              access: ''
            })
          },
          isLoadingTrue: () => {
            set({ isLoading: true })
          },
          isLoadingFalse: () => {
            set({ isLoading: false })
          }
        }
      },
      {
        name: 'user'
      }
    )
  )
)
