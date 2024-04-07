const express = require("express");
const fs = require("fs");
const path = require("path");
const notepadRouter = express.Router();

// Middleware
notepadRouter.use(express.urlencoded({ extended: true }));
notepadRouter.use(express.static(path.join(__dirname, "public")));
notepadRouter.use(express.json());

const dataFilePath = path.join(__dirname, "notepadData.json");

// Check if notepadData.json exists, if not, create it with an empty array
if (!fs.existsSync(dataFilePath)) {
  fs.writeFileSync(dataFilePath, "[]");
}

notepadRouter.get("/", (req, res) => {
  fs.readFile(dataFilePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Error reading data file" });
      return;
    }
    res.json(JSON.parse(data));
  });
});

notepadRouter.post("/", (req, res) => {
  const newData = req.body;
  fs.readFile(dataFilePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Error reading data file" });
      return;
    }

    let dataArray = [];
    if (data) {
      dataArray = JSON.parse(data);
    }
    dataArray.push(newData);

    fs.writeFile(dataFilePath, JSON.stringify(dataArray, null, 2), (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Error saving data" });
        return;
      }
      res.status(201).json({ message: "Data received successfully", data: newData });
    });
  });
});

notepadRouter.get("/:id", (req, res) => {
  const noteId = req.params.id;
  fs.readFile(dataFilePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Error reading data file" });
      return;
    }
    try {
      const notes = JSON.parse(data);
      // const note = notes.find((note) => note._id === +noteId);
      // var note = notes.filter((obj) => obj._id.toString().includes(+noteId));
      var note = notes.filter((obj) => obj._id.toString().startsWith(+noteId));

      if (!note) {
        res.status(404).json({ error: "Note not found" });
        return;
      }
      res.json(note);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error parsing data file" });
    }
  });
});

notepadRouter.delete("/:id", (req, res) => {
  const idToDelete = req.params.id;
  fs.readFile(dataFilePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Error reading data file" });
      return;
    }
    let dataArray = [];
    if (data) {
      dataArray = JSON.parse(data);
    }
    const updatedData = dataArray.filter((item) => item.id !== idToDelete);
    fs.writeFile(dataFilePath, JSON.stringify(updatedData, null, 2), (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Error deleting data" });
        return;
      }
      res.json({ message: "Data deleted successfully", id: idToDelete });
    });
  });
});

module.exports = notepadRouter;
