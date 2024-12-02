import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FavoritesContext } from "../context";

const RecipeDetail = () => {
  const [details, setDetails] = useState([]);
  const params = useParams();
  const { addFavorite, removeFavorite, isFavorite } =
    useContext(FavoritesContext);
  const [isIngredients, setIsInGredients] = useState(true);

  const handleFavorites = () => {
    if (isFavorite(details.id)) {
      removeFavorite(details.id);
    } else {
      addFavorite(details);
    }
  };

  const fetchDetail = async () => {
    const res = await fetch(
      `https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${
        import.meta.env.VITE_API_KEY
      }`
    );
    const data = await res.json();
    setDetails(data);
  };

  useEffect(() => {
    fetchDetail();
  }, [params.name]);
  return (
    <div className="container row featurette my-4 py-5">
      {/* Text content on the left */}
      <div className="col-md-7 order-md-2">
        <h2 className="featurette-heading">
          {details.title} <span className="text-muted">See for yourself.</span>
        </h2>
        <div className="d-flex mb-3">
          <button
            className="btn btn-primary me-2"
            onClick={() => setIsInGredients(true)}
          >
            Instruction
          </button>
          <button
            className="btn btn-secondary mx-2"
            onClick={() => setIsInGredients(false)}
          >
            Ingredients
          </button>
          <button
            className={`btn ${
              isFavorite(details.id) ? "bg-success" : "bg-info"
            }`}
            onClick={handleFavorites}
          >
            {isFavorite(details.id)
              ? "Remove from Favorites"
              : "Add to Favorites"}
          </button>
        </div>
        {isIngredients ? (
          <p
            className="lead"
            dangerouslySetInnerHTML={{ __html: details.summary }}
          ></p>
        ) : null}

        {/* Ingredients list */}
        {!isIngredients ? (
          <>
            <h3>Ingredients:</h3>
            <ul>
              {details.extendedIngredients ? (
                details.extendedIngredients.map((ingredient, id) => (
                  <li key={id}>{ingredient.original}</li>
                ))
              ) : (
                <p>Loading ingredients...</p>
              )}
            </ul>
          </>
        ) : null}
      </div>

      {/* Image on the right */}
      <div className="col-md-5 order-md-1 d-flex justify-content-center align-items-center">
        <img
          src={details.image? details.image : details.title}
          alt={details.title}
          className="featurette-image img-fluid mx-auto"
          width="500"
          height="500"
        />
      </div>
    </div>
  );
};

export default RecipeDetail;
