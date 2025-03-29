import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useContext, useState } from "react";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";
import Input from "../components/Input";

const UserRegister = () => {
  
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const userContext = useContext(UserDataContext);

  if (!userContext) {
    return <div>Loading...</div>;
}

  const {setuser} = userContext;
  const navigate = useNavigate();

  const submithandler = async (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();

    const newUser = {
      fullName: {
        firstName: firstName,
        lastName: lastName
      },
      email: email,
      password: password
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/register`, newUser)

      if(response.status === 201){
        const data = await response.data;
  
        setuser(data.user);
        localStorage.setItem("token", data.token)
        navigate('/home');
  
      }
    } catch (error) {
      console.log(error);
    }
    
    setfirstName("");
    setlastName("");
    setemail("");
    setpassword("");
  }


  return (
    <div className="h-screen font-[gilroy] px-6 flex flex-col justify-between p-4 w-full bg-neutral-200">
      <div>
      <h1 className="text-4xl">Uber</h1>
      <form className="pt-12"  onSubmit={submithandler}>
        <h2 className="text-lg font-medium text-neutral-700 mb-2">What's your name?</h2>
        <div className="flex justify-between gap-3 ">
          <Input 
          type="text"
          onChange={(e) => setfirstName(e.target.value)}
          value={firstName}
          placeholder="First Name" />
          <Input
          type="text"
          onChange={(e) => setlastName(e.target.value)}
          value={lastName} 
          placeholder="Last Name"/>
        </div>
        <h2 className="text-lg mt-7 font-medium mb-2 text-neutral-700">What's your email?</h2>
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
        <Button type="submit" name="Create an account"/>
      </form>
      <p className="text-neutral-700 text-lg font-medium text-center">Already have an account?
         <Link to="/login" className="text-blue-600"> Login here</Link></p>
      </div>
      <div>
          <p className='text-sm text-center leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
            Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
        </div>
    </div>
  )
}

export default UserRegister