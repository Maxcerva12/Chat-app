import React from "react";
import { Provider } from "react-redux";
import { store } from "./store/Store.js";
import AuthRouter from "./routers/AuthRouter.jsx";

function App() {
  return (
    <Provider store={store}>
      <AuthRouter />
    </Provider>
  );
}

export default App;
