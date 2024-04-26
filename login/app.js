const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

// ========== login... ==========
const username = process.env.USER1;
const password = process.env.PASSWORD1;
app.use(bodyParser.urlencoded({ extended: true }));
const users = [{ username, password }];
// console.log(users)

app.get("/admin", (req, res) => {
  res.sendFile(__dirname + "/private/admin-login.html");
});

app.post("/admin", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username && u.password === password);
  if (user) {
    const adminPath = path.join(__dirname, "private", "admin.html");
    res.sendFile(adminPath);
  } else {
    res.send("Login failed");
  }
});
// ========== login. ==========

module.exports = app;
