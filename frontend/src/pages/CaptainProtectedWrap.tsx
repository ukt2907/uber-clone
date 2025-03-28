import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CaptainProtectedWrap = ({children}:{children:React.ReactNode}) => {
  const token = localStorage.getItem('token')
  const navigate = useNavigate();

  useEffect(() => {
    if(!token){
        navigate("/captain-login")
       }
  },[token])
  return (
    <>
    
    {children}
    </>
  )
}

export default CaptainProtectedWrap