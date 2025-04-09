
  import RidePopup from "../components/RidePopup"
  import { useGSAP } from "@gsap/react"
  import gsap from "gsap";
  import { useContext, useRef, useState } from "react"
  import CaptainDetails from "../components/CaptainDetails";
  import ConfirmRidePopup from "../components/ConfirmRidePopup";
  import { CaptainDataContext, Captain } from '../context/CaptainContext';

  const CaptainHome = () => {

  const [ridePopupPanel, setridePopupPanel] = useState(true);
  const ridePopupPanelRef = useRef(null);
  const [confirmRidePanel, setconfirmRidePanel] = useState(false);
  const confirmRidePanelRef = useRef(null);

  const context = useContext(CaptainDataContext);

  // Type narrowing: handle null
if (!context) {
  return <div>Loading...</div>;
}

const { captain } = context;

    useGSAP(()=>{
      if(ridePopupPanel){
        gsap.to(ridePopupPanelRef.current,{
            transform: "translateY(0%)",
          }
        )
      }else{
        gsap.to(ridePopupPanelRef.current,{
            transform: "translateY(100%)",
          }
        )
      }
      },[ridePopupPanel])

      useGSAP(()=>{
        if(confirmRidePanel){
          gsap.to(confirmRidePanelRef.current,{
            transform: "translateY(0%)",
          }
        )
      }else{
        gsap.to(confirmRidePanelRef.current,{
            transform: "translateY(100%)",
          }
        )
      }
    },[confirmRidePanel])
    return (
      <div className="h-screen w-full">
          <div className="h-[65%] w-full ">
              <img className="h-full w-full object-cover" src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
          </div>
        <div className="flex justify-between items-center p-5">
          <div className="flex items-center gap-2">
            <img className="size-10 rounded-full" src="https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fHww" alt="" />
            <h2 className="capitalize">{`${captain.fullName.firstName} ${captain.fullName.lastName}`}</h2>
          </div>
          <div>
            <h2>$295</h2>
            <p>Total Earnings</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-5 p-5 ">
          <CaptainDetails/>
        </div>
        <div ref={ridePopupPanelRef} className="popup-container">
          <RidePopup setridePopupPanel={setridePopupPanel} setconfirmRidePanel={setconfirmRidePanel}/>
        </div>
        <div ref={confirmRidePanelRef} className="popup-container">
          <ConfirmRidePopup setconfirmRidePanel={setconfirmRidePanel} setridePopupPanel={setridePopupPanel}/>
        </div>
      </div>
    )
  }

  export default CaptainHome