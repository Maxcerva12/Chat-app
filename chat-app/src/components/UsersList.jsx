import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";

const UsersList = ({ socket, currentRoom }) => {
  const [users, setUsers] = useState([]);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (socket) {
      socket.emit("getUsersInRoom", currentRoom);

      socket.on("usersInRoom", (usersList) => {
        setUsers(usersList);
      });

      return () => {
        socket.off("usersInRoom");
      };
    }
  }, [socket, currentRoom]);

  const sendPrivateChatRequest = (toUser) => {
    socket.emit("privateChatRequest", { fromUser: user, toUser });
  };

  return (
    <div className="users-list">
      <h2>Usuarios en la Sala Pública</h2>
      <ul>
        {users.map((usr) => (
          <li key={usr.uid}>
            {usr.displayName}{" "}
            {usr.uid !== user.uid && (
              <button onClick={() => sendPrivateChatRequest(usr)}>
                Chat Privado
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
