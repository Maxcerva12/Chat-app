// ConnectedUsers.jsx
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchConnectedUsers,
  startPrivateChat,
} from "../redux/actions/chatActions";

const ConnectedUsers = () => {
  const dispatch = useDispatch();
  const connectedUsers = useSelector((state) => state.chat.connectedUsers);

  useEffect(() => {
    dispatch(fetchConnectedUsers());
  }, [dispatch]);

  const handlePrivateChat = (recipient) => {
    dispatch(startPrivateChat(recipient));
  };

  return (
    <div>
      <h2>Usuarios Conectados</h2>
      <ul>
        {connectedUsers.map((user) => (
          <li key={user.id}>
            {user.displayName}
            <button onClick={() => handlePrivateChat(user)}>Charlemos</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConnectedUsers;
