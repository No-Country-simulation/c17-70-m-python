import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Components } from './Pages/Components'
import { Error404 } from './Pages/Error404'
import { HistoryMedical } from './Pages/HistoryMedical'
import { HistoryOficce } from './Pages/HistoryOffice'
import { HistoryTreatment } from './Pages/HistoryTreatment'
import { Home } from './Pages/Home'
import { Login } from './Pages/Login'
import { MySchedule } from './Pages/MySchedule'
import { PersonalData } from './Pages/PersonalData'
import { Profile } from './Pages/Profile'
import { Register } from './Pages/Register'
import { Schedule } from './Pages/Schedule'
import { useDataUser } from './Service/global/user'
import { Button } from './components/Button'
import { ProtectedRoute } from './components/ProtectedRoute'
import { routes } from './routes'

function App() {
  const { logout } = useDataUser()
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={routes.home}
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path={routes.login} element={<Login />} />
        <Route
          path={'/logoutDev'}
          element={
            <div className='p-5'>
              <Button typeVariant='secondary' onClick={logout}>
                Aki se deslogea
              </Button>
            </div>
          }
        />
        <Route path={routes.register} element={<Register />} />
        <Route
          path={routes.profile}
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path={routes.profileHistory}
          element={
            <ProtectedRoute>
              <HistoryMedical />
            </ProtectedRoute>
          }
        />
        <Route
          path={routes.profileHistoryOffice}
          element={
            <ProtectedRoute>
              <HistoryOficce />
            </ProtectedRoute>
          }
        />
        <Route
          path={routes.profileHistoryTreatment}
          element={
            <ProtectedRoute>
              <HistoryTreatment />
            </ProtectedRoute>
          }
        />
        <Route
          path={routes.profileShedule}
          element={
            <ProtectedRoute>
              <MySchedule />
            </ProtectedRoute>
          }
        />
        <Route
          path={routes.account}
          element={
            <ProtectedRoute>
              <PersonalData />
            </ProtectedRoute>
          }
        />
        <Route path={routes.components} element={<Components />} />
        <Route
          path={routes.schedule}
          element={
            <ProtectedRoute>
              <Schedule />
            </ProtectedRoute>
          }
        />
        <Route path={routes.error} element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
