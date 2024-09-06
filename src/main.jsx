import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ActionProvider } from "./context/ActionProvider"; // Import ActionProvider, not ActionContext

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ActionProvider>
      <App />
    </ActionProvider>
  </StrictMode>
);
