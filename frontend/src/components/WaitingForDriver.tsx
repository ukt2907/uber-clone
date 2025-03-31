import { icons } from '../lib/icons';
import AddressCard from './AddressCard'

type WaitingForDriverProps = {
    pickup: string,
    destination: string,
    fare: string,
    img:string,
}
const WaitingForDriver = ({...props}: WaitingForDriverProps) => {
  return (
    <div className="flex rounded-xl flex-col gap-5">
      
    <div>
    <h1 className="text-xl font-semibold mb-5 text-left ml-6">Waiting For Driver</h1>
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

    </div>
    <div className="flex   flex-col  px-4">
        <AddressCard icon={icons[0].icon} name={icons[0].name}/>
        <AddressCard icon={icons[1].icon} name={icons[1].name}/>
        <AddressCard icon={icons[2].icon} name={icons[2].name}/>
        
    </div>
    
</div>
  )
}

export default WaitingForDriver;