import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import UserContext from './context/UserContext.tsx'
import CaptainContext from './context/CaptainContext.tsx'
import { RecoilRoot } from 'recoil'

createRoot(document.getElementById('root')!).render(
  
   <CaptainContext>
    <UserContext>
      <RecoilRoot>
      <BrowserRouter> 
        <App />
      </BrowserRouter> 
      </RecoilRoot>
    </UserContext>
   </CaptainContext>  
)
