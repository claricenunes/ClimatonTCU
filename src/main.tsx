import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { AccessibilityProvider } from "./context/AccessibilityContext.tsx";
import { EstadoProvider } from "./context/EstadoContext.tsx";
import { ToastProvider } from "./components/ui/Toast.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AccessibilityProvider>
        <EstadoProvider>
          <ToastProvider>
            <App />
          </ToastProvider>
        </EstadoProvider>
      </AccessibilityProvider>
    </BrowserRouter>
  </StrictMode>,
);
