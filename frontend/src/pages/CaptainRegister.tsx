import { Link } from "react-router-dom";
import Button from "../components/Button";
import { useState } from "react";

const CaptainRegister = () => {

  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [userData, setuserData] = useState("")

  const submithandler = (e:any)=>{
    e.preventDefault();
    

    setfirstName("");
    setlastName("");
    setemail("");
    setpassword("");
  }


  return (
    <div className="h-screen font-[gilroy] px-6 flex flex-col justify-between p-4 w-full bg-neutral-300">
      <div>
      <h1 className="text-4xl">Uber</h1>
      <form className="pt-12"  onSubmit={submithandler}>
        <h2 className="text-lg font-medium text-neutral-700">What's your name?</h2>
        <div className="flex justify-between gap-3 mb-7">
          <input 
          type="text"
          onChange={(e) => setfirstName(e.target.value)}
          value={firstName}
          className="p-2.5 w-full border   border-neutral-400 rounded-md mt-2"
          placeholder="First Name" />
          <input
          type="text"
          onChange={(e) => setlastName(e.target.value)}
          value={lastName} 
          className="p-2.5 w-full border   border-neutral-400 rounded-md mt-2"
          placeholder="Last Name"/>
        </div>
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
        <Button  name="Create Captain Account"/>
      </form>
      <p className="text-neutral-700 text-lg font-medium text-center">Already have an account?
         <Link to="/register" className="text-blue-600"> Login here</Link></p>
      </div>
      <div>
          <p className='text-sm text-center leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
            Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
        </div>
    </div>
  )
}

export default CaptainRegister