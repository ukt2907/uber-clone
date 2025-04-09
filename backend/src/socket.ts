// socket.ts
import { Server, Socket } from "socket.io";
import { User } from "./models/user-model";
import { Captain } from "./models/captain-model";

export const initializeSocket = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log("🟢 New client connected:", socket.id);

    socket.on("join",async (data)=>{

        const {userId, userType} = data;
        console.log("User joined:", userId, userType);


        if(userType === "user"){
            await User.findByIdAndUpdate(userId, {
                socketId: socket.id
            })
        }else if(userType === "captain"){
            await Captain.findByIdAndUpdate(userId, {
                socketId: socket.id
            })
        }
    })


    socket.on("send_message", (data) => {
      console.log("📨 Message received:", data);
      io.emit("receive_message", data);
    });

    socket.on("disconnect", () => {
      console.log("🔴 Client disconnected:", socket.id);
    });
  });
};
