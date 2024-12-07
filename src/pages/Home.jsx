import React, { useEffect, useState } from "react";
import Popular from "../components/Popular";
import Veggie from "../components/Veggie";
import svg1 from "../images/svg1.avif";
import svg2 from "../images/svg2.avif";
import { Link } from "react-router-dom";
import {motion} from 'framer-motion'
import LoadingBar from "react-top-loading-bar";
import Footer from "../components/Footer";

const Home = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0)

  useEffect(()=>{
    setProgress(20)

    setTimeout(() => {
      setProgress(40)
    }, 100);

    setTimeout(() => {
      setProgress(100)
    }, 400);
  }, [])

  const containerVariantsLeft = {
    hidden: { opacity: 0, x: "-100%" },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  const containerVariantsRight = {
    hidden: { opacity: 0, x: "100%" },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };
  return (
   <>
      <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
    <motion.div
      className="container py-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 1.5,
      }}
    >
      <div className="container h-75 my-5">
        <div className="row recipe-intro my-4">
          <div className="col-lg-6 col-md-8 mx-auto">
            <h1 className="fw-light fs-1 fw-bold">
              Discover Delicious Recipes
            </h1>
            <p className="lead text-body-secondary fs-4">
              Explore a variety of mouth-watering recipes that bring flavor to
              your table. From quick meals to gourmet dishes, find inspiration
              for every occasion.
            </p>
            <p>
              <a href="#popular" className="btn btn-secondary my-2">
                Popular Recipe
              </a>
            </p>
          </div>
        </div>
      </div>

      <motion.div className="container my-4 mx-auto row featurette"
       variants={containerVariantsLeft}
       initial="hidden"
       whileInView="visible"
      >
        <div className="col-md-7 order-md-2 d-flex flex-column justify-content-center align-items-center">
          <h2 className="featurette-heading fw-normal lh-1">
            Healthy Eating, Delicious Choices.{" "}
            <span className="text-body-secondary">See for yourself.</span>
          </h2>
          <p className="lead fs-4">
            Who says healthy eating has to be boring? Our nutritious recipes
            combine vibrant ingredients with mouth-watering flavors to keep you
            feeling your best without sacrificing taste.
          </p>
        </div>
        <div className="col-md-5 order-md-1">
          <img
            style={{
              transform: isHovered ? "scale(1.1)" : "scale(1)",
              transition: "transform 0.7s",
            }}
            className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto"
            width={500}
            height={500}
            src={svg1}
            alt="Placeholder: 500x500"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          />

          <title>Placeholder</title>
          <rect width="100%" height="100%" fill="var(--bs-secondary-bg)" />
        </div>
      </motion.div>
      <Popular />
      <Veggie />
      <motion.div className="container my-4 mx-auto row featurette"
      variants={containerVariantsRight}
      initial="hidden"
      whileInView="visible"
      >
        <div className="col-md-7 order-md-1 d-flex flex-column justify-content-center align-items-center">
          <h2 className="featurette-heading fw-normal lh-1">
            Savor the Art of Wholesome Living{" "}
            <span className="text-body-secondary">
              Good health never tasted this good.
            </span>
          </h2>
          <p className="lead fs-4">
            Discover the perfect balance between nutrition and indulgence. Our
            expertly crafted recipes bring together fresh, vibrant ingredients
            with bold, unforgettable flavors, proving that healthy living can be
            as delicious as it is rewarding.
          </p>
        </div>

        <div className="col-md-5 order-md-2">
          <img
            style={{
              transform: isHovered ? "scale(1.1)" : "scale(1)",
              transition: "transform 0.7s",
            }}
            className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto"
            width={500}
            height={500}
            src={svg2}
            alt="Placeholder: 500x500"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          />
          <title>Placeholder</title>
          <rect width="100%" height="100%" fill="var(--bs-secondary-bg)" />
        </div>
      </motion.div>

      <div className="container-fluid mb-2 pt-3 position-relative bottom-0 w-full">
        <footer className="py-3 my-4">
          <ul className="nav justify-content-center border-bottom pb-3 mb-3">
            <li className="nav-item">
              <a href="#veggi" className="nav-link px-2 text-primary">
                Veggi
              </a>
            </li>
            <li className="nav-item">
              <a href="#popular" className="nav-link px-2 text-primary">
                Popular
              </a>
            </li>
            <li className="nav-item">
              <Link
                to={"/cuisine/Italian"}
                className="nav-link px-2 text-primary"
              >
                Italian
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={"/cuisine/Japanese"}
                className="nav-link px-2 text-primary"
              >
                Japanese
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
    </motion.div>
    <Footer/>
   </>
  );
};

export default Home;
