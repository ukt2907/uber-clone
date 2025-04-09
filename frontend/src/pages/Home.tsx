import {  useContext, useEffect, useRef, useState } from "react";
import Input from "../components/Input"
import {useGSAP} from "@gsap/react"
import { IoIosArrowDown } from "react-icons/io";
import gsap from "gsap";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from '../components/WaitingForDriver';
import Button from "../components/Button";
import AddressBox from "../components/AddressBox";
import { useRecoilState, useRecoilValue } from "recoil";
import { panelOpenAtom, vehiclePanelAtom, confirmRidePanelAtom, waitingForDriverPanelAtom, vehicleFoundAtom } from "../atoms/store/panelAtoms";
import {  destinationSearchAtom, destinationSuggestionsAtom, pickupSearchAtom, pickupSuggestionsAtom,  } from "../atoms/store/locationAtoms";
import { useFetchSuggestion } from "../hooks/useFetchSuggestion";
import axios from "axios";
import VehiclePanel from "../components/VehiclePanel";
import { UserDataContext } from "../context/UserContext";
import { SocketContext } from '../context/SocketContext';

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
  interface Fare {
    auto: number;
    car: number;
    bike: number;
  }
  
  const [fare, setFare] = useState<Fare>({ auto: 0, car: 0, bike: 0 });
  const [ vehicleType, setVehicleType ] = useState<"auto" | "car" | "bike" | "">("");

  const {setpickupSearch, setdestinationSearch} = useFetchSuggestion();
  const [activeField, setactiveField] = useState<"pickup" | "destination" | null>(null);

  const vehicleRef = useRef(null);
  const panelRef = useRef(null);
  const confirmRef = useRef(null);
  const waitingForDriverRef = useRef(null);
  const vehicleFoundRef = useRef(null);

    const userContext = useContext(UserDataContext);
    const socketContext = useContext(SocketContext);
    if(!userContext) {
      return <div>Loading...</div>
    }

    if(!socketContext) {
      return <div>Loading...</div>
    } 
    const { user } = userContext; 
    const { socket } = socketContext;

    useEffect(()=>{
        socket.emit("join", {userType: "user", userId: user._id});
   },[user])

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

  const findTrip = async () => {

    setVehiclePanel(true);
    setPanelOpen(false);
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/ride/fare?pickup=${pickupSearch}&destination=${destinationSearch}`,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    setFare(response.data.fare);
    
  }

  const createRide = async (data:{pickup:string; destination:string; vehicleType:"auto" | "car" | "bike"}) => {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/ride/create`,{
      ...data
    },{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    console.log(response.data);
    setConfirmRidePanel(false);
    setVehicleFound(true);
  }


  return (
    <div className="h-screen  overflow-hidden font-[gilroy] relative ">
        <h1 className="absolute inset-5 text-2xl font-semibold">Uber</h1>
        <div className="h-screen w-screen">
            <img className="h-full w-full  object-cover" src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
        </div>
        <div className="absolute flex flex-col justify-end h-screen top-0 w-full">
        <div className="h-[40%]  rounded-t-2xl p-5 py-8  bg-white ">
            <h3 className="xl text-neutral-700 pb-1"><span className="text-4xl">👋</span>{user.fullName.firstName} {user.fullName.lastName}</h3>
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
                onclick={findTrip}
                name="Find Trip"
                type="submit"
                classname="bg-green-600"
                />
            </form>
        </div>
        <div ref={panelRef} className="scrollbar-hidden flex flex-col gap-3 overflow-y-auto px-5  bg-white pt-5 h-0 w-full ">

              <AddressBox
              suggestions={activeField === "pickup" ? pickupSuggestions : destinationSuggestions}
              activeField={activeField}
              setpickupSearch={setpickupSearch}
              setdestinationSearch={setdestinationSearch}
              />
        </div>
        </div>
        <div ref={vehicleRef} className="popup-container p-5 py-7">
          <h1 className="text-xl font-semibold mb-5">Choose you Vehicle</h1>
            <VehiclePanel
            setVehicleType={setVehicleType}
            fare={fare}
            setconfirmRidePanel={setConfirmRidePanel}
            />
        </div>
        <div ref={confirmRef}  className="popup-container">
          <ConfirmRide
           destination={destinationSearch}
           fare={{ auto: fare.auto, car: fare.car, bike: fare.bike }}
           pickup={pickupSearch}
           createRide={createRide}
           vehicleType={vehicleType!}
            />
        </div>
        <div ref={vehicleFoundRef} className="popup-container">
          <LookingForDriver
           setVehicleFound={setVehicleFound}
           destination={destinationSearch}
           fare={{ auto: fare.auto, car: fare.car, bike: fare.bike }}
           pickup={pickupSearch}
           vehicleType={vehicleType}
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