import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";


const CaptainProtectedWrap = ({children}:{children:React.ReactNode}) => {
  const token = localStorage.getItem('token')
  const navigate = useNavigate();
  const captainContext = useContext(CaptainDataContext);
  const [loading, setloading] = useState(true)

  if(!captainContext) {
    return <div>Loading...</div>
  }
  const {setcaptain} = captainContext;

  useEffect(() => {
    if(!token){
        navigate("/captain-login")
       }

    axios.get(`${import.meta.env.VITE_BASE_URL}/captain/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response)=>{
      if(response.status === 200){
        const data = response.data;
        setcaptain(data.captain);
        setloading(false);
      }
    }).catch((error)=>{
      if(error.response.status === 401){
        localStorage.removeItem("token");
        navigate("/captain-login");
      }
    })  
  },[token])

  if(loading){
    return <div>Loading...</div>
  }

  return (
    <>
    
    {children}
    </>
  )
}

export default CaptainProtectedWrap