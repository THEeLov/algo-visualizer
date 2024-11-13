import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { GraphContextProvider } from "./contexts/GraphContext.tsx";
import { DialogsContextProvider } from "./contexts/DialogsContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DialogsContextProvider>
      <GraphContextProvider>
        <App />
      </GraphContextProvider>
    </DialogsContextProvider>
  </StrictMode>
);
