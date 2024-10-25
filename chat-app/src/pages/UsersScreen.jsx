// // // // // // // UsersScreen.jsx
// // // // // // import React, { useState, useEffect } from "react";
// // // // // // import { useSelector } from "react-redux";
// // // // // // import { useNavigate } from "react-router-dom";

// // // // // // function UsersScreen({ socket }) {
// // // // // //   const [activeUsers, setActiveUsers] = useState([]);
// // // // // //   const user = useSelector((state) => state.auth.user);
// // // // // //   const navigate = useNavigate();

// // // // // //   useEffect(() => {
// // // // // //     if (socket) {
// // // // // //       socket.emit("getActiveUsers");

// // // // // //       socket.on("activeUsers", (users) => {
// // // // // //         setActiveUsers(users);
// // // // // //       });
// // // // // //     }

// // // // // //     return () => {
// // // // // //       if (socket) {
// // // // // //         socket.off("activeUsers");
// // // // // //       }
// // // // // //     };
// // // // // //   }, [socket]);

// // // // // //   const handlePrivateChat = (toUser) => {
// // // // // //     const fromUser = {
// // // // // //       uid: user.uid,
// // // // // //       displayName: user.displayName,
// // // // // //       socketId: socket.id,
// // // // // //     };
// // // // // //     socket.emit("privateChatRequest", { fromUser, toUser });
// // // // // //     navigate(`/private-chat/${toUser.uid}`);
// // // // // //   };

// // // // // //   return (
// // // // // //     <div>
// // // // // //       <h2>Usuarios Activos</h2>
// // // // // //       <ul>
// // // // // //         {activeUsers.map((u) => (
// // // // // //           <li key={u.uid}>
// // // // // //             {u.displayName}
// // // // // //             <button onClick={() => handlePrivateChat(u)}>Charlemos</button>
// // // // // //           </li>
// // // // // //         ))}
// // // // // //       </ul>
// // // // // //     </div>
// // // // // //   );
// // // // // // }

// // // // // // export default UsersScreen;

// // // // // // import React, { useState, useEffect } from "react";
// // // // // // import { useSelector } from "react-redux";
// // // // // // import { useNavigate } from "react-router-dom";
// // // // // // import io from "socket.io-client";

// // // // // // const socket = io("http://localhost:3001"); // Asegúrate de que este sea el mismo servidor que en el resto de la app

// // // // // // function UsersScreen() {
// // // // // //   const [users, setUsers] = useState([]);
// // // // // //   const user = useSelector((state) => state.auth.user);
// // // // // //   const navigate = useNavigate();

// // // // // //   useEffect(() => {
// // // // // //     if (socket) {
// // // // // //       // Escuchar la lista de usuarios desde el servidor
// // // // // //       socket.on("usersList", (usersList) => {
// // // // // //         setUsers(usersList);
// // // // // //       });

// // // // // //       // Registrar el usuario en el servidor
// // // // // //       if (user) {
// // // // // //         socket.emit("registerUser", {
// // // // // //           uid: user.uid,
// // // // // //           displayName: user.displayName,
// // // // // //         });
// // // // // //       }

// // // // // //       // Solicitar la lista de usuarios activos
// // // // // //       socket.emit("getActiveUsers");

// // // // // //       // Escuchar la lista de usuarios activos
// // // // // //       socket.on("activeUsers", (users) => {
// // // // // //         setUsers(users);
// // // // // //       });
// // // // // //     }

// // // // // //     return () => {
// // // // // //       if (socket) {
// // // // // //         socket.off("usersList");
// // // // // //         socket.off("activeUsers");
// // // // // //       }
// // // // // //     };
// // // // // //   }, [socket, user]);

// // // // // //   const handlePrivateChat = (toUser) => {
// // // // // //     const fromUser = {
// // // // // //       uid: user.uid,
// // // // // //       displayName: user.displayName,
// // // // // //       socketId: socket.id,
// // // // // //     };
// // // // // //     socket.emit("privateChatRequest", { fromUser, toUser });
// // // // // //     navigate(`/private-chat/${toUser.uid}`);
// // // // // //   };

