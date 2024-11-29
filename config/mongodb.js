// db.js
const mongoose = require("mongoose");

require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI;
const dbName = "fgpone";
const truncatedUrl = MONGO_URI.length > 50 ? MONGO_URI.slice(0, 50) + "..." : MONGO_URI;

const connectMongoDB = async () => {
  try {
    console.log(truncatedUrl);
    await mongoose.connect(MONGO_URI, { dbName });
    console.log("Conexión a mongodb/storeDB establecida");
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
    process.exit(1);
  }
};

module.exports = connectMongoDB;
