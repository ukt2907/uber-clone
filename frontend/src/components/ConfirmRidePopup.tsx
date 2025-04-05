import { Link } from "react-router-dom";
import { icons } from "../lib/icons";
import AddressCard from "./AddressCard";
import Button from "./Button";
import Input from "./Input";
import { useState } from "react";

interface ConfirmRideProps {
    setconfirmRidePanel: React.Dispatch<React.SetStateAction<boolean>>;
    setridePopupPanel: React.Dispatch<React.SetStateAction<boolean>>;
}

const ConfirmRidePopup = (props: ConfirmRideProps) => {
    const [otp, setotp] = useState("");
  return (
    <div className="flex rounded-xl flex-col gap-5 px-4">
    <div className="w-full flex justify-center">
    </div>
    <h1 className="text-xl font-semibold mb-3">Confirm your Ride</h1>
    <div className="flex bg-yellow-400 rounded-xl  items-center justify-between p-4">
        <div className="flex items-center gap-2">
            <img className="size-15 rounded-full" src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
            <h2>Jhanvi Sharma</h2>
        </div>
        <h3>10.2 km</h3>
    </div>
    <div className="flex   flex-col ">
        <div className="flex border-b border-neutral-500  py-5    items-center gap-2">
         <div className="size-10 rounded-full bg-neutral-100 flex items-center justify-center text-black"><FaLocationDot /></div>
         <div>
             <p className="text-xl text-neutral-600/90">{props.pickup}</p>
         </div>
        </div>
        <div className="flex border-b border-neutral-500  py-5    items-center gap-2">
         <div className="size-10 rounded-full bg-neutral-100 flex items-center justify-center text-black"><FaSquare /></div>
         <div>
             <p className="text-xl text-neutral-600/90">{props.destination}</p>
         </div>
        </div>
        <div className="flex border-b border-neutral-500  py-5    items-center gap-2">
         <div className="size-10 rounded-full bg-neutral-100 flex items-center justify-center text-black"><IoCashOutline /></div>
         <div>
             <p className="text-xl text-neutral-600/90">{props.fare}</p>
         </div>
        </div>
        <form className="mt-3" action="">
            <Input 
            onChange={(e) => setotp(e.target.value)}
            value={otp}
            className="py-4 text-xl font-mono"
            type="number" 
            placeholder="Enter OTP" />
           <Link to="/captain-riding">
           <Button
            type="submit"
            onclick={() => {props.setconfirmRidePanel(false)}}
            classname="bg-green-600 text-white"
            name="Confirm"/>
        </Link>
        <Button
        classname="bg-red-600 text-white"
        onclick={() => props.setconfirmRidePanel(false)}
        name="Cancel"/>
        </form>
    </div>
    
</div>
  )
}

export default ConfirmRidePopup