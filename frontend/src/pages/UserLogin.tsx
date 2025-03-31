import { Link, useNavigate } from "react-router-dom"
import Button from "../components/Button"
import  { useContext, useState } from "react"
import axios from "axios";
import { UserDataContext } from "../context/UserContext";
import Input from "../components/Input";



const UserLogin = () => {

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const userContext = useContext(UserDataContext);
  const navigate = useNavigate();

  if(!userContext) {
    return <div>Loading...</div>
  }
  const {setuser} = userContext;
  

  const submithandler = async (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    
    const userdata = {
      email: email,
      password: password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/login`, userdata)

    if(response.status === 200){
      const data = await response.data;

      setuser(data.user);
      localStorage.setItem("token", data.token)
      navigate('/home')
    }

    setemail("");
    setpassword("");
  }


  return (
    <div className="h-screen font-[gilroy] px-6 flex flex-col justify-between p-4 w-full bg-neutral-200">
      <div>
      <h1 className="text-4xl">Uber</h1>
      <form className="pt-12"  onSubmit={submithandler}>
        <h2 className="text-lg mb-2 font-medium text-neutral-700">What's your email?</h2>
        <Input
        type="email"
        onChange={(e) => setemail(e.target.value)}
        value={email}
        placeholder="Email"
        />

        <h2 className="text-lg mt-7 mb-2 font-medium text-neutral-700">What's your password?</h2>
        <Input
        type="password"
        onChange={(e) => setpassword(e.target.value)}
        value={password}
        placeholder="Password"
        />
        <Button type="submit" name="Login"/>
      </form>
      <p className="text-neutral-700 mt-4 text-lg font-medium text-center">New here?
         <Link to="/register" className="text-blue-600"> Create new account</Link></p>
      </div>
         <Link to="/captain-login">
         <Button type="submit" classname="bg-green-800 " name="Sign in as captain"/>
         </Link>
    </div>
  )
}

export default UserLogin