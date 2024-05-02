import { ReactNode, useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { dataUser } from '../Service/global/user'
import { routes } from '../routes'
import { isValidToken } from '../Service/checkToken'
interface ProtectedRouteProps {
  children: ReactNode
}

export function ProtectedRoute ({ children }: ProtectedRouteProps) {
  const { isLogin, access, logout } = dataUser()
  const location = useLocation()

  useEffect(() => {
    const handleToken = async () => {
      const [isError, isValid] = await isValidToken({ access })
      if (isError) {
        console.log(isError)
      }
      if (isValid === false) {
        logout()
      }
    }
    handleToken()
  }, [access, logout])


  return isLogin ? (
    children
  ) : (
    <Navigate to={routes.login} replace state={{ location }} />
  )
}
