import { useRef, useState } from "react";
import Input from "../components/Input"
import {useGSAP} from "@gsap/react"
import { IoIosArrowDown } from "react-icons/io";
import gsap from "gsap";
import LocationSevices from "../components/LocationSevices";
import VehicleCard from "../components/VehicleCard";
import { locations, vehicleData } from "../lib/constants";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from '../components/WaitingForDriver';

const Home = () => {

  const [pickup, setpickup] = useState("");
  const [destination, setdestination] = useState("");
  const [panelOpen, setpanelOpen] = useState(false);
  const [vehiclePanel, setvehiclePanel] = useState(false);
  const [confirmRidePanel, setconfirmRidePanel] = useState(false);
  const [waitingForDriverPanel, setwaitingForDriverPanel] = useState(false);
  const [vehicleFound, setvehicleFound] = useState(false)

  const vehicleRef = useRef(null);
  const panelRef = useRef(null);
  const confirmRef = useRef(null);
  const waitingForDriverRef = useRef(null);
  const vehicleFoundRef = useRef(null);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

  }
useGSAP(()=>{
  if(panelOpen){
    gsap.to(panelRef.current,{
        height: "70%"
      }
    )
  }else{
    gsap.to(panelRef.current,{
        height: "0%"
      }
    )
  }
},[panelOpen])

useGSAP(()=>{
  if(vehiclePanel){
    gsap.to(vehicleRef.current,{
        transform: "translateY(0%)",
      }
    )
  }else{
    gsap.to(vehicleRef.current,{
        transform: "translateY(100%)",
      }
    )
  }
},[vehiclePanel])

useGSAP(()=>{
  if(confirmRidePanel){
    gsap.to(confirmRef.current,{
        transform: "translateY(0%)",
      }
    )
  }else{
    gsap.to(confirmRef.current,{
        transform: "translateY(100%)",     }
    )
  }
},[confirmRidePanel])



useGSAP(()=>{
  if(waitingForDriverPanel){
    gsap.to(waitingForDriverRef.current,{
        transform: "translateY(0%)",
      }
    )
  }else{
    gsap.to(waitingForDriverRef.current,{
        transform: "translateY(100%)",
      }
    )
  }
},[waitingForDriverPanel])

useGSAP(()=>{
  if(vehicleFound){
    gsap.to(vehicleFoundRef.current,{
        transform: "translateY(0%)",
      }
    )
  }else{
    gsap.to(vehicleFoundRef.current,{
        transform: "translateY(100%)",
      }
    )
  }
},[vehicleFound])

  return (
    <div className="h-screen overflow-hidden font-[gilroy] relative ">
        <h1 className="absolute inset-5 text-2xl font-semibold">Uber</h1>
        <div className="h-screen w-screen">
            <img className="h-full w-full  object-cover" src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
        </div>
        <div className="absolute flex flex-col justify-end h-screen top-0 w-full">
        <div className="h-[30%]  rounded-2xl p-5 py-8  bg-white ">
            <div className="flex justify-between">
            <h2 className="text-3xl">Find a trip</h2>
            {panelOpen && <IoIosArrowDown
             className="text-4xl"
             onClick={() => setpanelOpen(!panelOpen)} />}
            </div>
            <form
            onSubmit={submitHandler} 
            className="flex flex-col gap-4 mt-10" action="">
                <Input
                type="text"
                onClick={() => setpanelOpen(true)}
                value={pickup}
                onChange={(e) => setpickup(e.target.value)}
                placeholder="Add a pickup location"
                className="px-5 py-4 text-xl"
                />
                <Input
                type="text"
                onClick={() => setpanelOpen(true)}
                value={destination}
                onChange={(e) => setdestination(e.target.value)}
                placeholder="Add a destination"
                className="px-5 py-4 text-xl"
                />
            </form>
        </div>
        <div ref={panelRef} className="p-5 flex flex-col gap-3 bg-white h-0 w-full ">
              {locations.map((location, i)=>(
                <LocationSevices 
                key={i}
                name={location.name}
                address={location.address}
                setpanelOpen={setpanelOpen}
                setVehiclePanel={setvehiclePanel}
                 />
              ))} 
        </div>
        </div>
        <div ref={vehicleRef} className="fixed p-6 translate-y-full rounded-xl  flex flex-col gap-4 z-10 w-full bg-white  bottom-0 ">
          <h1 className="text-xl font-semibold mb-5">Choose you Vehicle</h1>
          {vehicleData.map((vehicle, i)=>(
            <VehicleCard
            key={i}
            name={vehicle.name}
            capacity={vehicle.capacity}
            time={vehicle.time}
            description={vehicle.description}
            price={vehicle.price}
            image={vehicle.image}
            setvehiclePanel={setvehiclePanel}
            setconfirmRidePanel={setconfirmRidePanel}
            />
          ))}
        </div>
        <div ref={confirmRef}  className="popup-container ">
          <ConfirmRide
           destination=""
           fare=""
           img=""
           pickup=""
           setvehicleFound= {setvehicleFound}
           setconfirmRidePanel={setconfirmRidePanel}
            />
        </div>
        <div ref={vehicleFoundRef} className="fixed  py-6 translate-y-full    rounded-xl  flex flex-col gap-4 z-10 w-full bg-white  bottom-0 ">
          <LookingForDriver
           destination=""
           fare=""
           img=""
           pickup=""
           setwaitingForDriverPanel= {setwaitingForDriverPanel}
           setvehicleFound= {setvehicleFound}
            />
        </div>
        <div ref={waitingForDriverRef} className="fixed py-6  translate-y-full rounded-xl   flex flex-col gap-4 z-10 w-full bg-white  bottom-0 ">
          <WaitingForDriver
           destination=""
           fare=""
           img=""
           pickup=""
            />
        </div>
    </div>
  )
}

export default Home