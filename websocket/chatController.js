// Controlador para gestionar la ruta del chat (por ejemplo, servir la página del chat)
const path = require("path");

const getChatPage = (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
};

module.exports = { getChatPage };
