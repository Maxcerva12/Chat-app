import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { db, auth } from "../firebase/Confing-firebase";
import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { checkAuthState } from "../actions/AuthActions";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import UsersList from "../components/UsersList";
import { useNavigate } from "react-router-dom";
import Notification from "../components/Notification"; 
import "../Styles/AppScreen.css";
import EmojiPicker from "emoji-picker-react";

const servers = [
  "http://localhost:3001",
  "http://localhost:3002",
  "http://10.26.41.81:3003",
];
const reconnectionAttempts = 3;

function AppScreen() {
  const [showPicker, setShowPicker] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [socket, setSocket] = useState(null);
  const [currentRoom, setCurrentRoom] = useState("public");
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [notifications, setNotifications] = useState([]); // Lista de notificaciones
  const [connectedServerIndex, setConnectedServerIndex] = useState(null); // Saber cuál servidor está activo
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const chatMessagesRef = useRef(null);

  useEffect(() => {
    dispatch(checkAuthState());
  }, [dispatch]);

  useEffect(() => {
    const connectToServer = (serverIndex = 0) => {
      const newSocket = io(servers[serverIndex], {
        reconnectionAttempts: reconnectionAttempts,
        reconnectionDelay: 1000,
      });

      newSocket.on("connect", () => {
        console.log("Conectado al servidor:", servers[serverIndex]);
        setSocket(newSocket);
        setConnectedServerIndex(serverIndex); // Guardamos el índice del servidor activo
        setNotifications((prevNotifications) => [
          ...prevNotifications,
          { message: `Servidor ${serverIndex + 1} se activó`, type: "success" },
        ]);
        newSocket.emit("joinRoom", currentRoom);
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
        setNotifications((prevNotifications) => [
          ...prevNotifications,
          { message: `Servidor ${serverIndex + 1} se cayó`, type: "error" },
        ]);
      });

      newSocket.on("newMessage", (msg) => {
        setChat((prevChat) => [...prevChat, msg]);
      });
    };

    connectToServer();

    return () => {
      if (socket) {
        socket.off("newMessage");
        socket.close();
      }
    };
  }, [currentRoom]);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "messages"),
      where("roomId", "==", currentRoom),
      orderBy("timestamp", "asc")
    );

    setLoadingMessages(true);

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setChat(messages);
      setLoadingMessages(false);
    });

    return () => unsubscribe();
  }, [user, currentRoom]);

  const sendMessage = async () => {
    if (socket && message.trim() !== "" && user) {
      const messageData = {
        roomId: currentRoom,
        userId: user.uid,
        username: user.displayName || "Usuario anónimo",
        message: message,
        timestamp: new Date().toISOString(),
      };

      try {
        await addDoc(collection(db, "messages"), messageData);
        socket.emit("sendMessage", messageData);
        setMessage("");
      } catch (error) {
        console.error("Error enviando mensaje:", error);
      }
    } else {
      console.error("No hay conexión al servidor o mensaje vacío");
    }
  };

  const scrollToBottom = () => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  return (
    <div className="app-screen">
      <Navbar />
      <div className="chat-container">
        <div className="row">
          <div className="col s12 m8 l9">
            <div className="card">
              <div className="card-content">
                <span className="card-title">Chat en Tiempo Real</span>
                <div className="chat-messages" ref={chatMessagesRef}>
                  {loadingMessages ? (
                    <div className="progress">
                      <div className="indeterminate"></div>
                    </div>
                  ) : (
                    chat.map((msg, index) => (
                      <div
                        key={index}
                        className={`message ${
                          user && msg.userId === user.uid ? "right-align" : ""
                        }`}
                      >
                        <div className="avatar">
                          {msg.username.charAt(0).toUpperCase()}
                        </div>
                        <div className="content">
                          <div className="username">{msg.username}</div>
                          <p>{msg.message}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
              <div className="card-action message-input-container">
                <div className="message-input-wrapper">
                  <div
                    className="emoji-button"
                    onClick={() => setShowPicker(!showPicker)}
                  >
                    <i className="material-icons">sentiment_satisfied_alt</i>
                  </div>
                  {showPicker && (
                    <div className="emoji-picker">
                      <EmojiPicker
                        onEmojiClick={(emojiObject) => {
                          setMessage(message + emojiObject.emoji);
                          setShowPicker(false);
                        }}
                      />
                    </div>
                  )}
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Escribe un mensaje..."
                    className="message-input"
                  />
                  <button
                    className="btn-send waves-effect waves-light"
                    onClick={sendMessage}
                  >
                    <i className="material-icons">send</i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col s12 m4 l3">
            <UsersList />
          </div>
        </div>
      </div>
      <Footer />

      {/* Renderizar notificaciones */}
      <div className="notification-container">
        {notifications.map((notif, index) => (
          <Notification
            key={index}
            message={notif.message}
            type={notif.type}
            duration={5000} // Puedes ajustar la duración
          />
        ))}
      </div>
    </div>
  );
}

export default AppScreen;
