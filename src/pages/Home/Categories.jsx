import React from "react";
import { Link } from "react-router-dom";

const Categories = () => {
  return (
    <section id="jobs" className="categories">
      <div className="categoriesWrapped wrapper">
        <div className="categoriesExplore">
          <h2>In Demand Categories</h2>

          <a href="#">All categories {">"}</a>
        </div>
        <ul className="categoriesCards">
          <li>
            <div className="logo">
              <img
                src="../assets/categories/development.png"
                alt="logo that represents the development job category"
              />
            </div>
            <p className="categoriesText">Design & Development</p>
            <p className="categoryVacancies">100 vacancies</p>
          </li>
          <li>
            <div className="logo">
              <img
                src="../assets/categories/marketing.png"
                alt="logo that represents the marketing job category"
              />
            </div>
            <p className="categoriesText">Marketing & Sales</p>
            <p className="categoryVacancies">100 vacancies</p>
          </li>
          <li>
            <div className="logo">
              <img
                src="../assets/categories/bag.png"
                alt="logo that represents the business job category"
              />
            </div>
            <p className="categoriesText">Business & Management</p>
            <p className="categoryVacancies">100 vacancies</p>
          </li>
          <li>
            <div className="logo">
              <img
                src="../assets/categories/phone.png"
                alt="logo that represents the communications job category"
              />
            </div>
            <p className="categoriesText">Communications</p>
            <p className="categoryVacancies">100 vacancies</p>
          </li>
          <li>
            <div className="logo">
              <img
                src="../assets/categories/coding.png"
                alt="logo that represents the programming job category"
              />
            </div>
            <p className="categoriesText">Programming & Coding</p>
            <p className="categoryVacancies">100 vacancies</p>
          </li>
          <li>
            <div className="logo">
              <img
                src="../assets/categories/editing.png"
                alt="logo that represents the video editing job category"
              />
            </div>
            <p className="categoriesText">Video Editing & 3D Work</p>
            <p className="categoryVacancies">100 vacancies</p>
          </li>
          <li>
            <div className="logo">
              <img
                src="../assets/categories/art.png"
                alt="logo that represents the art and animation job category"
              />
            </div>
            <p className="categoriesText">Art & Animation</p>
            <p className="categoryVacancies">100 vacancies</p>
          </li>
          <li className="categoriesFinalCard">
            <Link to={"/jobs"}>
              <h3>13k+</h3>
              <p>Jobs posted</p>
              <div className="finalCardIcons">
                <img
                  className="linesArt"
                  src="../assets/categories/lines.png"
                  alt="two curved lines"
                />
                <img
                  className="arrowArt"
                  src="../assets/categories/arrow.png"
                  alt="an arrow within a circle"
                />
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Categories;
