import { Link } from "react-router-dom";
import Button from "../components/Button";
import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";

const CaptainLogin = () => {

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  const captainContext = useContext(CaptainDataContext);

  if(!captainContext) {
    return <div>Loading...</div>
  }
  const {setcaptain} = captainContext;
  

  const submithandler = async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    
    const captaindata = {
      email: email,
      password: password
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/login`, captaindata)

      if(response.status === 200){
        const data = await response.data;
  
        setcaptain(data.user);
        localStorage.setItem("token", data.token)
        navigate('/captain-home')
      }
  
      setemail("");
      setpassword("");
    } catch (error) {
      console.log("Login failed", error);
    // Handle error (e.g., show a message to the user)
    }
  }


  return (
    <div className="h-screen font-[gilroy] px-6 flex flex-col justify-between p-4 w-full bg-neutral-300">
      <div>
      <h1 className="text-4xl">Uber</h1>
      <form className="pt-12"  onSubmit={submithandler}>
        <h2 className="text-lg font-medium text-neutral-700">What's your email?</h2>
        <input 
        type="email"
        onChange={(e) => setemail(e.target.value)}
        value={email}
        placeholder="Email"
        className="p-2.5 w-full border   border-neutral-400 rounded-md mt-2" />

        <h2 className="text-lg mt-7 font-medium text-neutral-700">What's your password?</h2>
        <input
        type="password"
        onChange={(e) => setpassword(e.target.value)}
        value={password}
        placeholder="Password"
        className="p-2.5 w-full border border-neutral-400 rounded-md mt-2" />
        <Button  name="Login"/>
      </form>
      <p className="text-neutral-700 text-lg font-medium text-center">New here?
         <Link to="/captain-register" className="text-blue-600"> Register as a Captain</Link></p>
      </div>
         <Link to="/login">
         <Button type="submit" classname="bg-orange-500 " name="Sign in as user"/>
         </Link>
    </div>
  )
}

export default CaptainLogin