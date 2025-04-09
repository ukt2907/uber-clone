// socket.ts
import { Server, Socket } from "socket.io";

export const initializeSocket = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log("🟢 New client connected:", socket.id);

    socket.on("send_message", (data) => {
      console.log("📨 Message received:", data);
      io.emit("receive_message", data);
    });

    socket.on("disconnect", () => {
      console.log("🔴 Client disconnected:", socket.id);
    });
  });
};
