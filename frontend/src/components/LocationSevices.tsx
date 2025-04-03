import { FaLocationDot } from "react-icons/fa6"

type LocationSevicesProps = {
    address: string,
    setVehiclePanel: React.Dispatch<React.SetStateAction<boolean>>
    setpanelOpen: React.Dispatch<React.SetStateAction<boolean>>

}   

const AddressBox = ({ address, setVehiclePanel, setpanelOpen}:LocationSevicesProps) => {
  return (
    <div onClick={()=>{setVehiclePanel(true), setpanelOpen(false)}} className="p-5 rounded-xl active:border-black border border-black/30  grid grid-cols-5 items-center ">
        <div className="size-10 col-span-1 rounded-full bg-neutral-300 text-black flex items-center justify-center">
          <FaLocationDot />
        </div>
        <div className="col-span-4">
        <h4>{address}</h4>
        </div>
        
    </div>
  )
}

export default AddressBox;