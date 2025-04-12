import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import './i18n.js';
import { BrowserRouter as Router, Routes, Route, useNavigate, BrowserRouter } from 'react-router-dom';


let persistor = persistStore(store);

createRoot(document.getElementById("root")).render(
  <StrictMode>
  <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={<div>Loading ...</div>} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
      </BrowserRouter>
  </StrictMode>
);
