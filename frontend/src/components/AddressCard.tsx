import { FaLocationDot } from "react-icons/fa6"

const AddressCard = ({props}:{props:string}) => {
  return (
     <div className="flex border-b border-neutral-500  py-5    items-center gap-2">
         <div className="size-10 rounded-full bg-neutral-100 flex items-center justify-center text-black"><FaLocationDot /></div>
         <div>
             <p className="text-xl-600/90">{props}</p>
         </div>
     </div>
  )
}

export default AddressCard