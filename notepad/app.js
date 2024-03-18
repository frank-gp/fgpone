const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express();

router.set("view engine", "ejs");

// Middleware
router.use(express.urlencoded({ extended: true }));
router.use(express.static(path.join(__dirname, "public")));
router.use(express.json());

// Set the views directory
router.set("views", path.join(__dirname, "views"));

// const dataFilePath = "notepadData.json";
const dataFilePath = path.join(__dirname, "notepadData.json");

// Check if notepadData.json exists, if not, create it with an empty array
if (!fs.existsSync(dataFilePath)) {
  fs.writeFileSync(dataFilePath, "[]");
}

router.get("/", (req, res) => {
  fs.readFile(dataFilePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.render("index", { jsonData: "" });
      return;
    }
    res.render("index", { jsonData: data });
  });
});

router.post("/", (req, res) => {
  console.log(req.body);
  // res.json({ message: "Data received successfully", body: req.body });

  const newData = {
    id: Date.now(), // Use current timestamp as ID
    name: req.body.name,
    textarea: req.body.content, // Corrected property name
  };
  console.log(newData);

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

router.delete("/delete/:id", (req, res) => {
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

router.get("/admin", (req, res) => {
  fs.readFile(dataFilePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.render("admin", { jsonData: "" });
      return;
    }
    res.render("admin", { jsonData: data });
  });
});

module.exports = router;
