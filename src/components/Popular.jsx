import React, { useContext, useEffect, useRef, useState } from "react";
import "glider-js/glider.min.css";
import Glider from "glider-js";
import { Link } from "react-router-dom";
import Loading from "../context/Loading";
import { FavoritesContext } from "../context"

const Popular = () => {
  const [popular, setPopular] = useState([]);
  const [loading, setLoading] = useState(null);
  const { theme } = useContext(FavoritesContext);
  const gliderRef = useRef();

  // Fetch popular recipes
  const fetchPopular = async () => {
    setLoading(true);
    const check = localStorage.getItem("popular");

    if (check) {
      setPopular(JSON.parse(check));
      setLoading(false);
    } else {
      try {
        const res = await fetch(
          `https://api.spoonacular.com/recipes/random?apiKey=${
            import.meta.env.VITE_API_KEY
          }&number=9`
        );

        const data = await res.json();

        localStorage.setItem("popular", JSON.stringify(data.recipes));
        setPopular(data.recipes);
        setLoading(false);
      } catch (error) {
        console.error("Something went wrong:", error);
      }
    }
  };

  // Initialize Glider.js
  useEffect(() => {
    fetchPopular();
  }, []); 

  useEffect(() => {
    if (gliderRef.current && popular.length > 0) {
      new Glider(gliderRef.current, {
        slidesToShow: 1,
        slidesToScroll: 1,
        draggable: true,
        dots: "#popular-dots", // Use unique dots ID
        arrows: {
          prev: "#popular-prev",
          next: "#popular-next",
        },
        itemMargin: 24,
        responsive: [
          { breakpoint: 768, settings: { slidesToShow: 2 } },
          { breakpoint: 1024, settings: { slidesToShow: 3 } },
        ],
      });
    }
  }, [popular]);

  if (loading) return <Loading />;

  return (
    <div className="container my-5 py-5">
      <h1>Our Popular Picks</h1>

      {popular && popular.length > 0 ? (
        <div
          style={{ flexDirection: "column", gap: "1rem" }}
          className="glider-contain h-50"
        >
          {/* <button id="glider-prev">←</button> */}
          <div className="glider" ref={gliderRef} id="popular">
            {popular.map((recipe, id) => (
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
          {/* <button id="glider-next">→</button> */}
          <div id="popular-dots"></div>
        </div>
      ) : null}
    </div>
  );
};

export default Popular;
