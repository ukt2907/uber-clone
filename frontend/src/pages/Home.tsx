import {  useRef, useState } from "react";
import Input from "../components/Input"
import {useGSAP} from "@gsap/react"
import { IoIosArrowDown } from "react-icons/io";
import gsap from "gsap";
import VehicleCard from "../components/VehicleCard";
import { vehicleData } from "../lib/constants";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from '../components/WaitingForDriver';
import Button from "../components/Button";
import AddressBox from "../components/AddressBox";
import { useFetchSuggestion } from "../hooks/useFetchSuggestion";
import { useRecoilState, useRecoilValue } from "recoil";
import { confirmRidePanelAtom, destinationSearchAtom, destinationSuggestionsAtom, panelOpenAtom, pickupSearchAtom, pickupSuggestionsAtom, vehicleFoundAtom, vehiclePanelAtom, waitingForDriverPanelAtom } from "../atoms/store/userAtoms";

const Home = () => {

  const [panelOpen, setPanelOpen] = useRecoilState(panelOpenAtom);
  const [vehiclePanel, setVehiclePanel] = useRecoilState(vehiclePanelAtom);
  const [confirmRidePanel, setConfirmRidePanel] = useRecoilState(confirmRidePanelAtom);
  const [waitingForDriverPanel, setWaitingForDriverPanel] = useRecoilState(waitingForDriverPanelAtom);
  const [vehicleFound, setVehicleFound] = useRecoilState(vehicleFoundAtom);
  
  const pickupSearch = useRecoilValue(pickupSearchAtom);
  const destinationSearch = useRecoilValue(destinationSearchAtom);
  const pickupSuggestions = useRecoilValue(pickupSuggestionsAtom);
  const destinationSuggestions = useRecoilValue(destinationSuggestionsAtom); 

  const [activeField, setactiveField] = useState<"pickup" | "destination" | null>(null);
  const { setpickupSearch, setdestinationSearch } = useFetchSuggestion();

  const vehicleRef = useRef(null);
  const panelRef = useRef(null);
  const confirmRef = useRef(null);
  const waitingForDriverRef = useRef(null);
  const vehicleFoundRef = useRef(null);

  const submitHandler = (e:React.FormEvent<HTMLFormElement>) => {
    
    e.preventDefault();
    setVehiclePanel(true);
    setPanelOpen(false);
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
    <div className="h-screen  overflow-hidden font-[gilroy] relative ">
        <h1 className="absolute inset-5 text-2xl font-semibold">Uber</h1>
        <div className="h-screen w-screen">
            <img className="h-full w-full  object-cover" src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
        </div>
        <div className="absolute flex flex-col justify-end h-screen top-0 w-full">
        <div className="h-[40%]  rounded-t-2xl p-5 py-8  bg-white ">
            <div className="flex justify-between">
            <h2 className="text-3xl">Find a trip</h2>
            {panelOpen && <IoIosArrowDown
             className="text-4xl"
             onClick={() => setPanelOpen(!panelOpen)} />}
            </div>
            <form
            onSubmit={submitHandler} 
            className="flex flex-col gap-4 mt-10" action="">
                <Input
                type="text"
                onFocus={() => setactiveField("pickup")}
                onClick={() => setPanelOpen(true)}
                value={pickupSearch}
                onChange={(e)=> setpickupSearch(e.target.value)}
                placeholder="Add a pickup location"
                className="px-5 py-4 text-xl"
                />
                <Input
                type="text"
                onFocus={() => setactiveField("destination")}
                onClick={() => setPanelOpen(true)}
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
        <div ref={panelRef} className="scrollbar-hidden flex flex-col gap-3 overflow-y-auto px-5  bg-white pt-5 h-0 w-full ">

              {activeField === "pickup" && 
                pickupSuggestions.map((pickup, i)=>(
                  <AddressBox
                  key={i}
                  address={pickup.description}
                   />
                ))
              }

              {activeField === "destination" && 
                destinationSuggestions.map((destination, i)=>(
                  <AddressBox
                  key={i}
                  address={destination.description}
                   />
                ))
              }
              
        </div>
        </div>
        <div ref={vehicleRef} className="popup-container p-5 py-7">
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
            setvehiclePanel={setVehiclePanel}
            setconfirmRidePanel={setConfirmRidePanel}
            />
          ))}
        </div>
        <div ref={confirmRef}  className="popup-container">
          <ConfirmRide
           destination=""
           fare=""
           img=""
           pickup=""
           setvehicleFound= {setVehicleFound}
           setconfirmRidePanel={setConfirmRidePanel}
            />
        </div>
        <div ref={vehicleFoundRef} className="popup-container">
          <LookingForDriver
           destination=""
           fare=""
           img=""
           pickup=""
           setwaitingForDriverPanel= {setWaitingForDriverPanel}
           setvehicleFound= {setVehicleFound}
            />
        </div>
        <div ref={waitingForDriverRef} className="popup-container">
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