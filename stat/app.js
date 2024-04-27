const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const statApp = express();

statApp.use(express.json());
statApp.use(express.urlencoded({ extended: true }));
statApp.use(express.static(path.join(__dirname, "public")));

const statSchema = new mongoose.Schema({}, { strict: false });
const StatModel = mongoose.model("stat", statSchema);

statApp.post("/received_data", async (req, res) => {
  try {
    const receivedData = req.body;
    console.log("Received Data:", receivedData);
    const create = await StatModel.create(receivedData);
    res.json({ message: "Data received and inserted into the array!", data: create });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

statApp.get("/get_data", async (req, res) => {
  try {
    const data = await StatModel.find();
    res.json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

statApp.get("/reset_data", async (req, res) => {
  try {
    const result = await StatModel.deleteMany({});
    res.json({ message: "All data deleted successfully!", deletedCount: result.deletedCount });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = statApp;
