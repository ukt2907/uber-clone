import { Link,  useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useContext, useState } from "react";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";

const CaptainRegister = () => {

  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const [vehicleColor, setvehicleColor] = useState("");
  const [vehiclePlate, setvehiclePlate] = useState("");
  const [vehicleCapacity, setvehicleCapacity] = useState("");
  const [vehicleType, setvehicleType ] = useState('');
  const captainContext = useContext(CaptainDataContext);
  const navigate = useNavigate();

  if(!captainContext) {
    return <div>Loading...</div>
  }
  const {setcaptain} = captainContext;


  const submithandler = async (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();

    const fullName = { firstName, lastName };
    const vehicle = { color: vehicleColor, plate: vehiclePlate, capacity: Number(vehicleCapacity), vehicleType };
  
    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/register`, {
        fullName, email, password, vehicle
      });
  
      if (res.status === 201) {
        const data = await res.data;
        setcaptain(data.captain);
        localStorage.setItem("token", data.token);
        navigate("/captain-home");
      }
    } catch (error) {
      console.error("Registration failed");
    }



    setfirstName("");
    setlastName("");
    setemail("");
    setpassword("");
    setvehicleColor("");
    setvehiclePlate("");
    setvehicleCapacity("");
    setvehicleType("");
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
            <h2 className="text-lg mt-7 font-medium text-neutral-700">Vehicle Information</h2>
            <div className="flex justify-between gap-3 ">
              <input
                type="text"
                onChange={(e) => setvehicleColor(e.target.value)}
                value={vehicleColor}
                className="p-2.5 w-full border border-neutral-400 rounded-md mt-2"
                placeholder="Vehicle Color"
              />
              <input
                type="text"
                onChange={(e) => setvehiclePlate(e.target.value)}
                value={vehiclePlate}
                className="p-2.5 w-full border border-neutral-400 rounded-md mt-2"
                placeholder="Vehicle Plate"
              />
            </div>
            <input
              type="number"
              onChange={(e) => setvehicleCapacity(e.target.value)}
              value={vehicleCapacity}
              className="p-2.5 w-full border border-neutral-400 rounded-md mt-2"
              placeholder="Vehicle Capacity"
            />
            <select
              onChange={(e) => setvehicleType(e.target.value)}
              value={vehicleType}
              className="p-2.5 w-full cursor-pointer border border-neutral-400 rounded-md mt-2"
            >
              <option value="" disabled>Select Vehicle Type</option>
              <option value="car">Car</option>
              <option value="bike">Bike</option>
              <option value="auto">Auto</option>
            </select>
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