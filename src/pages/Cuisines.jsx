import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../context/Loading";
import {motion} from 'framer-motion'
import { FavoritesContext } from "../context";

const Cuisines = () => {
  const [cuisine, setCuisine] = useState([]);
  const { id } = useParams();
  const [loading, setLoading] = useState(null);
  const [offset, setOffSet] = useState(0);
  const { theme } = useContext(FavoritesContext);

  const fetchCuisine = async (id, offsetValue) => {
    setLoading(true);
    const res = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${
        import.meta.env.VITE_API_KEY
      }&cuisine=${id}&number=20&offset=${offsetValue}`
    );

    const data = await res.json();
    // console.log(data.results)
    setCuisine((prevcusine) => [...prevcusine, ...data.results]);
    setLoading(false);
  };

  useEffect(() => {
    setCuisine([]);
    fetchCuisine(id, 0);
    setOffSet(0);
  }, [id]);

  useEffect(() => {
    if (offset > 0) {
      fetchCuisine(id, offset);
    }
  }, [offset]);

  const loadMore = () => {
    const newOffset = offset + 20;
    setOffSet(newOffset);
  };

  if (loading && cuisine.length === 0) return <Loading />;
  return (
    <>
      <div
        className="container my-5 pt-5"
      >
        <motion.div className="row"
         initial="hidden"
         animate="visible"
         variants={{
           hidden: { opacity: 0 },
           visible: {
             opacity: 1,
             transition: {
               staggerChildren: 0.1, // Delay each card's animation
             },
           },
         }}
        >
          {cuisine.map((recipe, id) => (
            <motion.div key={id} className="col-md-3 d-flex mb-4"
            whileHover={{scale: 0.9, opacity: 0.8}}
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: { opacity: 1, scale: 1 },
            }}
            >
              <div
                className={`card ${theme === "dark"
                  ? "bg-light text-dark"
                  : "bg-dark text-light"}`}
                style={{ width: "100%", minHeight: "320px" }}
              >
                <img
                  src={recipe.image}
                  className="card-img-top"
                  alt={recipe.title}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5
                    className="card-title text-truncate"
                    style={{ maxWidth: "90%" }}
                  >
                    {recipe.title}
                  </h5>
                  <Link to={"/recipe/" + recipe.id} className="btn btn-primary">
                    View Recipe
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        <div className="text-center my-2">
          <button
            className="btn btn-secondary"
            onClick={loadMore}
            disabled={offset === 100 ? true : false}
          >
            {offset === 100 ? "No More Recipe" : "Load More"}
          </button>
        </div>
      </div>
      <div className="container-fluid mb-5 position-relative bottom-0 w-full">
        <footer className="py-3 my-4">
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
    </>
  );
};

export default Cuisines;
