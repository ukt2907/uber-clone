import { FaCreditCard, FaLocationDot } from "react-icons/fa6"

type ConfirmRideProps = {
    name: string,
    address: string,
    price: string
}
const ConfirmRide = ({name, address, price}: ConfirmRideProps) => {
  return (
    <div>
        <img src="" alt="" />
        <h1 className="text-xl font-semibold mb-5 text-center">Confirm Ride</h1>
        <div className="flex   flex-col gap-5">
            <div className="flex py-5  items-center gap-2">
                <div className="size-10 rounded-full bg-neutral-100 flex items-center justify-center text-black"><FaLocationDot /></div>
                <div>
                    <h2 className="text-xl font-semibold">{name}</h2>
                    <p className="text-neutral-600/90">{address}</p>
                </div>
            </div>
            <div className="flex border-y   items-center gap-2">
                <div className="size-10 rounded-full bg-neutral-100 flex items-center justify-center text-black">
                <FaCreditCard />
                </div>
                <div>
                    <h2 className="text-xl font-semibold">{price}</h2>
                    <p className="text-neutral-600/90">Cash</p>
                </div>
    </div>
        </div>
    </div>
  )
}

export default ConfirmRide;