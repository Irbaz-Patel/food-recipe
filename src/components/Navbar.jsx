import React, { useContext, useRef } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { FavoritesContext } from "../context";

const Navbar = () => {
  const { theme, toggleTheme } = useContext(FavoritesContext);
  const navbarCollapseRef = useRef();

  const handleLinkClick = () => {
    if (navbarCollapseRef.current) {
      navbarCollapseRef.current.classList.remove("show");
      // console.log(navbarCollapseRef.current)
    }
  };

  return (
    <>
      {/* <nav
        className={`navbar navbar-expand-lg fixed-top mb-5 ${
          theme === "dark" ? "navbar-primary bg-light" : "navbar-dark bg-dark"
        }`}
      >
        <div className="container-fluid">
          <Link className="navbar-brand fs-3" to="/">
            Platozo 🍝
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav d-flex justify-content-center m-auto me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link px-4 fs-5" aria-current="page">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link px-4 fs-5"
                  to={"/cuisine/American"}
                >
                  American
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link px-4 fs-5" to={"/cuisine/Italian"}>
                  Italian
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link px-4 fs-5"
                  to={"/cuisine/Japanese"}
                >
                  Japanese
                </NavLink>
              </li>
              <li className="nav-item">
                <Link className="nav-link px-4 fs-5" to={"/favorites"}>
                  Favorites
                </Link>
              </li>
            </ul>
          <div className="dark-btn">
          <button className="btn" onClick={toggleTheme}>
              {theme === "dark" ? (
                <FaSun color="#B59B00" />
              ) : (
                <FaMoon color="gray" />
              )}
            </button>
          </div>
          </div>
        </div>
      </nav> */}

      <nav
        className={`navbar navbar-expand-lg fixed-top mb-5 ${
          theme === "dark" ? "navbar-primary bg-light" : "navbar-dark bg-dark"
        }`}
      >
        <div className="container-fluid">
          <Link className="navbar-brand fs-3" to="/">
            Platozo 🍝
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            ref={navbarCollapseRef}
            className="collapse navbar-collapse"
            id="navbarNav"
          >
            <ul className="navbar-nav d-flex justify-content-center m-auto me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  to="/"
                  className="nav-link px-4 fs-5"
                  aria-current="page"
                  onClick={handleLinkClick}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link px-4 fs-5"
                  to="/cuisine/American"
                  onClick={handleLinkClick}
                >
                  American
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link px-4 fs-5"
                  to="/cuisine/Italian"
                  onClick={handleLinkClick}
                >
                  Italian
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link px-4 fs-5"
                  to="/cuisine/Japanese"
                  onClick={handleLinkClick}
                >
                  Japanese
                </NavLink>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link px-4 fs-5"
                  to="/favorites"
                  onClick={handleLinkClick}
                >
                  Favorites
                </Link>
              </li>
            </ul>
            <div className="dark-btn">
              <button className="btn" onClick={toggleTheme}>
                {theme === "dark" ? (
                  <FaSun color="#B59B00" />
                ) : (
                  <FaMoon color="gray" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
