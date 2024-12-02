import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FavoritesContext } from "../context";

const Search = () => {
  const [input, setInput] = useState("");
  const { theme } = useContext(FavoritesContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/searched/" + input);
    setInput('')
  };
  return (
    <>
      <nav className={`navbar w-full mt-5`}>
        <div className="container-fluid d-flex justify-content-end mt-4">
          <form onSubmit={handleSubmit} className="me-5">
            <input
              className={`form-control me-2 ${
                theme === "dark" ? "bg-light text-dark" : "bg-dark text-white"
              } border-0`}
              type="search"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Search"
              aria-label="Search"
            />
          </form>
        </div>
      </nav>
    </>
  );
};

export default Search;
