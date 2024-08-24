// // import React, { useState, useEffect } from "react";
// // import io from "socket.io-client";

// // const servers = ["http://localhost:3001", "http://localhost:3002"];
// // let socket;

// // function connectToServer() {
// //   for (const server of servers) {
// //     try {
// //       socket = io(server, { reconnectionAttempts: 2, timeout: 10000 });

// //       socket.on("connect", () => {
// //         console.log("Conectado al servidor:", server);
// //         return socket;
// //       });

// //       socket.on("connect_error", (error) => {
// //         console.error("Error de conexión con", server, error);
// //         socket.close();
// //       });
// //     } catch (error) {
// //       console.error("Error al intentar conexión con", server, error);
// //     }
// //   }

// //   return null;
// // }

// // function App() {
// //   const [message, setMessage] = useState("");
// //   const [chat, setChat] = useState([]);

// //   useEffect(() => {
// //     socket = connectToServer();

// //     if (socket) {
// //       socket.on("message", (msg) => {
// //         setChat((prevChat) => [...prevChat, msg]);
// //       });
// //     }

// //     return () => {
// //       if (socket) {
// //         socket.off("message");
// //         socket.close();
// //       }
// //     };
// //   }, []);

// //   const sendMessage = () => {
// //     if (socket) {
// //       socket.emit("message", message);
// //       setMessage("");
// //     }
// //   };

// //   return (
// //     <div>
// //       <h1>Chat en Tiempo Real</h1>
// //       <div>
// //         {chat.map((msg, index) => (
// //           <div key={index}>{msg}</div>
// //         ))}
// //       </div>
// //       <input
// //         type="text"
// //         value={message}
// //         onChange={(e) => setMessage(e.target.value)}
// //       />
// //       <button onClick={sendMessage}>Enviar</button>
// //     </div>
// //   );
// // }

// // export default App;

// import React, { useState, useEffect } from "react";
// import io from "socket.io-client";

// const servers = ["http://localhost:3001", "http://localhost:3002"];

// function App() {
//   const [message, setMessage] = useState("");
//   const [chat, setChat] = useState([]);
//   const [socket, setSocket] = useState(null);

//   useEffect(() => {
//     const connectToServer = async () => {
//       for (const server of servers) {
//         try {
//           const newSocket = io(server, {
//             reconnectionAttempts: 2,
//             timeout: 10000,
//           });

//           await new Promise((resolve, reject) => {
//             newSocket.on("connect", () => {
//               console.log("Conectado al servidor:", server);
//               setSocket(newSocket);
//               resolve();
//             });

//             newSocket.on("connect_error", (error) => {
//               console.error("Error de conexión con", server, error);
//               newSocket.close();
//               reject(error);
//             });
//           });

//           // Si llegamos aquí, la conexión fue exitosa
//           break;
//         } catch (error) {
//           console.error("Error al intentar conexión con", server, error);
//         }
//       }
//     };

//     connectToServer();

//     return () => {
//       if (socket) {
//         socket.off("message");
//         socket.close();
//       }
//     };
//   }, []);

//   useEffect(() => {
//     if (socket) {
//       socket.on("message", (msg) => {
//         setChat((prevChat) => [...prevChat, msg]);
//       });
//     }
//   }, [socket]);

//   const sendMessage = () => {
//     if (socket) {
//       socket.emit("message", message);
//       setMessage("");
//     } else {
//       console.error("No hay conexión al servidor");
//     }
//   };

//   return (
//     <div>
//       <h1>Chat en Tiempo Real</h1>
//       <div>
//         {chat.map((msg, index) => (
//           <div key={index}>{msg}</div>
//         ))}
//       </div>
//       <input
//         type="text"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//       />
//       <button onClick={sendMessage}>Enviar</button>
//     </div>
//   );
// }

// export default App;



import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const servers = ["http://localhost:3001", "http://localhost:3002"];
const reconnectionAttempts = 3;

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [socket, setSocket] = useState(null);
  const [currentServerIndex, setCurrentServerIndex] = useState(0);

  useEffect(() => {
    const connectToServer = (serverIndex = 0) => {
      const newSocket = io(servers[serverIndex], {
        reconnectionAttempts: reconnectionAttempts,
        reconnectionDelay: 1000,
      });

      newSocket.on("connect", () => {
        console.log("Conectado al servidor:", servers[serverIndex]);
        setSocket(newSocket);
        setCurrentServerIndex(serverIndex);
      });

      newSocket.on("connect_error", (error) => {
        console.error("Error de conexión con", servers[serverIndex], error);
        if (serverIndex + 1 < servers.length) {
          connectToServer(serverIndex + 1);
        } else {
          console.error("No se pudo conectar a ningún servidor");
        }
      });

      newSocket.on("disconnect", () => {
        console.warn("Desconectado del servidor:", servers[serverIndex]);
        setSocket(null);
      });
    };

    connectToServer();

    return () => {
      if (socket) {
        socket.off("message");
        socket.close();
      }
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("message", (msg) => {
        setChat((prevChat) => [...prevChat, msg]);
      });

      return () => {
        socket.off("message");
      };
    }
  }, [socket]);

  const sendMessage = () => {
    if (socket) {
      socket.emit("message", message);
      setMessage("");
    } else {
      console.error("No hay conexión al servidor");
    }
  };

  return (
    <div>
      <h1>Chat en Tiempo Real</h1>
      <div>
        {chat.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Enviar</button>
    </div>
  );
}

export default App;
