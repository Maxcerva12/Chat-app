import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoutes = ({ auth, children }) => {
  if (auth) {
    // Si el usuario está autenticado, redirige a la página principal
    return <Navigate to="/app" replace />;
  }
  // Si el usuario no está autenticado, muestra el componente hijo
  return children;
};

export default PublicRoutes;
