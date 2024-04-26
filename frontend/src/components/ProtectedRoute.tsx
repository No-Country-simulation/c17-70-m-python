import { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { dataUser } from '../Service/global/user'
import { routes } from '../routes'

interface ProtectedRouteProps {
  children: ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isLogin } = dataUser()
  const location = useLocation()

  return isLogin ? (
    children
  ) : (
    <Navigate to={routes.login} replace state={{ location }} />
  )
}
