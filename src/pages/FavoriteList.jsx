import React, { useContext } from "react";
import { FavoritesContext } from "../context";
import { Link } from "react-router-dom";

const FavoriteList = () => {
  const { favorites, removeFavorite, theme } = useContext(FavoritesContext);
  // const { theme } = useContext(FavoritesContext);

  return (
    <>
      <div className="h-100 mt-5 d-flex justify-content-center gap-4">
        {favorites && favorites.length > 0 ? (
          favorites.map((recipe) => (
            <div key={recipe.id}>
              <div>
                <div
                  className={`card ${
                    theme === "dark"
                      ? "bg-light text-dark"
                      : "bg-dark text-light"
                  }`}
                  style={{ width: "20rem", height: "22rem" }}
                >
                  <img
                    src={recipe.image}
                    className="card-img-top"
                    alt={recipe.title}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{recipe.title}</h5>
                    <Link
                      to={"/recipe/" + recipe.id}
                      className="btn btn-primary me-2"
                    >
                      View Recipe
                    </Link>
                    <button
                      className="btn btn-primary"
                      onClick={() => removeFavorite(recipe.id)}
                    >
                      Remove Favorites
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="container my-3">
            <p className="text-center fs-2">Nothing is added in favorites.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default FavoriteList;
