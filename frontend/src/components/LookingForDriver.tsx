import { BsArrowDown } from 'react-icons/bs'
import AddressCard from './AddressCard'

type LookingForDriverProps = {
    pickup: string,
    destination: string,
    fare: string,
    img:string,
    setvehicleFound: React.Dispatch<React.SetStateAction<boolean>>,
    setwaitingForDriverPanel: React.Dispatch<React.SetStateAction<boolean>>
}
const LookingForDriver = ({...props}: LookingForDriverProps) => {
  return (
    <div className="flex rounded-xl flex-col gap-5">
        <h1><BsArrowDown onClick={()=>{props.setvehicleFound(false), props.setwaitingForDriverPanel(true)}}/></h1>
    <div className="w-full flex justify-center">
    <img className="size-40" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_552,w_552/v1555367310/assets/30/51e602-10bb-4e65-b122-e394d80a9c47/original/Final_UberX.png" alt="" />
    </div>
    <h1 className="text-xl font-semibold mb-5 text-center">Looking For Driver</h1>
    <div className="flex   flex-col  px-4">
        <AddressCard props={props.pickup}/>
        <AddressCard props={props.destination}/>
        <AddressCard props={props.fare}/>
    </div>
    
</div>
  )
}

export default LookingForDriver