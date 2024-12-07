import React, { useContext } from "react";
import { FavoritesContext } from "../context";

const Footer = () => {
  const { theme } = useContext(FavoritesContext);
  return (
    <footer
      className={`py-3 w-100 text-center ${
        theme === "dark" ? "bg-light text-dark" : "bg-dark text-light"
      }`}
      style={{ bottom: 0 }}
    >
      <div className="container">
        <p className="mb-0">
          © 2024 Made with ❤️ by <strong>Dev Irbaz</strong>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
