import { createContext, useEffect, ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';

interface SocketContextType {
    socket: Socket;
  }
  

export const SocketContext = createContext<SocketContextType | null>(null); // ✅ fixed

const socket = io(`${import.meta.env.VITE_BASE_URL}`);

const SocketProvider = ({ children }: { children: ReactNode }) => {
    useEffect(() => {
        socket.on('connect', () => {
            console.log('✅ Connected to server');
        });

        socket.on('disconnect', () => {
            console.log('❌ Disconnected from server');
        });
    }, []);


    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};


export default SocketProvider;
