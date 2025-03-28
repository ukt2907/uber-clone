import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserProtectedWrapper = ({children}: {children:React.ReactNode}) => {

   const token = localStorage.getItem("token");
   const navigate = useNavigate(); 

   useEffect(() => {
    if(!token){
        navigate("/login")
       }
   },[token])


  return (
    <>
    {children}
    </>
  )
}

export default UserProtectedWrapper