const express = require("express");
const mainApp = express();
const cors = require("cors");
require('dotenv').config();

// const corsOptions = {
//   origin: 'http://127.0.0.1:5500',
//   methods: 'GET',
//   optionsSuccessStatus: 204, // Some legacy browsers (IE11, various SmartTVs) choke on 204
// };

// mainApp.use(cors(corsOptions));

mainApp.use(cors());

const appDev = require("./appDev/app");
mainApp.use("/appDev", appDev);

const login = require("./login/app");
mainApp.use("/login", login);

const stat = require("./stat/app");
mainApp.use("/stat", stat);

const contact = require("./contact/app");
mainApp.use("/contact", contact);

const img = require("./img/app");
mainApp.use("/img", img);

const todo = require("./todo/app");
mainApp.use("/todo", todo);

const { router } = require("./feed/app");
mainApp.use("/feed", router);

const notepad = require("./notepad/app");
mainApp.use("/notepad", notepad);

const shortener = require("./shortener/app");
mainApp.use("/", shortener);

const PORT = process.env.PORT || 3000;
mainApp.listen(PORT, () => {
  console.log(`Main App listening on port http://localhost:${PORT}`);
});
