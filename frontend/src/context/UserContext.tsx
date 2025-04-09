import { ReactNode } from "react";
import { createContext, useState } from "react"

interface User {
    fullName: {
        firstName: string;
        lastName: string;
    };
    email: string;
}

export interface UserContextType {
    user: User;
    setuser: React.Dispatch<React.SetStateAction<User>>;
}

export const UserDataContext = createContext<UserContextType | null>(null);


const UserContext = ({ children }: { children: ReactNode }) => {

    
    const [user, setuser] = useState<User>({
        fullName: {
            firstName: "",
            lastName: ""
        },
        email: "",
    })
  return (
    <div>
        <UserDataContext.Provider value={{user,setuser}}>
            {children}
        </UserDataContext.Provider>
    </div>
  )
}

export default UserContext