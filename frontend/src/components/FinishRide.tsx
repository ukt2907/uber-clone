import { Link } from "react-router-dom";

import { icons } from "../lib/icons";
import AddressCard from "./AddressCard";
import Button from "./Button";


const FinishRide = () => {
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
        <AddressCard icon={icons[0].icon} name={icons[0].name}/>
        <AddressCard icon={icons[1].icon} name={icons[1].name}/>
        <AddressCard icon={icons[2].icon} name={icons[2].name}/>
           <Link to="/captain-riding">
           <Button
            type="submit"
            classname="bg-green-600 text-white"
            name="Finish Ride"/>
        </Link>
    </div>
    
</div>
  )
}

export default FinishRide