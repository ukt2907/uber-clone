import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import UserContext from './context/UserContext.tsx'
import CaptainContext from './context/CaptainContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <CaptainContext>
    <UserContext>
      <BrowserRouter> 
        <App />
      </BrowserRouter> 
    </UserContext>
   </CaptainContext>  
  </StrictMode>,
)
