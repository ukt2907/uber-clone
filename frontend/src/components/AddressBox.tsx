import { FaLocationDot } from "react-icons/fa6"

type LocationSevicesProps = {
    address: string

}   

const AddressBox = ({ address}:LocationSevicesProps) => {
  return (
    <div className="p-5   active:border-black rounded-2xl border border-black/30  grid grid-cols-5 items-center ">
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