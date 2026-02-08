import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage.jsx";
import DatenschutzPage from "./pages/DatenschutzPage.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/datenschutz" element={<DatenschutzPage />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
}
