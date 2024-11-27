const express = require("express");
const { getChatPage } = require("./chatController");

const router = express.Router();

// Ruta para obtener la página del chat
router.get("/", getChatPage);

module.exports = router;
