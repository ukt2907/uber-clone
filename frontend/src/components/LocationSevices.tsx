import { FaLocationDot } from "react-icons/fa6"

type LocationSevicesProps = {
    name: string,
    address: string,
    setVehiclePanel: React.Dispatch<React.SetStateAction<boolean>>
    setpanelOpen: React.Dispatch<React.SetStateAction<boolean>>

}
const LocationSevices = ({name, address, setVehiclePanel, setpanelOpen}:LocationSevicesProps) => {
  return (
    <div onClick={()=>{setVehiclePanel(true), setpanelOpen(false)}} className="p-5 rounded-xl active:border-black border border-black/30  flex gap-5 items-center ">
        <div className="size-10 rounded-full bg-neutral-300 text-black flex items-center justify-center">
          <FaLocationDot />
        </div>
        <div>
        <h2 className="text-xl font-semibold">{name}</h2>
        <p className="text-neutral-600/90">{address}</p>
        </div>
        
    </div>
  )
}

export default LocationSevices