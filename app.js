const express = require("express");
const mongoose = require("mongoose");
const mainApp = express();
const cors = require("cors");
require("dotenv").config();

// const corsOptions = {
//   origin: 'http://127.0.0.1:5500',
//   methods: 'GET',
//   optionsSuccessStatus: 204, // Some legacy browsers (IE11, various SmartTVs) choke on 204
// };

// mainApp.use(cors(corsOptions));

mainApp.use(cors());

mainApp.use("/appDev", require("./appDev/app.js"));

mainApp.use("/login", require("./login/app.js"));

mainApp.use("/stat", require("./stat/app.js"));

mainApp.use("/contact", require("./contact/app.js"));

mainApp.use("/img", require("./img/app.js"));

mainApp.use("/todo", require("./todo/app.js"));

mainApp.use("/feed", require("./feed/app.js"));

mainApp.use("/notepad", require("./notepad/app.js"));

mainApp.use("/note", require("./note/app.js"));

mainApp.use("/api", require("./api/app.js"));

mainApp.use("/store", require("./store/app.js"));

mainApp.use("/", require("./shortener/app.js"));

// Conexión a la base de datos MongoDB
const PORT = process.env.PORT || 3000;
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
connectDB().then(() => {
  console.log("Conexión establecida");
  mainApp.listen(PORT, () => {
    console.log(`Main App listening on port http://localhost:${PORT}`);
  });
});
