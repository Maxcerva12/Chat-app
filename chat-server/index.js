const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const redisAdapter = require("socket.io-redis");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

// Configura CORS para permitir solicitudes desde http://localhost:3000
app.use(
  cors({
    origin: ["http://localhost:3000", "http://192.168.18.35:3000"],
    methods: ["GET", "POST"],
  })
);

const io = socketIo(server, {
  cors: {
    origin: ["http://localhost:3000", "http://192.168.18.35:3000"],
    methods: ["GET", "POST"],
  },
});

// Conectar Socket.IO con Redis
io.adapter(redisAdapter({ host: "localhost", port: 6379 }));

let users = [];

io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado");

  // Cuando un usuario se une a una sala
  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    console.log(`Usuario ${socket.id} se unió a la sala: ${roomId}`);
  });

  // Escuchar los mensajes y reenviarlos a la sala correcta
  socket.on("message", (messageData) => {
    const { roomId, message, timestamp } = messageData;
    io.to(roomId).emit("newMessage", { message, timestamp });
  });

  // Registrar un usuario
  socket.on("registerUser", (user) => {
    if (!users.some((u) => u.uid === user.uid)) {
      users.push({ ...user, socketId: socket.id });
      io.emit("usersList", users); // Emitir lista actualizada de usuarios
    }
  });

  // Manejar la desconexión del usuario
  socket.on("disconnect", () => {
    console.log("Cliente desconectado");
    users = users.filter((u) => u.socketId !== socket.id);
    io.emit("usersList", users); // Emitir lista actualizada de usuarios
  });

  // Escuchar la solicitud de usuarios activos
  socket.on("getActiveUsers", () => {
    socket.emit("activeUsers", users);
  });

  // Manejar solicitud de chat privado
  socket.on("privateChatRequest", ({ fromUser, toUser }) => {
    // Emitir la solicitud al destinatario
    socket.to(toUser.socketId).emit("privateChatRequest", fromUser);
  });

  // Manejar la aceptación del chat privado
  socket.on("acceptPrivateChat", ({ fromUser, toUser }) => {
    const roomId = `private-${fromUser.uid}-${toUser.uid}`;
    socket.join(roomId);
    io.to(fromUser.socketId).emit("privateChatAccepted", roomId);
    io.to(socket.id).emit("privateChatAccepted", roomId);
  });
});

// Añadir una ruta para la raíz
app.get("/", (req, res) => {
  res.send("Servidor 1 está funcionando");
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () =>
  console.log(`Servidor corriendo en el puerto ${PORT}`)
);
