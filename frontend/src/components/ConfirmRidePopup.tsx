import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import Input from "./Input";
import { useState } from "react";
import { IoCashOutline } from "react-icons/io5";
import { FaLocationDot, FaSquare } from "react-icons/fa6";
import axios from "axios";

interface ConfirmRideProps {
    setconfirmRidePanel: React.Dispatch<React.SetStateAction<boolean>>;
    setridePopupPanel: React.Dispatch<React.SetStateAction<boolean>>;
    ride: {
        userId: {
            fullName: {
                firstName: string;
                lastName: string;
            };
        };
        pickup: string;
        destination: string;
        fare: number;
        _id: string;
    };
}

const ConfirmRidePopup = (props: ConfirmRideProps) => {
    const [otp, setotp] = useState("");
    const navigate = useNavigate();

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!props.ride._id || !otp) {
            console.error("Missing rideId or OTP:", { rideId: props.ride._id, otp });
            return;
        }

        try {
            console.log("Starting ride with OTP:", typeof otp, "and rideId:",typeof props.ride._id);
            const response = await axios.get(
                `${import.meta.env.VITE_BASE_URL}/ride/start-ride`,
                {
                    params: {
                        rideId: props.ride._id,
                        otp: otp,
                    },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            if (response.status === 201) {
                props.setconfirmRidePanel(false);
                props.setridePopupPanel(false);
                navigate("/captain-riding", {state: {ride: props.ride}});
            }

        } catch (error: any) {
            console.error("Start ride error:", error.response?.data || error.message);
        }
    };

    return (
        <div className="flex rounded-xl flex-col gap-5 px-4">
            <h1 className="text-xl font-semibold mb-3">Confirm your Ride</h1>
            <div className="flex bg-yellow-400 rounded-xl items-center justify-between p-4">
                <div className="flex items-center gap-2">
                    <img
                        className="size-15 rounded-full"
                        src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600"
                        alt=""
                    />
                    <h2>
                        {props.ride.userId.fullName.firstName} {props.ride.userId.fullName.lastName}
                    </h2>
                </div>
                <h3>10.2 km</h3>
            </div>
            <div className="flex flex-col">
                <div className="flex border-b border-neutral-500 py-5 items-center gap-2">
                    <div className="size-10 rounded-full bg-neutral-100 flex items-center justify-center text-black">
                        <FaLocationDot />
                    </div>
                    <div>
                        <p className="text-xl text-neutral-600/90">{props.ride.pickup}</p>
                    </div>
                </div>
                <div className="flex border-b border-neutral-500 py-5 items-center gap-2">
                    <div className="size-10 rounded-full bg-neutral-100 flex items-center justify-center text-black">
                        <FaSquare />
                    </div>
                    <div>
                        <p className="text-xl text-neutral-600/90">{props.ride.destination}</p>
                    </div>
                </div>
                <div className="flex border-b border-neutral-500 py-5 items-center gap-2">
                    <div className="size-10 rounded-full bg-neutral-100 flex items-center justify-center text-black">
                        <IoCashOutline />
                    </div>
                    <div>
                        <p className="text-xl text-neutral-600/90">{props.ride.fare}</p>
                    </div>
                </div>
                <form onSubmit={submitHandler} className="mt-3" action="">
                    <Input
                        onChange={(e) => setotp(e.target.value)}
                        value={otp}
                        className="py-4 text-xl font-mono"
                        type="text"
                        placeholder="Enter OTP"
                    />
                    <Button
                        type="submit"
                        classname="bg-green-600 text-white"
                        name="Start Ride"
                    />
                </form>
                <Button
                    classname="bg-red-600 text-white"
                    onclick={() => {
                        props.setconfirmRidePanel(false);
                        props.setridePopupPanel(false);
                    }}
                    name="Cancel"
                />
            </div>
        </div>
    );
};

export default ConfirmRidePopup;