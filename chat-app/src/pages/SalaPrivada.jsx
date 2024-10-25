// PrivateRoom.jsx
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";

const socket = io("http://localhost:3001");

const PrivateRoom = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [recipient, setRecipient] = useState(null);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    // Asegúrate de obtener el destinatario de alguna manera, posiblemente de Redux o props
    socket.on("privateMessage", (msg) => {
      setChat((prevChat) => [...prevChat, msg]);
    });

    return () => {
      socket.off("privateMessage");
    };
  }, []);

  const sendMessage = () => {
    socket.emit("privateMessage", { message, recipient, sender: user.uid });
    setMessage("");
  };

  return (
    <div>
      <h1>Sala Privada con {recipient.displayName}</h1>
      <div>
        {chat.map((msg, index) => (
          <div key={index}>
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
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
};

export default PrivateRoom;
