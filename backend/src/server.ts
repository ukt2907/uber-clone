import app from "./app";
import http from "http";
import config from "./config/config"
import { initializeSocket } from './socket';
import { Server } from "socket.io";
import { setSocketInstance } from "./socket-instance";


// Create HTTP server
const server = http.createServer(app);

// Create Socket.IO server instance
const io = new Server(server, {
  cors: {
    origin: "*", // Update this to match your frontend origin if needed
    methods: ["GET", "POST"],
  },
});

// Store io in socket-instance
setSocketInstance(io);

// Initialize socket logic
initializeSocket(io);

server.listen(config.PORT, () => {
    console.log(`Server running at http://localhost:${config.PORT}`);
});