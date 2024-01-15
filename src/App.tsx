import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.scss'
import Cabecalho from './components/cabecalho/Cabecalho'
import Rodape from './components/rodape/Rodape'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Cadastro from './pages/cadastro/Cadastro'
import RotasProtegidas from './pages/rotasProtegidas/RotasProtegidas'
import Dashboard from './pages/rotasProtegidas/dashboard/Dashboard'

function App() {

  return (
    <BrowserRouter>
      <Cabecalho />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/cadastro' element={<Cadastro />} />

        <Route element={<RotasProtegidas />}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
      </Routes>
      <Rodape />
    </BrowserRouter>
  )
}

export default App
