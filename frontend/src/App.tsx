import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Components } from './Pages/Components'
import { Error404 } from './Pages/Error404'
import { Home } from './Pages/Home'
import { routes } from './routes'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.home} element={<Home />} />
        <Route path={routes.components} element={<Components />} />
        <Route path={routes.error} element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
