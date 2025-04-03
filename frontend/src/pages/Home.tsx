import {  useEffect, useRef, useState } from "react";
import Input from "../components/Input"
import {useGSAP} from "@gsap/react"
import { IoIosArrowDown } from "react-icons/io";
import gsap from "gsap";
import VehicleCard from "../components/VehicleCard";
import { vehicleData } from "../lib/constants";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from '../components/WaitingForDriver';
import axios from "axios";
import Button from "../components/Button";
import AddressBox from "../components/LocationSevices";

const Home = () => {

  const [pickupSearch, setpickupSearch] = useState("");
  const [destinationSearch, setdestinationSearch] = useState("");
  const [panelOpen, setpanelOpen] = useState(false);
  const [vehiclePanel, setvehiclePanel] = useState(false);
  const [confirmRidePanel, setconfirmRidePanel] = useState(false);
  const [waitingForDriverPanel, setwaitingForDriverPanel] = useState(false);
  const [vehicleFound, setvehicleFound] = useState(false);
  const [pickupSuggestions, setpickupSuggestions] = useState<{description:string}[]>([]);
  const [destinationSuggestions, setdestinationSuggestions] = useState<{description:string}[]>([]);
  const [activeField, setactiveField] = useState<"pickup" | "destination" | null>(null);


  const vehicleRef = useRef(null);
  const panelRef = useRef(null);
  const confirmRef = useRef(null);
  const waitingForDriverRef = useRef(null);
  const vehicleFoundRef = useRef(null);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

  }

  

  useEffect(()=>{
    if(!pickupSearch.trim()) return;

    const timer = setTimeout(() => 
    fetchPickupSuggestions(pickupSearch),500)

    return ()=>clearTimeout(timer);
  },[pickupSearch]);

  useEffect(()=>{
    if(!destinationSearch.trim()) return;

    const timer = setTimeout(()=> fetchDestinationSuggestions(destinationSearch),500)

    return ()=>clearTimeout(timer);
  },[destinationSearch])

  const fetchPickupSuggestions = async (query:string)=>{
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/map/get-suggestions?input=${query}`,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response.data);
      setpickupSuggestions(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const fetchDestinationSuggestions = async (query:string)=>{
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/map/get-suggestions?input=${query}`,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setdestinationSuggestions(response.data);
    } catch (error) {
      console.log(error);
    }
  }




useGSAP(()=>{
  if(panelOpen){
    gsap.to(panelRef.current,{
        height: "100%"
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
        <div className="h-[40%]  rounded-2xl p-5 py-8  bg-white ">
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
                onFocus={() => setactiveField("pickup")}
                onClick={() => setpanelOpen(true)}
                value={pickupSearch}
                onChange={(e)=> setpickupSearch(e.target.value)}
                placeholder="Add a pickup location"
                className="px-5 py-4 text-xl"
                />
                <Input
                type="text"
                onFocus={() => setactiveField("destination")}
                onClick={() => setpanelOpen(true)}
                value={destinationSearch}
                onChange={(e)=> setdestinationSearch(e.target.value)}
                placeholder="Add a destination"
                className="px-5 py-4 text-xl"
                />
                <Button
                name="Find Trip"
                type="submit"
                classname="bg-green-600"
                />
            </form>
        </div>
        <div ref={panelRef} className=" flex flex-col gap-3 bg-red-300 h-0 w-full ">

              {activeField === "pickup" && 
                pickupSuggestions.map((pickup, i)=>(
                  <AddressBox
                  key={i}
                  address={pickup.description}
                  setpanelOpen={setpanelOpen}
                  setVehiclePanel={setvehiclePanel}
                   />
                ))
              }

              {activeField === "destination" && 
                destinationSuggestions.map((destination, i)=>(
                  <AddressBox
                  key={i}
                  address={destination.description}
                  setpanelOpen={setpanelOpen}
                  setVehiclePanel={setvehiclePanel}
                   />
                ))
              }
              
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