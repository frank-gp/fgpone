const { setupWebSocketServer } = require("./modules/websocket/websocketService");
const connectMongoDB = require("./config/mongodb");
const express = require("express");
const cors = require("cors");
const http = require("http");
const morgan = require("morgan");
const geoip = require("geoip-lite");
const countries = require("i18n-iso-countries");

require("dotenv").config();

const mainApp = express();
const server = http.createServer(mainApp);

let logArray = []; // Array para almacenar los logs

// Token personalizado para la URL completa
morgan.token("full-url", (req) => {
  const host = req.headers.host;
  const url = req.originalUrl;
  return `${req.protocol}://${host}${url}`;
});

// Token personalizado para la IP del cliente
morgan.token("client-ip", (req) => {
  // return req.headers["x-forwarded-for"] || req.ip;
  return req.ip;
});

// Token personalizado para la fecha y hora
morgan.token("date", () => new Date().toISOString().replace(/-/g, "").replace(/T/g, "-").slice(0, 14));

// Token personalizado para el país de origen (nombre completo)
morgan.token("country", (req) => {
  const ip = req.headers["x-forwarded-for"] || req.ip;
  const geo = geoip.lookup(ip);
  return geo && geo.country ? countries.getName(geo.country, "en") : "Unknown";
});

// Middleware para almacenar los logs en el array
const customMorgan = morgan(":date :method :full-url :status :res[content] - :response-time ms :country :client-ip", {
  stream: {
    write: (log) => {
      logArray.push(log.trim()); // Agregar el log al array
    },
  },
});

mainApp.use(customMorgan);

// mainApp.use(morgan("dev"));
mainApp.use(cors());
mainApp.use(express.json());
mainApp.use(express.urlencoded({ extended: true }));

const startServer = async () => {
  try {
    await connectMongoDB();
    server.listen(3000, () => {
      console.log(`listening on http://localhost:3000/`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
};

startServer();

// Configurar WebSocket
setupWebSocketServer(server);

const apiRouter = express.Router();

apiRouter.use("/note", require("./api/note/"));
apiRouter.use("/auth", require("./api/auth/router"));
mainApp.use("/api", apiRouter);

mainApp.use("/contact", require("./modules/contact/app.js"));
mainApp.use("/img", require("./modules/img/app.js"));
mainApp.use("/feed", require("./modules/feed/app.js"));
mainApp.use("/chat", require("./modules/websocket/chatRoutes"));
mainApp.use("/stat", require("./modules/stat/app.js"));
mainApp.use("/notepad", require("./modules/notepad/app.js"));
mainApp.use("/", require("./api/shortener/shortener.router.js"));

mainApp.use("/", express.static("public"));

// // Endpoint para mostrar los logs
// mainApp.get("/logs", (req, res) => {
//   res.json(logArray); // Devuelve los logs almacenados
// });

mainApp.get("/logs", (req, res) => {
  const sortedLogs = logArray.slice().reverse(); // Copia el array y lo ordena en orden descendente
  res.json(sortedLogs); // Devuelve los logs ordenados
});

// Catch-all route for 404 (Not Found) errors
mainApp.use((req, res, next) => {
  res.status(404).sendFile("404.html", { root: "public" });
});
