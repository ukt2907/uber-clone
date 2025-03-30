import Button from "./Button"
import AddressCard from "./AddressCard"
import { icons } from "../lib/icons"

type ConfirmRideProps = {
    pickup: string,
    destination: string,
    fare: string,
    img:string,
    setvehicleFound: React.Dispatch<React.SetStateAction<boolean>>
    setconfirmRidePanel: React.Dispatch<React.SetStateAction<boolean>>
}
const ConfirmRide = ({...props}: ConfirmRideProps) => {
  return (
    <div className="flex rounded-xl flex-col gap-5">
        <div className="w-full flex justify-center">
        <img className="size-40" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_552,w_552/v1555367310/assets/30/51e602-10bb-4e65-b122-e394d80a9c47/original/Final_UberX.png" alt="" />
        </div>
        <h1 className="text-xl font-semibold mb-5 text-center">Confirm Ride</h1>
        <div className="flex   flex-col  px-4">
            <AddressCard icon={icons[0].icon} name={icons[0].name}/>
            <AddressCard icon={icons[1].icon} name={icons[1].name}/>
            <AddressCard icon={icons[2].icon} name={icons[2].name}/>
            <Button
            classname="bg-green-600 text-white"
             onclick={() => { props.setconfirmRidePanel(false), props.setvehicleFound(true) }}
             name="Confirm"/>
        </div>
        
    </div>
  )
}

export default ConfirmRide;