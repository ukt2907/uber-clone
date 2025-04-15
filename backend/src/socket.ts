  // socket.ts
  import { Server, Socket } from "socket.io";
  import { User } from "./models/user-model";
  import { Captain } from "./models/captain-model";
  import { getSocketInstance } from "./socket-instance";

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

      socket.on("update-captain-location", async (data) => {
        const {userId, location} = data;

        if(!location|| !location.ltd || !location.lng){
          return socket.emit("error", "Location is required")
        }

        await Captain.findByIdAndUpdate(userId, {
          location: {
            type: "Point",
            coordinates: [location.lng, location.ltd]
          }
        });
        console.log(`🔁 Captain location updated for: ${userId}`);

      })

      socket.on("disconnect", () => {
        console.log("🔴 Client disconnected:", socket.id);
      });
    });
  };

  interface MessageObject {
    event: string;
    data: any;
  }

  export const sendMessageToSocketId = ( socketId: string, messageObject: MessageObject) => {

    const io = getSocketInstance();
    if(io){
      io.to(socketId).emit(messageObject.event, messageObject.data);
    } else{
      console.log("Socket not initialized");
    }
  }
