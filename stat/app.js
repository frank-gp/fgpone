const express = require("express");
const bodyParser = require("body-parser");

const statApp = express();

statApp.use(bodyParser.json());
statApp.use(express.static("./stat"));

// Array to store received data
let data = [];

// Handle requests for the sub-app
// statApp.get("/", (req, res) => {
//   res.send("Sub-App - Hello World!");
// });

statApp.post("/received_data", (req, res) => {
  // Access the data sent from the client
  const receivedData = req.body;

  // Log the received data
  console.log("Received Data:", receivedData);

  // Push the received data into the array
  data.push(receivedData);

  // Respond to the client
  res.send("Data received and inserted into the array!");
});

statApp.get("/get_data", (req, res) => {
  // Respond with the array containing all received data
  res.json(data);
});

// Endpoint to reset data
statApp.get("/reset_data", (req, res) => {
  // Reset the data array to an empty array
  data = [];
  // Respond to the client
  res.send("Data reset successfully!");
});

module.exports = statApp;
