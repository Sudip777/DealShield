import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./theme.jsx";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-indigo/theme.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <PrimeReactProvider>
        <App />
      </PrimeReactProvider>
    </ThemeProvider>
  </React.StrictMode>
);
