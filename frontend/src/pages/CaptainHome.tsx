
  import RidePopup from "../components/RidePopup"
  import { useGSAP } from "@gsap/react"
  import gsap from "gsap";
  import { useContext, useEffect, useRef, useState } from "react"
  import CaptainDetails from "../components/CaptainDetails";
  import ConfirmRidePopup from "../components/ConfirmRidePopup";
  import { CaptainDataContext } from '../context/CaptainContext';
  import { SocketContext } from "../context/SocketContext";
import axios from "axios";
import { confirmRide } from '../../../backend/src/controllers/ride-controller';


  const CaptainHome = () => {

  const [ridePopupPanel, setridePopupPanel] = useState(false);
  const ridePopupPanelRef = useRef(null);
  const [confirmRidePanel, setconfirmRidePanel] = useState(false);
  const confirmRidePanelRef = useRef(null);
  const [ride, setride] = useState({
    _id: "",
    userId: {
      fullName: {
        firstName: "",
        lastName: ""
      }
    },
    pickup: "",
    destination: "",
    fare: 0,
  });
  

      const context = useContext(CaptainDataContext);
      const socketContext = useContext(SocketContext);
      
      if (!context) {
        return <div>Loading...</div>;
      }

const { captain } = context;
  
      if(!socketContext) {
        return <div>Loading...</div>
      } 
      const { socket } = socketContext;
  
      useEffect(()=>{
          socket.emit("join", {userType: "captain", userId: captain._id});
     },[captain])

      
     useEffect(() => {
      const updateLocation = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(position => {
            socket.emit("update-captain-location", {
              userId: captain._id,
              location: {
                ltd: position.coords.latitude,
                lng: position.coords.longitude
              }
            });
          });
        }
      };
    
      updateLocation(); // send once on mount
    
      const locationInterval = setInterval(updateLocation, 10000);
    
      return () => clearInterval(locationInterval); // cleanup on unmount
    }, [captain, socket]);
    
    socket.on("new-ride", (data) => {
      console.log("New ride request:", data);
      setride(data);
      setridePopupPanel(true);
      
    })

    const confirmRide = async ()=>{

      if (!ride?._id) {
        console.error("No rideId available for confirmation");
        return;
    }

    try {
        console.log("Sending confirm request with rideId:", ride._id);
        const response = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/ride/confirm`,
            { rideId: ride._id },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
        console.log("Confirm ride response:", response.data);
        setridePopupPanel(false);
        setconfirmRidePanel(true);
    } catch (error: any) {
        console.error("Confirm ride error:", error.response?.data || error.message);
    }
    } 
 





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
            <h3 className="xl text-neutral-700 pb-1">{captain.fullName.firstName} {captain.fullName.lastName}</h3>
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
          <RidePopup
            ride={ride}
            confirmRide={confirmRide}
           setridePopupPanel={setridePopupPanel}
           setconfirmRidePanel={setconfirmRidePanel}/>
        </div>
        <div ref={confirmRidePanelRef} className="popup-container">
          <ConfirmRidePopup
            ride={ride}
           setconfirmRidePanel={setconfirmRidePanel}
            setridePopupPanel={setridePopupPanel}/>
        </div>
      </div>
    )
  }

  export default CaptainHome;