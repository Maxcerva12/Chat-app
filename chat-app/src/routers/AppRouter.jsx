import React from "react";
import { Route, Routes } from "react-router-dom";
import AppScreen from "../pages/AppScreen.jsx";

const Approuter = () => {
  return (
    <Routes>
      <Route path="/app" element={<AppScreen />} />
    </Routes>
  );
};

export default Approuter;
