const { setupWebSocketServer } = require("./modules/websocket/websocketService");
const connectMongoDB = require("./config/mongodb");
const express = require("express");
const cors = require("cors");
const http = require("http");

require("dotenv").config();

const mainApp = express();
const server = http.createServer(mainApp);

mainApp.use(cors());
mainApp.use(express.json());
mainApp.use(express.urlencoded({ extended: true }));

const startServer = async () => {
  try {
    await connectMongoDB();
    server.listen(3000, () => {
      console.log(`listening on http://localhost:3000/`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
};

startServer();

// Configurar WebSocket
setupWebSocketServer(server);

const apiRouter = express.Router();

apiRouter.use("/note", require("./api/note/"));
mainApp.use("/api", apiRouter);

mainApp.use("/contact", require("./modules/contact/app.js"));
mainApp.use("/img", require("./modules/img/app.js"));
mainApp.use("/login", require("./modules/login/app.js"));
mainApp.use("/feed", require("./modules/feed/app.js"));
mainApp.use("/chat", require("./modules/websocket/chatRoutes"));
mainApp.use("/stat", require("./modules/stat/app.js"));
mainApp.use("/notepad", require("./modules/notepad/app.js"));
mainApp.use("/", require("./api/shortener/"));

// mainApp.use("/", require("./modules/shortener/app.js"));
mainApp.use("/", express.static("public"));
