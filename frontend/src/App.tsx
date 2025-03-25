import { Routes, Route } from 'react-router-dom'
import UserLogin from './pages/UserLogin'
import Home from './pages/Home'
import UserRegister from './pages/UserRegister'
import CaptainRegister from './pages/CaptainRegister'
import CaptainLogin from './pages/CaptainLogin'
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/login' element={<UserLogin />} />
      <Route path='/register' element={<UserRegister />} />
      <Route path='/captain-login' element={<CaptainLogin/>} />
      <Route path='/captain-register' element={<CaptainRegister/>} />
    </Routes>
  )
}

export default App