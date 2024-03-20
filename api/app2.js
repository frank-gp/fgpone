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

module.exports = router;
