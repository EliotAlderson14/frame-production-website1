import React from "react";
import ReactDOM from "react-dom/client";
import "@/index.css";
import App from "@/App.jsx";
import { PreferencesProvider } from "@/context/Preferences";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <PreferencesProvider><App /></PreferencesProvider>
  </React.StrictMode>,
);
