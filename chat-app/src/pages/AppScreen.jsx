import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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
    <div className="app-screen">
      <Navbar />
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
      <Footer />
    </div>
  );
}

export default App;
