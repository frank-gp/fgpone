const express = require("express");
const path = require("path");
const router = express();
const fs = require("fs");

const dataFilePath = path.join(__dirname, "apiData.json");

// Check if notepadData.json exists, if not, create it with an empty array
if (!fs.existsSync(dataFilePath)) {
  fs.writeFileSync(dataFilePath, "[]");
}

router.get("/", (req, res) => {
  fs.readFile(dataFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading data file:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    const jsonData = JSON.parse(data);
    // Shuffle the array
    const shuffledData = jsonData.sort(() => Math.random() - 0.5);
    // Send three random data points
    const randomData = shuffledData.slice(0, 3);
    res.json(randomData);
  });
});

mainApp.get("/upload", (req, res) => {
  //   res.sendFile(__dirname + "/public/upload/index.html");
  let fileUpload = path.join(__dirname, +"public" + "upload" + "index.html");
  res.sendFile(fileUpload);
  //   path.join(__dirname, "apiData.json");
  //   api/public/upload/index.html
});

mainApp.post("/upload", (req, res) => {
  const jsonData = req.body.jsonData;

  // Write the uploaded JSON data to apiData.json file
  fs.writeFile("apiData.json", jsonData, "utf8", (err) => {
    if (err) {
      console.error("Error writing data file:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.status(200).send("Data uploaded successfully!");
  });
});

module.exports = router;
