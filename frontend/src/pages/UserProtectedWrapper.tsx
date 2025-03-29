import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import axios from "axios";

const UserProtectedWrapper = ({children}: {children:React.ReactNode}) => {

   const token = localStorage.getItem("token");
   const navigate = useNavigate(); 
   const userContext = useContext(UserDataContext);
   const [loading, setloading] = useState(true)

   if(!userContext) {
    return <div>Loading...</div>
   }
   const {setuser} = userContext;

   useEffect(() => {
    if(!token){
        navigate("/login")
       }
    axios.get(`${import.meta.env.VITE_BASE_URL}/user/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response)=>{
      if(response.status === 200){
        const data = response.data;
        setuser(data.user);
        setloading(false);
      }
    }).catch((error)=>{
      if(error.response.status === 401){
        localStorage.removeItem("token");
        navigate("/login");
      }
    })   
          
   },[token])

   if(loading) {
    return <div>Loading...</div>
   }


  return (
    <>
    {children}
    </>
  )
}

export default UserProtectedWrapper