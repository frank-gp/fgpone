// shortener\app.js

const express = require("express");
const shortid = require("shortid");
const fs = require("fs/promises");
const path = require("path");

const shortenerApp = express();
const dataFilePath = path.join(__dirname, "dataShortener.json");

shortenerApp.use(express.urlencoded({ extended: true }));
shortenerApp.use(express.json());
shortenerApp.use(express.static(path.join(__dirname, "public")));

// Helper functions
async function loadData() {
  try {
    const jsonData = await fs.readFile(dataFilePath, "utf8");
    return JSON.parse(jsonData);
  } catch (error) {
    return {};
  }
}

async function saveData(data) {
  try {
    await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), "utf8");
  } catch (error) {
    console.error("Error saving data:", error);
  }
}
// ========== login... ==========
const username = process.env.USER1;
const password = process.env.PASSWORD1;
const users = [{ username, password }];
// console.log(users)

shortenerApp.get("/admin", (req, res) => {
  res.sendFile(__dirname + "/private/admin-login.html");
});

shortenerApp.post("/admin", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username && u.password === password);
  if (user) {
    const adminPath = path.join(__dirname, "private", "admin-dashboard.html");
    res.sendFile(adminPath);
  } else {
    const logoutPath = path.join(__dirname, "private", "try-again.html");
    res.sendFile(logoutPath);
  }
});
// ========== 2 ==========
shortenerApp.get("/upload", (req, res) => {
  res.sendFile(__dirname + "/private/upload-login.html");
});

shortenerApp.post("/upload", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username && u.password === password);
  if (user) {
    const uploadPath = path.join(__dirname, "private", "upload-dashboard.html");
    res.sendFile(uploadPath);
  } else {
    res.send("Login failed");
  }
});
// ========== login. ==========

// GET routes
// shortenerApp.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));

shortenerApp.get("/get-data", async (req, res) => res.json(await loadData()));

shortenerApp.get("/download", (req, res) => res.download(dataFilePath, "dataShortener.json"));

shortenerApp.get("/:shortUrl", async (req, res) => {
  const { shortUrl } = req.params;
  const data = await loadData();
  const urlData = data[shortUrl];

  if (urlData) {
    urlData.visits = (urlData.visits || 0) + 1;
    await saveData(data);
    res.redirect(urlData.longUrl);
  } else {
    // Assuming your 404.html file is in the root directory of your project
    const filePath = path.join(__dirname, "public/404.html");
    res.status(404).sendFile(filePath);
  }
});

// POST routes
shortenerApp.post("/reset-visits", async (req, res) => {
  const data = await loadData();
  Object.keys(data).forEach((shortUrl) => (data[shortUrl].visits = 0));
  await saveData(data);
  res.sendStatus(200);
});

shortenerApp.post("/create", async (req, res) => {
  const { longUrl, customBackHalf } = req.body;
  if (!longUrl) {
    return res.status(400).send("Missing longUrl parameter");
  }

  const data = await loadData();
  const shortUrl = customBackHalf || shortid.generate();
  data[shortUrl] = { longUrl, visits: 0 };
  await saveData(data);

  const shortUrlWithHost = `${req.protocol}://${req.get("host")}/${shortUrl}`;
  res.json({ shortUrl: shortUrlWithHost });
});

shortenerApp.post("/upload-data", async (req, res) => {
  try {
    const uploadedData = req.body;

    if (!uploadedData || typeof uploadedData !== "object") {
      throw new Error("Invalid data format");
    }

    await saveData(uploadedData);
    res.status(200).send("Data uploaded successfully");
  } catch (error) {
    console.error("Error uploading data:", error);
    res.status(500).send("Internal Server Error");
  }
});

// PUT route
shortenerApp.put("/update/:shortUrl", async (req, res) => {
  try {
    const { shortUrl } = req.params;
    const updatedData = req.body;

    if (!updatedData || typeof updatedData !== "object") {
      throw new Error("Invalid data format");
    }

    const data = await loadData();

    if (data[shortUrl]) {
      data[shortUrl] = updatedData;
      await saveData(data);
      res.status(200).send("Data updated successfully");
    } else {
      res.status(404).send("Short URL not found");
    }
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).send("Internal Server Error");
  }
});

// DELETE route
shortenerApp.delete("/delete/:shortUrl", async (req, res) => {
  const { shortUrl } = req.params;
  const data = await loadData();

  if (data[shortUrl]) {
    delete data[shortUrl];
    await saveData(data);
    res.sendStatus(200);
  } else {
    res.status(404).send("Short URL not found");
  }
});

// 404 and listen
// shortenerApp.use((req, res) => res.status(404).sendFile(path.join(__dirname, "public", "1404.html")));

module.exports = shortenerApp;
