import React from "react";
import { NavLink } from "react-router-dom";

const Category = () => {
  return (
    <div>
      <NavLink to={"/cuisine/Italian"}>
        <h4>Italian</h4>
      </NavLink>
      <NavLink to={"/cuisine/American"}>
        <h4>American</h4>
      </NavLink>
      <NavLink to={"/cuisine/Thai"}>
        <h4>Thai</h4>
      </NavLink>
      <NavLink to={"/cuisine/Japanese"}>
        <h4>Japanese</h4>
      </NavLink>
    </div>
  );
};

export default Category;
