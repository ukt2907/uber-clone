import { IoIosArrowUp } from "react-icons/io"
import Button from "../components/Button"
import { useRef, useState } from "react"
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import FinishRide from "../components/FinishRide";


const CaptainRiding = () => {
    const [finishRidePanel, setfinishRidePanel] = useState(false);
    const finishRidePanelRef = useRef<HTMLDivElement>(null);
    useGSAP(()=>{
        if(finishRidePanel){
            gsap.to(finishRidePanelRef.current,{
                transform: "translateY(0%)",
            })
        }else{
            gsap.to(finishRidePanelRef.current,{
                transform: "translateY(100%)",
            })
        }
    },[finishRidePanel])
  return (
    <div className="h-screen w-full">
        <div className="h-[85%] w-full ">
            <img src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="captainRiding" className="w-full h-full object-cover" />
        </div>
        <div className="h-[15%] w-full bg-white p-5">
            <div className="flex-center">
               <IoIosArrowUp onClick={()=>setfinishRidePanel(true)} className="text-2xl " />
            </div>
            <div className="flex items-center justify-between">
                <h2>4 Km away</h2>
                <Button
                classname="bg-green-600 text-white"
                name="Finish Ride"/>
            </div>
        </div>
        <div ref={finishRidePanelRef} className="popup-container">
            <FinishRide/>
        </div>
    </div>
  )
}

export default CaptainRiding