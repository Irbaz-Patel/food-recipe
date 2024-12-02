import React from "react";
import Home from "./Home";
import { Route, Routes } from "react-router-dom";
import Cuisines from "./Cuisines";
import RecipeDetail from "./RecipeDetail";
import Searched from "./Searched";
import FavoriteList from "./FavoriteList";
import Footer from "../components/Footer";

const Pages = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cuisine/:id" element={<Cuisines />} />
        <Route path="/searched/:search" element={<Searched />} />
        <Route path="/recipe/:name" element={<RecipeDetail />} />
        <Route path="/favorites" element={<FavoriteList />} />
      </Routes>


      <div
        className="position-fixed bottom-0 end-0 py-5 me-3"
        style={{ zIndex: 1050 }}
      >
        <a href="#" className="btn btn-primary">
          <i className="fas fa-arrow-up"></i>
        </a>
      </div>

      <Footer />
    </div>
  );
};

export default Pages;
