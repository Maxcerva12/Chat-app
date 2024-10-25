// // // PrivateChatScreen.jsx
// // import React, { useState, useEffect } from "react";
// // import { useParams } from "react-router-dom";
// // import { useSocket } from "../context/SocketContext"; // Asegúrate de importar el contexto de socket

// // function PrivateChatScreen() {
// //   const [message, setMessage] = useState("");
// //   const [chat, setChat] = useState([]);
// //   const { uid } = useParams();
// //   const { socket } = useSocket(); // Usar el contexto para obtener el socket

// //   useEffect(() => {
// //     if (socket) {
// //       socket.on("newMessage", (msg) => {
// //         console.log("Mensaje recibido:", msg); // Añadir un log para depurar
// //         setChat((prevChat) => [...prevChat, msg]);
// //       });
// //     }

// //     return () => {
// //       if (socket) {
// //         socket.off("newMessage");
// //       }
// //     };
// //   }, [socket]);

// //   const sendMessage = () => {
// //     if (socket && message.trim() !== "") {
// //       const messageData = {
// //         roomId: `private-${uid}`,
// //         message: message,
// //         timestamp: new Date().toISOString(),
// //       };
// //       socket.emit("message", messageData);
// //       setMessage("");
// //     }
// //   };

// //   return (
// //     <div>
// //       <h2>Chat Privado</h2>
// //       <div>
// //         {chat.map((msg, index) => (
// //           <div key={index}>{msg.message}</div>
// //         ))}
// //       </div>
// //       <input
// //         type="text"
// //         value={message}
// //         onChange={(e) => setMessage(e.target.value)}
// //         placeholder="Escribe un mensaje..."
// //       />
// //       <button onClick={sendMessage}>Enviar</button>
// //     </div>
// //   );
// // }

// // export default PrivateChatScreen;

// // // PrivateChatScreen.jsx
// // import React, { useState, useEffect } from "react";
// // import { useParams } from "react-router-dom";
// // import { useSocket } from "../context/SocketContext"; // Asegúrate de importar el contexto

// // function PrivateChatScreen() {
// //   const [message, setMessage] = useState("");
// //   const [chat, setChat] = useState([]);
// //   const { uid } = useParams();
// //   const { socket } = useSocket(); // Usar el contexto para obtener el socket

// //   useEffect(() => {
// //     if (socket && uid) {
// //       const roomId = `private-${uid}`;
// //       socket.emit("joinRoom", roomId);

// //       socket.on("newMessage", (msg) => {
// //         setChat((prevChat) => [...prevChat, msg]);
// //       });

// //       return () => {
// //         socket.off("newMessage");
// //       };
// //     }
// //   }, [socket, uid]);

// //   const sendMessage = () => {
// //     if (socket && message.trim() !== "") {
// //       const roomId = `private-${uid}`;
// //       const messageData = {
// //         roomId: roomId,
// //         message: message,
// //         timestamp: new Date().toISOString(),
// //       };
// //       socket.emit("message", messageData);
// //       setChat((prevChat) => [...prevChat, messageData]);
// //       setMessage("");
// //     }
// //   };

// //   return (
// //     <div>
// //       <h2>Chat Privado</h2>
// //       <div>
// //         {chat.map((msg, index) => (
// //           <div key={index}>{msg.message}</div>
// //         ))}
// //       </div>
// //       <input
// //         type="text"
// //         value={message}
// //         onChange={(e) => setMessage(e.target.value)}
// //         placeholder="Escribe un mensaje..."
// //       />
// //       <button onClick={sendMessage}>Enviar</button>
// //     </div>
// //   );
// // }

// // export default PrivateChatScreen;
// // estse es el bueni

// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { useSocket } from "../context/SocketContext";
// import { db } from "../firebase/Confing-firebase";
// import {
//   collection,
//   addDoc,
//   query,
//   where,
//   orderBy,
//   onSnapshot,
// } from "firebase/firestore";
// import { useSelector } from "react-redux";