// // // // // //   return (
// // // // // //     <div>
// // // // // //       <h2>Usuarios Activos</h2>
// // // // // //       <ul>
// // // // // //         {users.map((u) => (
// // // // // //           <li key={u.uid}>
// // // // // //             {u.displayName}
// // // // // //             <button onClick={() => handlePrivateChat(u)}>Charlemos</button>
// // // // // //           </li>
// // // // // //         ))}
// // // // // //       </ul>
// // // // // //     </div>
// // // // // //   );
// // // // // // }

// // // // // // export default UsersScreen;

// // // // // import React, { useState, useEffect } from "react";
// // // // // import { useSelector } from "react-redux";
// // // // // import { useNavigate, useLocation } from "react-router-dom";

// // // // // function UsersScreen() {
// // // // //   const [users, setUsers] = useState([]);
// // // // //   const user = useSelector((state) => state.auth.user);
// // // // //   const navigate = useNavigate();
// // // // //   const location = useLocation();
// // // // //   const socket = location.state?.socket; // Recupera el socket de la AppScreen

// // // // //   useEffect(() => {
// // // // //     if (socket) {
// // // // //       socket.on("usersList", (usersList) => {
// // // // //         setUsers(usersList);
// // // // //       });

// // // // //       if (user) {
// // // // //         socket.emit("registerUser", {
// // // // //           uid: user.uid,
// // // // //           displayName: user.displayName,
// // // // //         });
// // // // //       }

// // // // //       socket.emit("getActiveUsers");

// // // // //       socket.on("activeUsers", (users) => {
// // // // //         setUsers(users);
// // // // //       });
// // // // //     }

// // // // //     return () => {
// // // // //       if (socket) {
// // // // //         socket.off("usersList");
// // // // //         socket.off("activeUsers");
// // // // //       }
// // // // //     };
// // // // //   }, [socket, user]);

// // // // //   const handlePrivateChat = (toUser) => {
// // // // //     const fromUser = {
// // // // //       uid: user.uid,
// // // // //       displayName: user.displayName,
// // // // //       socketId: socket.id,
// // // // //     };
// // // // //     socket.emit("privateChatRequest", { fromUser, toUser });
// // // // //     navigate(`/private-chat/${toUser.uid}`);
// // // // //   };

// // // // //   return (
// // // // //     <div>
// // // // //       <h2>Usuarios Activos</h2>
// // // // //       <ul>
// // // // //         {users.map((u) => (
// // // // //           <li key={u.uid}>
// // // // //             {u.displayName}
// // // // //             <button onClick={() => handlePrivateChat(u)}>Charlemos</button>
// // // // //           </li>
// // // // //         ))}
// // // // //       </ul>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // export default UsersScreen;

// // // // import React, { useState, useEffect } from "react";
// // // // import { useSelector } from "react-redux";
// // // // import { useNavigate } from "react-router-dom";
// // // // import { useSocket } from "../context/SocketContext"; // Importar el contexto

// // // // function UsersScreen() {
// // // //   const [users, setUsers] = useState([]);
// // // //   const user = useSelector((state) => state.auth.user);
// // // //   const navigate = useNavigate();
// // // //   const { socket } = useSocket(); // Usar el contexto

// // // //   useEffect(() => {
// // // //     if (socket) {
// // // //       socket.on("usersList", (usersList) => {
// // // //         // Filtrar para excluir al usuario actual
// // // //         const filteredUsers = usersList.filter((u) => u.uid !== user.uid);
// // // //         setUsers(filteredUsers);
// // // //       });

// // // //       if (user) {
// // // //         socket.emit("registerUser", {
// // // //           uid: user.uid,
// // // //           displayName: user.displayName,
// // // //         });
// // // //       }

// // // //       socket.emit("getActiveUsers");

