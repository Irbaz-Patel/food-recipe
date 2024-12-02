import React, { useContext, useEffect, useRef, useState } from "react";
import "glider-js/glider.min.css";
import Glider from "glider-js";
import { Link } from "react-router-dom";
import { FavoritesContext } from "../context";

const Veggie = () => {
  const [veggi, setVeggi] = useState([]);
  const { theme } = useContext(FavoritesContext);
  const gliderRef = useRef();

  const fetchVeggi = async () => {
    const check = localStorage.getItem("vegetables");

    if (check) {
      setVeggi(JSON.parse(check));
    } else {
      try {
        const res = await fetch(
          `https://api.spoonacular.com/recipes/random?apiKey=${
            import.meta.env.VITE_API_KEY
          }&number=9&tags=vegetarian`
        );

        const data = await res.json();

        localStorage.setItem("vegetables", JSON.stringify(data.recipes));

        setVeggi(data.recipes);
      } catch (error) {
        console.error("Something went wrong:", error);
      }
    }
  };

  useEffect(() => {
    fetchVeggi();
  }, []); // Fetch only on mount

  useEffect(() => {
    if (gliderRef.current && veggi.length > 0) {
      new Glider(gliderRef.current, {
        slidesToShow: 1,
        slidesToScroll: 1,
        draggable: true,
        dots: "#veggie-dots", // Use unique dots ID
        arrows: {
          prev: "#veggie-prev",
          next: "#veggie-next",
        },
        itemMargin: 24,
        responsive: [
          { breakpoint: 768, settings: { slidesToShow: 2, itemMargin: 24 } },
          { breakpoint: 1024, settings: { slidesToShow: 3, itemMargin: 24 } },
        ],
      });
    }
  }, [veggi]);

  return (
    <div className="container my-5 py-4">
      <h1>Our Veggi Picks</h1>

      {veggi && veggi.length > 0 ? (
        <div
          style={{ flexDirection: "column", gap: "1rem" }}
          className="glider-contain h-50"
        >
          <div className="glider" ref={gliderRef} id="veggi">
            {veggi.map((recipe, id) => (
              <div key={id}>
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
                      className="card-img-top object-fit-contain"
                      alt={recipe.title}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{recipe.title}</h5>
                      <Link
                        to={"/recipe/" + recipe.id}
                        className="btn btn-primary"
                      >
                        View Recipe
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div id="veggie-dots"></div>
        </div>
      ) : null}
    </div>
  );
};

export default Veggie;
