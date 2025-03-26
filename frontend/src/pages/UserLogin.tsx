import { Link } from "react-router-dom"
import Button from "../components/Button"
import  { useState } from "react"



const UserLogin = () => {

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [userData, setuserData] = useState("")

  const submithandler = (e:any)=>{
    e.preventDefault();
    

    setemail("");
    setpassword("");
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
         <Link to="/register" className="text-blue-600"> Create new account</Link></p>
      </div>
         <Link to="/captain-login">
         <Button classname="bg-green-800 " name="Sign in as captain"/>
         </Link>
    </div>
  )
}

export default UserLogin