import express from "express";
import logger from "morgan";
import { Server } from "socket.io";
import { createServer } from "node:http";

const port = process.env.PORT ?? 3000;

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(logger("dev"));

io.on("connection", (socket) => {
  console.log("El usuario ha sido conectado");

  socket.on("chat message", (msg) => {
    // Enviamos el mensaje a todos
    io.emit("chat message", {
      message: msg,
      sender: socket.id,
    });
  });

  socket.on("disconnect", () => {
    console.log("El usuario se ha desconectado");
  });
});

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/usuarios/index.html");
});

server.listen(port, () => {
  console.log(`Servidor en marcha en http://localhost:${port}`);
});
