const express = require("express");
const app = express();

const domain = "/note";

app.get("/", (req, res) => {
  res.redirect(301, domain);
});

app.get("*", (req, res) => {
  res.redirect(301, domain);
});

module.exports = app;
