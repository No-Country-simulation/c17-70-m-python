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
import { routes } from './routes'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.home} element={<Home />} />
        <Route path={routes.login} element={<Login />} />
        <Route path={routes.register} element={<Register />} />
        <Route path={routes.profile} element={<Profile />} />
        <Route path={routes.profileHistory} element={<HistoryMedical />} />
        <Route path={routes.profileHistoryOffice} element={<HistoryOficce />} />
        <Route
          path={routes.profileHistoryTreatment}
          element={<HistoryTreatment />}
        />

        <Route path={routes.profileShedule} element={<MySchedule />} />
        <Route path={routes.account} element={<PersonalData />} />
        <Route path={routes.components} element={<Components />} />
        <Route path={routes.schedule} element={<Schedule />} />
        <Route path={routes.error} element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
