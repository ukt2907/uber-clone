
import { FaLocationDot } from 'react-icons/fa6';
import Button from './Button';
import { FaSquare } from 'react-icons/fa';
import { IoCashOutline } from 'react-icons/io5';

type LookingForDriverProps = {
    pickup: string,
    destination: string,
    setVehicleFound: React.Dispatch<React.SetStateAction<boolean>>,
    fare: number,
}
const LookingForDriver = ({...props}: LookingForDriverProps) => {
  return (
    <div className="flex rounded-xl flex-col gap-5">
    <div className="w-full flex justify-center">
    <img className="size-40" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_552,w_552/v1555367310/assets/30/51e602-10bb-4e65-b122-e394d80a9c47/original/Final_UberX.png" alt="" />
    </div>
    <h1 className="text-xl font-semibold mb-5 text-center">Looking For Driver</h1>
        <div className="flex   flex-col  px-4">
        <div className="flex border-b border-neutral-500  py-5    items-center gap-2">
         <div className="size-10 rounded-full bg-neutral-100 flex items-center justify-center text-black"><FaLocationDot /></div>
         <div>
             <p className="text-xl text-neutral-600/90">{props.pickup}</p>
         </div>
        </div>
        <div className="flex border-b border-neutral-500  py-5    items-center gap-2">
         <div className="size-10 rounded-full bg-neutral-100 flex items-center justify-center text-black"><FaSquare /></div>
         <div>
             <p className="text-xl text-neutral-600/90">{props.destination}</p>
         </div>
        </div>
        <div className="flex border-b border-neutral-500  py-5    items-center gap-2">
         <div className="size-10 rounded-full bg-neutral-100 flex items-center justify-center text-black"><IoCashOutline /></div>
         <div>
             <p className="text-xl text-neutral-600/90">{props.fare}</p>
         </div>
        </div>
            <Button
            classname="bg-green-600 text-white"
             onclick={() => {  props.setVehicleFound(false)}}
             name="Confirm"/>
        </div>
    
</div>
  )
}

export default LookingForDriver