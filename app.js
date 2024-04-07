const express = require("express");
const mainApp = express();
const cors = require("cors");
require("dotenv").config();

// const corsOptions = {
//   origin: 'http://127.0.0.1:5500',
//   methods: 'GET',
//   optionsSuccessStatus: 204, // Some legacy browsers (IE11, various SmartTVs) choke on 204
// };

// mainApp.use(cors(corsOptions));

mainApp.use(cors());

const appDev = require("./appDev/app.js");
mainApp.use("/appDev", appDev);

const login = require("./login/app.js");
mainApp.use("/login", login);

const stat = require("./stat/app.js");
mainApp.use("/stat", stat);

const contact = require("./contact/app.js");
mainApp.use("/contact", contact);

const img = require("./img/app.js");
mainApp.use("/img", img);

const todo = require("./todo/app.js");
mainApp.use("/todo", todo);

const { router } = require("./feed/app.js");
mainApp.use("/feed", router);

const notepad = require("./notepad/app.js");
mainApp.use("/notepad", notepad);

const note = require("./note/app.js");
mainApp.use("/note", note);

const api = require("./api/app.js");
mainApp.use("/api", api);

const checkpoints = require("./checkpoints/app.js");
mainApp.use("/checkpoints", checkpoints);

const shortener = require("./shortener/app.js");
mainApp.use("/", shortener);

const PORT = process.env.PORT || 3000;
mainApp.listen(PORT, () => {
  console.log(`Main App listening on port http://localhost:${PORT}`);
});
