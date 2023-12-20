const express = require("express");

const app = express();

app.get("/", (req, res) => {
  console.log(req.headers);
  res.send("Hello, World!");
});

module.exports = app;
