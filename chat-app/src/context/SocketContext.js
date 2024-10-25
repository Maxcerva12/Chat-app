import React, { createContext, useContext, useState } from "react";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  const connectSocket = (serverUrl) => {
    const newSocket = io(serverUrl);
    setSocket(newSocket);
    return newSocket;
  };

  return (
    <SocketContext.Provider value={{ socket, connectSocket }}>
      {children}
    </SocketContext.Provider>
  );
};
