import { FaUserAlt } from 'react-icons/fa'

type VehicleCardProps = {
  name: string,
  capacity: number,
  time: string,
  description: string,
  price: string,
  image: string,
  setconfirmRidePanel: React.Dispatch<React.SetStateAction<boolean>>
  setvehiclePanel: React.Dispatch<React.SetStateAction<boolean>>
}

const VehicleCard = ({...props}: VehicleCardProps) => {
  return (
 <div onClick={()=>{props.setconfirmRidePanel(true), props.setvehiclePanel(false)}} className="gap-6 active:border-black border  border-black/30 rounded-xl p-2.5  grid grid-cols-4">
   <div className="size-20 flex items-center justify-center  col-span-1">
     <img  src={props.image} alt="" />
   </div>
   <div className=" col-span-2 ">
     <div className="flex items-center">
     <h2 className="mr-3 font-semibold text-xl">{props.name}</h2>
     <FaUserAlt  className="text-base mr-1"/>
     <h3 className="text-base">{props.capacity}</h3>
     </div>
     <h3 className="text-neutral-500">{props.time} away</h3>
     <p className="text-neutral-600 text-sm tracking-tight ">{props.description}</p> 
   </div>
     <div className="flex justify-end col-span-1">
     <h2>{props.price}</h2>
     </div>
   </div> 
  )
}

export default VehicleCard