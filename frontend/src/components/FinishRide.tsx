import { Link, useNavigate } from "react-router-dom";

import Button from "./Button";
import { FaLocationDot, FaSquare } from "react-icons/fa6";
import { IoCashOutline } from "react-icons/io5";
import axios from "axios";

type FinishRideProps = {
  setfinishRidePanel: React.Dispatch<React.SetStateAction<boolean>>;
  
    rideData: {
        userId:{
            fullName: {
                firstName: string;
                lastName: string;
            }
        },
        pickup: string;
        destination: string;
        fare: number;
        _id: string;
    }

}
const FinishRide = ({...props}: FinishRideProps) => {
    const navigate = useNavigate();

    const endRide = async () => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/ride/end-ride`,
                {
                    rideId: props.rideData._id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            
            if(response.status === 201) {
                props.setfinishRidePanel(false);

                navigate("/captain-home");
            }
        } catch (error: any) {
            console.error("End ride error:", error.response?.data || error.message);
        }}

  return (
    <div className="flex rounded-xl flex-col gap-5 px-4">
    <div className="w-full flex justify-center">
    </div>
    <h1 className="text-xl font-semibold mb-3">Finish Ride</h1>
    <div className="flex bg-yellow-400 rounded-xl  items-center justify-between p-4">
        <div className="flex items-center gap-2">
            <img className="size-15 rounded-full" src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
            <h2>{props.rideData.userId.fullName.firstName}</h2>
        </div>
        <h3>10.2 km</h3>
    </div>
    <div className="flex   flex-col ">
        <div className="flex border-b border-neutral-500  py-5    items-center gap-2">
         <div className="size-10 rounded-full bg-neutral-100 flex items-center justify-center text-black"><FaLocationDot /></div>
         <div>
             <p className="text-xl text-neutral-600/90">{props.rideData.pickup}</p>
         </div>
        </div>
        <div className="flex border-b border-neutral-500  py-5    items-center gap-2">
         <div className="size-10 rounded-full bg-neutral-100 flex items-center justify-center text-black"><FaSquare /></div>
         <div>
             <p className="text-xl text-neutral-600/90">{props.rideData.destination}</p>
         </div>
        </div>
        <div className="flex border-b border-neutral-500  py-5    items-center gap-2">
         <div className="size-10 rounded-full bg-neutral-100 flex items-center justify-center text-black"><IoCashOutline /></div>
         <div>
             <p className="text-xl text-neutral-600/90">{props.rideData.fare}</p>
         </div>
        </div>
           <Button
           onclick={endRide}
            type="submit"
            classname="bg-green-600 text-white"
            name="Finish Ride"/>
    </div>
    
</div>
  )
}

export default FinishRide