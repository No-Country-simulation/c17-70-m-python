import Cookie from 'js-cookie'
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
  user_photo: 'IMG'
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
}
interface UserState {
  user: UserData
  isLogin: boolean
  isLoading: boolean
  fetchUser: ({ userName, password }: Props) => Promise<void>
  getDataUser: () => void
  logout: () => void
  isLoadingTrue: () => void
  isLoadingFalse: () => void
}

interface Props {
  userName: string
  password: string
}

export const useDataUser = create<UserState>()(
  devtools(
    persist(
      (set, get) => {
        return {
          user: InitDataUser,
          isLogin: false,
          isLoading: false,
          fetchUser: async ({ userName, password }: Props) => {
            const url = `${URL}/api/auth/login/`

            try {
              const response = await fetch(url, {
                method: 'POST',
                credentials: 'include',
                headers: {
                  'Content-Type': 'application/json',
                  'Referer': `${URL}`
                },
                body: JSON.stringify({
                  username: userName,
                  password: password
                })
              })

              if (!response.ok) {
                throw new Error(
                  `Status ${response.status} Ha ocurrido un problema`
                )
              }

              const sessionid = Cookie.get('sessionid')
              const token = Cookie.get('csrftoken')
              console.log(sessionid, token)

              const { user_data: userData } = await response.json()
              set({ user: userData, isLogin: true })
            } catch (error) {
              console.error('Hubo un problema con la solicitud:', error)
              throw error
            }
          },
          getDataUser: () => {
            const { user } = get()
            console.log(user)
          },
          logout: async () => {
            const url = `${URL}/api/auth/logout/`
            const token = Cookie.get('csrftoken')
            try {
              await fetch(url, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Referer': `${URL}`,
                  'X-CSRFToken': `${token}`
                }
              })
            } catch (error) {
              console.error('Hubo un problema con la solicitud:', error)
              throw error
            }
            set({ isLogin: false })
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
