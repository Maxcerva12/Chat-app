// src/routers/AuthRouter.js
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import { auth } from "../firebase/Confing-firebase";
import { login } from "../actions/AuthActions.js";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import Approuter from "./AppRouter.jsx";
import PublicRoutes from "./PublicRoutes.jsx";
import PrivateRoutes from "./PrivateRoutes.jsx";
import { loadUserMessages } from "../helpers/LoadData.js"; // Cambiamos LoadData por loadUserMessages
import LoadingScreen from "../components/LoadingScreen.jsx";

const AuthRouter = () => {
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(login(user.uid, user.displayName));
        setIsLoggedIn(true);
        // dispatch(loadUserMessages(user.uid)); // Cargar mensajes del usuario autenticado
      } else {
        setIsLoggedIn(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [dispatch]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoutes auth={isLoggedIn}>
              <Login />
            </PublicRoutes>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoutes auth={isLoggedIn}>
              <Register />
            </PublicRoutes>
          }
        />
        <Route
          path="/*"
          element={
            <PrivateRoutes auth={isLoggedIn}>
              <Approuter /> {/* Ruta principal de la aplicación de chat */}
            </PrivateRoutes>
          }
        />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default AuthRouter;
