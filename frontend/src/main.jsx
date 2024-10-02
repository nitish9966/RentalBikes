// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter
import App from "./App.jsx";
import "./index.css";
import { BikeProvider } from "./context/BikeContent.jsx";

// Create the root element and render the application
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BikeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </BikeProvider>
  </React.StrictMode>
);
