// src/socket-instance.ts
import { Server } from "socket.io";

let io: Server | null = null;

export const setSocketInstance = (socketIo: Server) => {
    io = socketIo;
};

export const getSocketInstance = (): Server => {
    if (!io) {
        throw new Error("Socket.IO not initialized");
    }
    return io;
};