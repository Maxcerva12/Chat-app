import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ auth, children }) => {
  if (!auth) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default PrivateRoutes;
