import UserLogin from './pages/UserLogin'
import { Routes, Route } from 'react-router-dom'
import UserRegister from './pages/UserRegister'
import CaptainRegister from './pages/CaptainRegister'
import CaptainLogin from './pages/CaptainLogin'
import Start from './pages/Start'
import Home from './pages/Home'
import UserProtectedWrapper from './pages/UserProtectedWrapper'
import UserLogout from './pages/UserLogout'
import CaptainProtectedWrap from './pages/CaptainProtectedWrap'
import CaptainHome from './pages/CaptainHome'
import CaptainLogout from './pages/CaptainLogout'
import Ride from './pages/Ride'
const App = () => {

  return (
    <Routes>
      <Route path="/" element={<Start />} />
      <Route path='/login' element={<UserLogin />} />
      <Route path='/register' element={<UserRegister />} />
      <Route path='/captain-login' element={<CaptainLogin/>} />
      <Route path='/captain-register' element={<CaptainRegister/>} />
      <Route path='/home' element={
        <UserProtectedWrapper>
          <Home />
        </UserProtectedWrapper>
      } />
      <Route path='/user/logout' element={
        <UserProtectedWrapper>
          <UserLogout/>
        </UserProtectedWrapper>
      } />
      <Route path='/captain-home' element={
        <CaptainProtectedWrap>
          <CaptainHome/>
        </CaptainProtectedWrap>
      } />
      <Route path='/captain/logout' element={
        <CaptainProtectedWrap>
          <CaptainLogout/>
        </CaptainProtectedWrap>
      } />
      <Route path='/riding' element={<Ride/>}/>
    </Routes>
  )
}

export default App