// // // //       socket.on("activeUsers", (users) => {
// // // //         const filteredUsers = users.filter((u) => u.uid !== user.uid);
// // // //         setUsers(filteredUsers);
// // // //       });
// // // //     }

// // // //     return () => {
// // // //       if (socket) {
// // // //         socket.off("usersList");
// // // //         socket.off("activeUsers");
// // // //       }
// // // //     };
// // // //   }, [socket, user]);

// // // //   const handlePrivateChat = (toUser) => {
// // // //     const fromUser = {
// // // //       uid: user.uid,
// // // //       displayName: user.displayName,
// // // //       socketId: socket.id,
// // // //     };
// // // //     socket.emit("privateChatRequest", { fromUser, toUser });
// // // //     navigate(`/private-chat/${toUser.uid}`);
// // // //   };

// // // //   return (
// // // //     <div>
// // // //       <h2>Usuarios Activos</h2>
// // // //       <ul>
// // // //         {users.map((u) => (
// // // //           <li key={u.uid}>
// // // //             {u.displayName}
// // // //             <button onClick={() => handlePrivateChat(u)}>Charlemos</button>
// // // //           </li>
// // // //         ))}
// // // //       </ul>
// // // //     </div>
// // // //   );
// // // // }

// // // // export default UsersScreen;

// // // import React, { useState, useEffect } from "react";
// // // import { useSelector } from "react-redux";
// // // import { useNavigate } from "react-router-dom";
// // // import { useSocket } from "../context/SocketContext"; // Importar el contexto

// // // function UsersScreen() {
// // //   const [users, setUsers] = useState([]);
// // //   const user = useSelector((state) => state.auth.user);
// // //   const navigate = useNavigate();
// // //   const { socket } = useSocket(); // Usar el contexto

// // //   useEffect(() => {
// // //     if (socket) {
// // //       const handleUsersList = (usersList) => {
// // //         // Filtrar para excluir al usuario actual y evitar duplicados
// // //         const filteredUsers = usersList
// // //           .filter((u) => u.uid !== user.uid)
// // //           .reduce((unique, u) => {
// // //             if (!unique.some((user) => user.uid === u.uid)) {
// // //               unique.push(u);
// // //             }
// // //             return unique;
// // //           }, []);
// // //         setUsers(filteredUsers);
// // //       };

// // //       socket.on("usersList", handleUsersList);
// // //       socket.on("activeUsers", handleUsersList);

// // //       if (user) {
// // //         socket.emit("registerUser", {
// // //           uid: user.uid,
// // //           displayName: user.displayName,
// // //         });
// // //       }

// // //       socket.emit("getActiveUsers");

// // //       return () => {
// // //         socket.off("usersList", handleUsersList);
// // //         socket.off("activeUsers", handleUsersList);
// // //       };
// // //     }
// // //   }, [socket, user]);

// // //   // const handlePrivateChat = (toUser) => {
// // //   //   const fromUser = {
// // //   //     uid: user.uid,
// // //   //     displayName: user.displayName,
// // //   //     socketId: socket.id,
// // //   //   };
// // //   //   socket.emit("privateChatRequest", { fromUser, toUser });
// // //   //   const roomId = `private-${toUser.uid}`;
// // //   //   socket.emit("joinRoom", roomId);
// // //   //   navigate(`/private-chat/${toUser.uid}`);
// // //   // };

// // //   const handlePrivateChat = (toUser) => {
// // //     const fromUser = {
// // //       uid: user.uid,
// // //       displayName: user.displayName,
// // //       socketId: socket.id,
// // //     };
// // //     socket.emit("privateChatRequest", { fromUser, toUser });
// // //   };

// // //   useEffect(() => {
// // //     if (socket) {
// // //       // Manejar la recepción de la solicitud de chat privado
// // //       socket.on("privateChatRequest", (fromUser) => {
// // //         const acceptChat = window.confirm(
// // //           `${fromUser.displayName} quiere iniciar un chat privado contigo. ¿Aceptar?`
// // //         );
// // //         if (acceptChat) {
// // //           socket.emit("acceptPrivateChat", { fromUser, toUser: user });
// // //         }
// // //       });

