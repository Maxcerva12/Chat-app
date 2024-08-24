// // const express = require("express");
// // const http = require("http");
// // const socketIo = require("socket.io");
// // const redisAdapter = require("socket.io-redis");

// // const app = express();
// // const server = http.createServer(app);
// // const io = socketIo(server);

// // // Conectar Socket.IO con Redis
// // io.adapter(redisAdapter({ host: "localhost", port: 6379 }));

// // io.on("connection", (socket) => {
// //   console.log("Nuevo cliente conectado");

// //   socket.on("message", (msg) => {
// //     io.emit("message", msg);
// //   });

// //   socket.on("disconnect", () => {
// //     console.log("Cliente desconectado");
// //   });
// // });

// // const PORT = process.env.PORT || 3001;
// // server.listen(PORT, () =>
// //   console.log(`Servidor corriendo en el puerto ${PORT}`)
// // );

// const express = require("express");
// const http = require("http");
// const socketIo = require("socket.io");
// const redisAdapter = require("socket.io-redis");
// const cors = require("cors");

// const app = express();
// const server = http.createServer(app);

// // Configura CORS para permitir solicitudes desde http://localhost:3000
// app.use(cors({
//   origin: 'http://localhost:3000',
//   methods: ['GET', 'POST']
// }));

// const io = socketIo(server, {
//   cors: {
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST']
//   }
// });

// // Conectar Socket.IO con Redis
// io.adapter(redisAdapter({ host: "localhost", port: 6379 }));

// io.on("connection", (socket) => {
//   console.log("Nuevo cliente conectado");

//   socket.on("message", (msg) => {
//     io.emit("message", msg);
//   });

//   socket.on("disconnect", () => {
//     console.log("Cliente desconectado");
//   });
// });

// const PORT = process.env.PORT || 3001;
// server.listen(PORT, () =>
//   console.log(`Servidor corriendo en el puerto ${PORT}`)
// );

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
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  })
);

const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// Conectar Socket.IO con Redis
io.adapter(redisAdapter({ host: "localhost", port: 6379 }));

io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado");

  socket.on("message", (msg) => {
    io.emit("message", msg);
  });

  socket.on("disconnect", () => {
    console.log("Cliente desconectado");
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
