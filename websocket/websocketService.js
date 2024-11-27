const WebSocket = require("ws");

let wss;

const setupWebSocketServer = (server) => {
  // Crear un WebSocket Server
  wss = new WebSocket.Server({ server });

  wss.on("connection", (ws) => {
    console.log("Nuevo cliente conectado");

    // Escuchar los mensajes del cliente
    ws.on("message", (message) => {
      console.log("Mensaje recibido: ", message);

      // Reenviar el mensaje a todos los clientes conectados
      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
    });

    // Manejar desconexión
    ws.on("close", () => {
      console.log("Cliente desconectado");
    });
  });
};

module.exports = { setupWebSocketServer };
