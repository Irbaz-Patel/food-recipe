import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../context/Loading";
import { motion } from "framer-motion";

const Searched = () => {
  const [searchRecipe, setSearchRecipe] = useState([]);
  const [loading, setLoading] = useState(null);
  const [offset, setOffSet] = useState(0);
  const [noResults, setNoResult] = useState(false);
  const { search } = useParams();

  const fetchCuisine = async (name, offset) => {
    setLoading(true);

    if (offset === 0) {
      setSearchRecipe([]);
    }

    const res = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${
        import.meta.env.VITE_API_KEY
      }&query=${name}&number=20&offset=${offset}`
    );

    const data = await res.json();
    if (data.results.length === 0) {
      setNoResult(true);
    }
    setSearchRecipe((prev) => [...prev, ...data.results]);
    setLoading(false);
  };

  useEffect(() => {
    fetchCuisine(search, offset);
  }, [search, offset]);

  const loadMore = () => {
    setOffSet((prevOffset) => prevOffset + 20);
  };

  if (loading && searchRecipe.length === 0) return <Loading />;
  return (
    <div className="py-5">
      <motion.div
        className="container my-4 mx-auto"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1, // Progressive appearance of children
            },
          },
        }}
      >
        {noResults ? (
          <div className="text-center">
            <h2>No Recipes Found</h2>
            <p>Try searching for something else.</p>
          </div>
        ) : (
          <div className="row g-4 justify-content-center">
            {searchRecipe.map((recipe, id) => (
              <motion.div
                key={id}
                className="col-12 col-md-6 col-lg-3"
                whileHover={{ scale: 0.9, opacity: 0.8 }}
                variants={{
                  hidden: { opacity: 0, scale: 0.9 },
                  visible: { opacity: 1, scale: 1 },
                }}
              >
                <div
                  className="card d-flex flex-column"
                  style={{ height: "100%" }}
                >
                  <img
                    src={recipe.image}
                    className="card-img-top"
                    alt={recipe.title}
                    style={{ objectFit: "cover", height: "200px" }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{recipe.title}</h5>
                    <Link
                      to={"/recipe/" + recipe.id}
                      className="btn btn-primary mt-auto"
                      style={{ width: "auto" }}
                    >
                      View Recipe
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
      {!noResults && searchRecipe.length > 0 && (
        <div className="text-center my-4">
          <button
            className="btn btn-secondary"
            onClick={loadMore}
            disabled={offset === 100 ? true : false}
          >
            {offset === 100 ? "No More Data" : "Load More"}
          </button>
        </div>
      )}

      <div className="container-fluid position-relative bottom-0 w-full">
        <footer className="pt-2 my-4">
          <ul className="nav justify-content-center border-bottom pb-3 mb-3">
            <li className="nav-item">
              <Link to={"/"} className="nav-link px-2 text-primary">
                Veggi
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/"} className="nav-link px-2 text-primary">
                Popular
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/favorites"} className="nav-link px-2 text-primary">
                Favorites
              </Link>
            </li>
          </ul>
        </footer>
      </div>
    </div>
  );
};

export default Searched;
