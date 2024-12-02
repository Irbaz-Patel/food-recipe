import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import FavoritesProvider from "./context/index.jsx";

createRoot(document.getElementById("root")).render(
  <FavoritesProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </FavoritesProvider>
);