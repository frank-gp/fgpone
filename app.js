// app.js

const { setupWebSocketServer } = require("./websocket/websocketService");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");

require("dotenv").config();

const mainApp = express();
const server = http.createServer(mainApp);

mainApp.use(cors());

const MONGO_URI = process.env.MONGO_URI;
const dbName = "fgpone";

const connectDB = async () => {
  try {
    console.log(MONGO_URI);
    await mongoose.connect(MONGO_URI, { dbName });
    console.log("Conexión a la base de datos de mongodb/storeDB establecida");
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
  }
};

// Conectar y escuchar
connectDB().then(() => {
  server.listen(process.env.PORT || 3000, () => {
    console.log(`Main App listening on port http://localhost:${process.env.PORT || 3000}`);
  });
});

// Configurar WebSocket
setupWebSocketServer(server);

mainApp.use("/contact", require("./contact/app.js"));
mainApp.use("/img", require("./img/app.js"));
mainApp.use("/login", require("./login/app.js"));
mainApp.use("/note", require("./note/app.js"));
mainApp.use("/notepad", require("./notepad/app.js"));
mainApp.use("/stat", require("./stat/app.js"));
mainApp.use("/feed", require("./feed/app.js"));
mainApp.use("/chat", require("./websocket/chatRoutes"));
mainApp.use("/", require("./shortener/app.js"));

// mainApp.use(express.static("public"));
