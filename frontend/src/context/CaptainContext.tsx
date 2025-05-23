import {  createContext, useState } from "react";

export interface Captain {
    _id: string;
    fullName:{
        firstName: string;
        lastName: string;
    },
    email: string;
    vehicle:{
        color: string;
        plate: string;
        capacity: string;
        vehicleType: string;
    }
}

export interface CaptainContextType {
    captain: Captain;
    setcaptain: React.Dispatch<React.SetStateAction<Captain>>;
}

export const  CaptainDataContext = createContext<CaptainContextType | null>(null);

const CaptainContext = ({children}: {children: React.ReactNode}) => {
    const [captain, setcaptain] = useState<Captain>({
        _id: "",
        fullName: {
            firstName: "",
            lastName: ""
        },
        email: "",
        vehicle:{
            color:"",
            plate:"",
            capacity:"",
            vehicleType:""
        }
    })
  return (
    
        <CaptainDataContext.Provider value={{captain, setcaptain}}>
            {children}
        </CaptainDataContext.Provider>
   
  )
}

export default CaptainContext