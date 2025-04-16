import { FaLocationDot, FaSquare } from "react-icons/fa6";
import { IoCashOutline } from "react-icons/io5";
import { RiLockPasswordLine } from "react-icons/ri";

type WaitingForDriverProps = {
    setWaitingForDriverPanel: React.Dispatch<React.SetStateAction<boolean>>;
    setVehicleFound: React.Dispatch<React.SetStateAction<boolean>>;
    ride: {
        captain?: {
            fullName: {
                firstName: string;
                lastName: string;
            };
            vehicle: {
                plate: string;
                color: string;
                capacity: number;
                vehicleType: string;
            };
        };
        pickup: string;
        destination: string;
        fare: number;
        otp?: string;
    };
};

const WaitingForDriver = ({ ride, setWaitingForDriverPanel, setVehicleFound }: WaitingForDriverProps) => {
    return (
        <div className="flex rounded-xl flex-col gap-5">
            <div>
                <h1 className="text-xl font-semibold mb-5 text-left ml-6">Waiting For Driver</h1>
                <div className="grid grid-cols-2 px-5">
                    <div className="w-full flex">
                        <img
                            className="size-35"
                            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_552,w_552/v1555367310/assets/30/51e602-10bb-4e65-b122-e394d80a9c47/original/Final_UberX.png"
                            alt=""
                        />
                    </div>
                    <div className="flex-col items-end p-2.5 flex">
                        <h3 className="text-neutral-600">
                            {ride.captain?.fullName.firstName || "Unknown Driver"}
                        </h3>
                        <h2 className="text-2xl font-bold">{ride.captain?.vehicle.plate || "N/A"}</h2>
                        <p className="text-neutral-600 text-sm">
                            {ride.captain?.vehicle.vehicleType || "Unknown Vehicle"}
                        </p>
                        <p className="text-sm">4.9</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col px-4">
                <div className="flex border-b border-neutral-500 py-5 items-center gap-2">
                    <div className="size-10 rounded-full bg-neutral-100 flex items-center justify-center text-black">
                        <FaLocationDot />
                    </div>
                    <div>
                        <h3 className="text-neutral-600/90">Pickup</h3>
                        <p className="text-xl font-semibold text-black/80">{ride.pickup || "N/A"}</p>
                    </div>
                </div>
                <div className="flex border-b border-neutral-500 py-5 items-center gap-2">
                    <div className="size-10 rounded-full bg-neutral-100 flex items-center justify-center text-black">
                        <FaSquare />
                    </div>
                    <div>
                        <h3 className="text-neutral-600/90">Destination</h3>
                        <p className="text-xl font-semibold text-black/80">
                            {ride.destination || "N/A"}
                        </p>
                    </div>
                </div>
                <div className="flex border-b border-neutral-500 py-5 items-center gap-2">
                    <div className="size-10 rounded-full bg-neutral-100 flex items-center justify-center text-black">
                        <IoCashOutline />
                    </div>
                    <div>
                        <h3 className="text-neutral-600/90">Fare</h3>
                        <p className="text-xl font-semibold text-black/80">₹{ride.fare || 0}</p>
                    </div>
                </div>
                <div className="flex border-b border-neutral-500 py-5 items-center gap-2">
                    <div className="size-10 rounded-full bg-neutral-100 flex items-center justify-center text-black">
                        <RiLockPasswordLine />
                    </div>
                    <div>
                        <h3 className="text-neutral-600/90">OTP</h3>
                        <p className="text-xl font-semibold text-black/80">{ride.otp || "N/A"}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WaitingForDriver;