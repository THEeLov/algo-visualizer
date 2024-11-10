import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { GraphContextProvider } from "./contexts/GraphContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GraphContextProvider>
      <App />
    </GraphContextProvider>
  </StrictMode>
);
