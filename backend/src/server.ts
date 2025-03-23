import app from "./app";
import http from "http";
import config from "./config/config"

const server = http.createServer(app);


server.listen(config.PORT, () => {
    console.log(`Server running at http://localhost:${config.PORT}`);
});