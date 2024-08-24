import React from "react";
import "../Styles/LoadingScreen.css";

const LoadingScreen = () => {
  return (
    <div className="loading-page">
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Cargando...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