// // //       // Manejar la aceptación del chat privado
// // //       socket.on("privateChatAccepted", (roomId) => {
// // //         navigate(`/private-chat/${roomId}`);
// // //       });
// // //     }

// // //     return () => {
// // //       if (socket) {
// // //         socket.off("privateChatRequest");
// // //         socket.off("privateChatAccepted");
// // //       }
// // //     };
// // //   }, [socket]);

// // //   return (
// // //     <div>
// // //       <h2>Usuarios Activos</h2>
// // //       <ul>
// // //         {users.map((u) => (
// // //           <li key={u.uid}>
// // //             {u.displayName}
// // //             <button onClick={() => handlePrivateChat(u)}>Charlemos</button>
// // //           </li>
// // //         ))}
// // //       </ul>
// // //     </div>
// // //   );
// // // }

// // // export default UsersScreen;

// // import React, { useState, useEffect } from "react";
// // import { useSelector } from "react-redux";
// // import { useNavigate } from "react-router-dom";
// // import { useSocket } from "../context/SocketContext";

// // function UsersScreen() {
// //   const [users, setUsers] = useState([]);
// //   const user = useSelector((state) => state.auth.user);
// //   const navigate = useNavigate();
// //   const { socket } = useSocket();

// //   useEffect(() => {
// //     if (socket) {
// //       const handleUsersList = (usersList) => {
// //         const filteredUsers = usersList
// //           .filter((u) => u.uid !== user.uid)
// //           .reduce((unique, u) => {
// //             if (!unique.some((user) => user.uid === u.uid)) {
// //               unique.push(u);
// //             }
// //             return unique;
// //           }, []);
// //         setUsers(filteredUsers);
// //       };

// //       socket.on("usersList", handleUsersList);
// //       socket.on("activeUsers", handleUsersList);

// //       if (user) {
// //         socket.emit("registerUser", {
// //           uid: user.uid,
// //           displayName: user.displayName,
// //         });
// //       }

// //       socket.emit("getActiveUsers");

// //       // Manejar la recepción de la solicitud de chat privado
// //       socket.on("privateChatRequest", (fromUser) => {
// //         const acceptChat = window.confirm(
// //           `${fromUser.displayName} quiere iniciar un chat privado contigo. ¿Aceptar?`
// //         );
// //         if (acceptChat) {
// //           socket.emit("acceptPrivateChat", { fromUser, toUser: user });
// //         }
// //       });

// //       // Manejar la aceptación del chat privado
// //       socket.on("privateChatAccepted", (roomId) => {
// //         navigate(`/private-chat/${roomId}`);
// //       });

// //       return () => {
// //         socket.off("usersList", handleUsersList);
// //         socket.off("activeUsers", handleUsersList);
// //         socket.off("privateChatRequest");
// //         socket.off("privateChatAccepted");
// //       };
// //     }
// //   }, [socket, user, navigate]);

// //   const handlePrivateChat = (toUser) => {
// //     const fromUser = {
// //       uid: user.uid,
// //       displayName: user.displayName,
// //       socketId: socket.id,
// //     };
// //     socket.emit("privateChatRequest", { fromUser, toUser });
// //   };

// //   return (
// //     <div>
// //       <h2>Usuarios Activos</h2>
// //       <ul>
// //         {users.map((u) => (
// //           <li key={u.uid}>
// //             {u.displayName}
// //             <button onClick={() => handlePrivateChat(u)}>Charlemos</button>
// //           </li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // }

// // export default UsersScreen;

// import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { useSocket } from "../context/SocketContext";

// function UsersScreen() {
//   const [users, setUsers] = useState([]);
//   const user = useSelector((state) => state.auth.user);
//   const navigate = useNavigate();
//   const { socket } = useSocket();

