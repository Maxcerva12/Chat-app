import React, { useEffect, useState } from "react";
import "../Styles/Notification.css"; // Asegúrate de crear este archivo con los estilos que te doy más abajo

const Notification = ({ message, type, duration = 3000 }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Ocultar la notificación después del tiempo definido
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  return <div className={`notification ${type}`}>{message}</div>;
};

export default Notification;
