const express = require("express");
const fs = require("fs");
const path = require("path");
const notepadRouter = express();

notepadRouter.set("view engine", "ejs");

// Middleware
notepadRouter.use(express.urlencoded({ extended: true }));
notepadRouter.use(express.static(path.join(__dirname, "public")));
notepadRouter.use(express.json());

// Set the views directory
notepadRouter.set("views", path.join(__dirname, "views"));

// const dataFilePath = "notepadData.json";
const dataFilePath = path.join(__dirname, "notepadData.json");

// Check if notepadData.json exists, if not, create it with an empty array
if (!fs.existsSync(dataFilePath)) {
  fs.writeFileSync(dataFilePath, "[]");
}

notepadRouter.get("/", (req, res) => {
  fs.readFile(dataFilePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.render("index", { jsonData: "" });
      return;
    }
    res.render("index", { jsonData: data });
  });
});

notepadRouter.get("/add", (req, res) => {
  fs.readFile(dataFilePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.render("add", { jsonData: "" });
      return;
    }
    res.render("add", { jsonData: data });
  });
});

notepadRouter.get("/admin", (req, res) => {
  fs.readFile(dataFilePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.render("admin", { jsonData: "" });
      return;
    }
    res.render("admin", { jsonData: data });
  });
});

// Add a route to download the JSON data
notepadRouter.get("/download", (req, res) => {
  fs.readFile(dataFilePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error downloading data");
      return;
    }
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Content-Disposition", "attachment; filename=notepadData.json");
    res.send(data);
  });
});

notepadRouter.post("/", (req, res) => {
  // console.log(req.body);
  // res.json({ message: "Data received successfully", body: req.body });

  const newData = {
    id: Date.now(), // Use current timestamp as ID
    name: req.body.name.trim(), // Remove leading and trailing whitespace
    textarea: req.body.content, // Corrected property name
  };
  // console.log(newData);

  fs.readFile(dataFilePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error saving data");
      return;
    }

    let dataArray = [];
    if (data) {
      dataArray = JSON.parse(data);
    }
    // console.log(dataArray);
    dataArray.push(newData);

    fs.writeFile(dataFilePath, JSON.stringify(dataArray, null, 2), (err) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error saving data");
        return;
      }
      // res.redirect("/");
      res.json({ message: "Data received successfully", body: req.body });
    });
  });
});

notepadRouter.delete("/delete/:id", (req, res) => {
  const idToDelete = parseInt(req.params.id);
  fs.readFile(dataFilePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error deleting data");
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
        res.status(500).send("Error deleting data");
        return;
      }
      // res.redirect("/");
      res.json({ message: "Data delete successfully", body: req.body });
    });
  });
});

// Route to render the upload form
notepadRouter.get("/upload", (req, res) => {
  res.render("upload");
});

// Route to handle uploaded JSON data
notepadRouter.post("/upload", (req, res) => {
  const jsonData = req.body.jsonData;

  try {
    const parsedData = JSON.parse(jsonData);

    fs.readFile(dataFilePath, "utf8", (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error saving data");
        return;
      }

      let dataArray = [];
      if (data) {
        dataArray = JSON.parse(data);
      }
      // dataArray.push(...parsedData);

      // Clear existing data before appending new data
      dataArray = [];
      // Append the parsed data to the existing array
      dataArray.push(...parsedData);

      // parsedData = dataArray;
      fs.writeFile(dataFilePath, JSON.stringify(dataArray, null, 2), (err) => {
        if (err) {
          console.error(err);
          res.status(500).send("Error saving data");
          return;
        }
        res.redirect("./");
      });
    });
  } catch (error) {
    console.error(error);
    res.status(400).send("Invalid JSON data");
  }
});

notepadRouter.get("/:id", (req, res) => {
  const noteId = req.params.id;
  fs.readFile(dataFilePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error reading data file");
      return;
    }
    try {
      const notes = JSON.parse(data);
      const note = notes.find((note) => note.id === parseInt(noteId));
      if (!note) {
        res.status(404).send("Note not found");
        return;
      }
      // console.log(note);
      res.render("note", { jsonData: [note] });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error parsing data file");
    }
  });
});

notepadRouter.get("/name/:name", (req, res) => {
  const noteName = req.params.name;
  // console.log(noteName);
  fs.readFile(dataFilePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.render("error", { message: "Error reading notes file." });
      return;
    }

    const notes = JSON.parse(data);
    const matchingNotes = notes.filter((note) => note.name === noteName);

    if (matchingNotes.length === 0) {
      res.render("error", { message: "No notes found with the specified name." });
      return;
    }

    // res.render("notes", { notes: matchingNotes });
    res.render("name.ejs", { jsonData: matchingNotes });

    // res.json(matchingNotes);
  });
});

module.exports = notepadRouter;
