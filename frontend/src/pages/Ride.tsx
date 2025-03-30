import { FaLocationDot } from "react-icons/fa6";
import AddressCard from "../components/AddressCard";
import { IoCashOutline } from "react-icons/io5";
import Button from "../components/Button";



const Ride = () => {
  return (
    <div className="h-screen w-full">
        <div className="h-1/2 w-full ">
            <img className="h-full w-full object-cover" src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
        </div>
        <div className='grid grid-cols-2 px-5'>
    <div className="w-full flex  ">
      <img className="size-35" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_552,w_552/v1555367310/assets/30/51e602-10bb-4e65-b122-e394d80a9c47/original/Final_UberX.png" alt="" />
    </div>
    <div className='flex-col items-end p-2.5 flex '>
        <h3 className='text-neutral-600'>UMESH</h3>
        <h2 className='text-2xl font-bold'>KA-1234</h2>
        <p className='text-neutral-600 text-sm'>Maruti Suzuki Alto-800</p>
        <p className='text-sm'>4.9</p>
    </div>
    </div>
    <div className="flex   flex-col  px-4">
     <div className="flex border-b border-neutral-500  py-5    items-center gap-2">
         <div className="size-10 rounded-full bg-neutral-100 flex items-center justify-center text-black"><FaLocationDot /></div>
         <div>
            <p className="text-xl text-neutral-600/90">Destination</p>
         </div>
     </div>
     <div className="flex border-b border-neutral-500  py-5    items-center gap-2">
         <div className="size-10 rounded-full bg-neutral-100 flex items-center justify-center text-black"><IoCashOutline /></div>
         <div>
            <p className="text-xl text-neutral-600/90">Cash</p>
         </div>
     </div>
    <Button 
    name="Make Payment"
    classname="bg-green-600 text-white"/>  
    </div>
    </div>
  )
}

export default Ride;