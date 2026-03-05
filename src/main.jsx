import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import "./css/App.css";
import "./css/hero.css";
import "./css/process.css";
import "./css/categories.css";
import "./css/contact.css";

import App from "./App.jsx";
import { initScrollObserver } from "./utils/scrollObserver.js";

// Initialize scroll animations
initScrollObserver();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