//   useEffect(() => {
//     if (socket && user) {
//       // Emitir el registro de usuario tan pronto como el usuario esté disponible
//       socket.emit("registerUser", {
//         uid: user.uid,
//         displayName: user.displayName,
//       });

//       // Emitir para obtener usuarios activos
//       socket.emit("getActiveUsers");

//       const handleUsersList = (usersList) => {
//         const filteredUsers = usersList.filter((u) => u.uid !== user.uid);
//         setUsers(filteredUsers);
//       };

//       socket.on("activeUsers", handleUsersList);

//       // Manejar la recepción de la solicitud de chat privado
//       socket.on("privateChatRequest", (fromUser) => {
//         const acceptChat = window.confirm(
//           `${fromUser.displayName} quiere iniciar un chat privado contigo. ¿Aceptar?`
//         );
//         if (acceptChat) {
//           socket.emit("acceptPrivateChat", { fromUser, toUser: user });
//         }
//       });

//       // Manejar la aceptación del chat privado
//       socket.on("privateChatAccepted", (roomId) => {
//         navigate(`/private-chat/${roomId}`);
//       });

//       return () => {
//         socket.off("activeUsers", handleUsersList);
//         socket.off("privateChatRequest");
//         socket.off("privateChatAccepted");
//       };
//     }
//   }, [socket, user, navigate]);

//   const handlePrivateChat = (toUser) => {
//     const fromUser = {
//       uid: user.uid,
//       displayName: user.displayName,
//       socketId: socket.id,
//     };
//     socket.emit("privateChatRequest", { fromUser, toUser });
//   };

//   return (
//     <div>
//       <h2>Usuarios Activos</h2>
//       <ul>
//         {users.map((u) => (
//           <li key={u.uid}>
//             {u.displayName}
//             <button onClick={() => handlePrivateChat(u)}>Charlemos</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default UsersScreen;


import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketContext";

function UsersScreen() {
  const [users, setUsers] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const { socket } = useSocket();

  useEffect(() => {
    if (socket && user) {
      console.log("Socket conectado y usuario disponible");

      // Emitir el registro de usuario tan pronto como el usuario esté disponible
      socket.emit("registerUser", {
        uid: user.uid,
        displayName: user.displayName,
      });

      // Emitir para obtener usuarios activos
      socket.emit("getActiveUsers");
      console.log("Evento 'getActiveUsers' emitido");

      const handleUsersList = (usersList) => {
        console.log("Lista de usuarios recibida:", usersList);
        const filteredUsers = usersList.filter((u) => u.uid !== user.uid);
        setUsers(filteredUsers);
      };

      socket.on("activeUsers", handleUsersList);

      // Manejar la recepción de la solicitud de chat privado
      socket.on("privateChatRequest", (fromUser) => {
        const acceptChat = window.confirm(
          `${fromUser.displayName} quiere iniciar un chat privado contigo. ¿Aceptar?`
        );
        if (acceptChat) {
          socket.emit("acceptPrivateChat", { fromUser, toUser: user });
        }
      });

      // Manejar la aceptación del chat privado
      socket.on("privateChatAccepted", (roomId) => {
        navigate(`/private-chat/${roomId}`);
      });

      return () => {
        socket.off("activeUsers", handleUsersList);
        socket.off("privateChatRequest");
        socket.off("privateChatAccepted");
      };
    } else {
      console.log("Socket o usuario no disponible");
    }
  }, [socket, user, navigate]);

  const handlePrivateChat = (toUser) => {
    const fromUser = {
      uid: user.uid,
      displayName: user.displayName,
      socketId: socket.id,
    };
    socket.emit("privateChatRequest", { fromUser, toUser });
  };

  return (
    <div>
      <h2>Usuarios Activos</h2>
      <ul>
        {users.map((u) => (
          <li key={u.uid}>
            {u.displayName}
            <button onClick={() => handlePrivateChat(u)}>Charlemos</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UsersScreen;
