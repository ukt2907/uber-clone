import { FaUserAlt } from 'react-icons/fa'

type VehiclePanelProps = {
  fare: {auto: number, car: number, bike: number},
  setVehicleType: (value:"auto" | "car" | "bike") => void;
  setconfirmRidePanel: (value:boolean) => void;
  setVehiclePanel: (value:boolean) => void;
}

const VehiclePanel = ({fare, setconfirmRidePanel, setVehicleType, setVehiclePanel}:VehiclePanelProps) => {
  return (
  <div>
       <div onClick={()=>{setconfirmRidePanel(true), setVehicleType("car"), setVehiclePanel(false)}}   className="gap-6 p-2.5 cursor-pointer active:border-black border  border-black/30 rounded-xl   grid grid-cols-4">
   <div className="size-20 flex items-center justify-center  col-span-1">
     <img src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_552,w_552/v1555367310/assets/30/51e602-10bb-4e65-b122-e394d80a9c47/original/Final_UberX.png" alt="" />
   </div>
   <div className=" col-span-2 ">
     <div className="flex items-center">
     <h2 className="mr-3 font-semibold text-xl">UberX</h2>
     <FaUserAlt  className="text-base mr-1"/>
     <h3 className="text-base">4</h3>
     </div>
     <h3 className="text-neutral-500">2 min away</h3>
     <p className="text-neutral-600 text-sm tracking-tight ">The low-cost Uber</p> 
   </div>
     <div className="flex justify-end col-span-1">
     <h2>₹{fare.car}</h2>
     </div>
      </div> 
      <div onClick={()=>{setconfirmRidePanel(true), setVehicleType("auto"), setVehiclePanel(false)}}  className="gap-6 p-2.5 cursor-pointer active:border-black border  border-black/30 rounded-xl   grid grid-cols-4">
   <div className="size-20 flex items-center justify-center  col-span-1">
     <img src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="" />
   </div>
   <div className=" col-span-2 ">
     <div className="flex items-center">
     <h2 className="mr-3 font-semibold text-xl">Auto</h2>
     <FaUserAlt  className="text-base mr-1"/>
     <h3 className="text-base">3</h3>
     </div>
     <h3 className="text-neutral-500">4 min away</h3>
     <p className="text-neutral-600 text-sm tracking-tight ">Extra comfort</p> 
   </div>
     <div className="flex justify-end col-span-1">
     <h2>₹{fare.auto}</h2>
     </div>
      </div> 
      <div onClick={()=>{setconfirmRidePanel(true), setVehicleType("bike"), setVehiclePanel(false)}}  className="gap-6 p-2.5 cursor-pointer active:border-black border  border-black/30 rounded-xl   grid grid-cols-4">
   <div className="size-20 flex items-center justify-center  col-span-1">
     <img src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648177797/assets/fc/ddecaa-2eee-48fe-87f0-614aa7cee7d3/original/Uber_Moto_312x208_pixels_Mobile.png" alt="" />
   </div>
   <div className=" col-span-2 ">
     <div className="flex items-center">
     <h2 className="mr-3 font-semibold text-xl">Bike</h2>
     <FaUserAlt  className="text-base mr-1"/>
     <h3 className="text-base">2</h3>
     </div>
     <h3 className="text-neutral-500">5 min away</h3>
     <p className="text-neutral-600 text-sm tracking-tight ">Share your Ride</p> 
   </div>
     <div className="flex justify-end col-span-1">
     <h2>₹{fare.bike}</h2>
     </div>
      </div> 
  </div>

   
  )
}

export default VehiclePanel