// function PrivateChatScreen() {
//   const [message, setMessage] = useState("");
//   const [chat, setChat] = useState([]);
//   const { uid } = useParams();
//   const { socket } = useSocket();
//   const user = useSelector((state) => state.auth.user);

//   useEffect(() => {
//     if (socket && uid && user) {
//       const roomId = `private-${uid}`;
//       socket.emit("joinRoom", roomId);

//       // Cargar mensajes desde Firebase
//       const q = query(
//         collection(db, "privateMessages"),
//         where("roomId", "==", roomId),
//         orderBy("timestamp", "asc")
//       );

//       const unsubscribe = onSnapshot(q, (snapshot) => {
//         const messages = snapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         console.log("Mensajes cargados:", messages);
//         setChat(messages);
//       });

//       socket.on("newMessage", (msg) => {
//         setChat((prevChat) => [...prevChat, msg]);
//       });

//       return () => {
//         socket.off("newMessage");
//         unsubscribe();
//       };
//     }
//   }, [socket, uid, user]);

//   const sendMessage = async () => {
//     if (socket && message.trim() !== "" && user) {
//       const roomId = `private-${uid}`;
//       const messageData = {
//         roomId: roomId,
//         userId: user.uid,
//         username: user.displayName || "Usuario anónimo",
//         message: message,
//         timestamp: new Date().toISOString(),
//       };

//       try {
//         // Guardar mensaje en Firebase
//         await addDoc(collection(db, "privateMessages"), messageData);
//         socket.emit("message", messageData);
//         setMessage("");
//       } catch (error) {
//         console.error("Error al enviar mensaje:", error);
//       }
//     }
//   };

//   return (
//     <div>
//       <h2>Chat Privado</h2>
//       <div>
//         {chat.map((msg) => (
//           <div key={msg.id}>
//             <strong>{msg.username}: </strong>
//             {msg.message}
//           </div>
//         ))}
//       </div>
//       <input
//         type="text"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         placeholder="Escribe un mensaje..."
//       />
//       <button onClick={sendMessage}>Enviar</button>
//     </div>
//   );
// }

// export default PrivateChatScreen;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSocket } from "../context/SocketContext";
import { db } from "../firebase/Confing-firebase";
import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { useSelector } from "react-redux";

function PrivateChatScreen() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const { uid } = useParams(); // Aquí uid debería ser el ID del usuario con quien estás chateando
  const { socket } = useSocket();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (socket && uid && user) {
      const roomId = `private-${[user.uid, uid].sort().join("-")}`; // Asegurarse de que ambos usuarios generen el mismo roomId
      socket.emit("joinRoom", roomId);

      // Cargar mensajes desde Firebase
      const q = query(
        collection(db, "privateMessages"),
        where("roomId", "==", roomId),
        orderBy("timestamp", "asc")
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const messages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Mensajes cargados:", messages);
        setChat(messages);
      });

      socket.on("newMessage", (msg) => {
        setChat((prevChat) => [...prevChat, msg]);
      });

      return () => {
        socket.off("newMessage");
        unsubscribe();
      };
    }
  }, [socket, uid, user]);

  const sendMessage = async () => {
    if (socket && message.trim() !== "" && user) {
      const roomId = `private-${[user.uid, uid].sort().join("-")}`;
      const messageData = {
        roomId: roomId,
        userId: user.uid,
        username: user.displayName || "Usuario anónimo",
        message: message,
        timestamp: new Date().toISOString(),
      };

      try {
        // Guardar mensaje en Firebase
        await addDoc(collection(db, "privateMessages"), messageData);
        socket.emit("sendMessage", messageData);
        setMessage("");
      } catch (error) {
        console.error("Error al enviar mensaje:", error);
      }
    }
  };

  return (
    <div>
      <h2>Chat Privado</h2>
      <div>
        {chat.map((msg) => (
          <div key={msg.id}>
            <strong>{msg.username}: </strong>
            {msg.message}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Escribe un mensaje..."
      />
      <button onClick={sendMessage}>Enviar</button>
    </div>
  );
}

export default PrivateChatScreen;
