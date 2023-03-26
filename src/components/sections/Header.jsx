import NavBar from "../NavBar";
import jobSectors from "../helpers/jobSectors";
import { useDispatch } from "react-redux";
import {
  FILTER_CATEGORY,
  FILTER_KEYWORD,
} from "../../redux/slices/jobFilterSlice";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../../firebase";
import { ref, child, get } from "firebase/database";
// MUI imports

const Header = () => {
  const [jobList, setJobList] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const dbRef = ref(db);

    get(child(dbRef, `data/jobs`))
      .then((snapshot) => {
        let dataArray = [];
        if (snapshot.exists()) {
          let i = 0;

          snapshot.forEach((item) => {
            dataArray.push(item.val());
            dataArray[i].uid = item.key;
            i++;
          });
          setJobList(dataArray);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <header id="home" className="mainHeader">
      {/* <nav>
        <div className="navLogo">
          <img src="../assets/header/jobiLogo.png" alt="jobi company logo" />
        </div>
        <ul className="navMenu">
          <li>
            <a href="#home">home</a>
          </li>
          <li>
            <a href="#jobs">jobs</a>
          </li>
          <li>
            <a href="#about">about us</a>
          </li>
          <li>
            <a href="#faq">FAQ</a>
          </li>
          <li>
            <a href="#contact">contact</a>
          </li>
        </ul>
        <div className="navButtons">
          <button className="buttonRoundClear">Login/Sign up</button>

          <button className="buttonRoundGreen">Post a job</button>
        </div>
      </nav> */}
      <NavBar />
      <div className="headerCenter wrapper">
        <h1>
          <span>Find & Hire</span> <span>Experts for any Job.</span>
        </h1>
        <p className="dreamText">Find your dream career, not just a job.</p>
        <div className="headerSearchContainer">
          <div className="headerSearchLeft">
            <label htmlFor="category">Job Categories</label>
            <select
              onChange={(e) => dispatch(FILTER_CATEGORY(e.target.value))}
              defaultValue={"all"}
              name="category"
              id="category"
            >
              <option value="all">All Categories</option>
              {jobList &&
                jobSectors.map((item, index) => {
                  return (
                    <option key={index + "jobCategory"} value={item}>
                      {item +
                        ` (${
                          jobList.filter((job) =>
                            job.category
                              .toLowerCase()
                              .includes(item.toLowerCase())
                          ).length
                        })`}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="headerSearchMiddle">
            <label htmlFor="keyword">Keywords or Title</label>
            <input
              onChange={(e) => dispatch(FILTER_KEYWORD(e.target.value))}
              id="keyword"
              type="text"
            />
          </div>
          <div className="headerSearchRight">
            <button
              onClick={(e) => navigate("/jobs")}
              className="buttonSquareGreen"
            >
              Search
            </button>
          </div>
        </div>
        <p className="popularTag">
          <span>Popular:</span> Design, Developer, Business, Video Editing
        </p>
      </div>

      <div className="companyUserLogos wrapper">
        <div>
          <img
            src="../assets/header/google.png"
            alt="company logo for Google"
          />
        </div>
        <div>
          <img
            src="../assets/header/shipbob.png"
            alt="company logo for Shipbob"
          />
        </div>
        <div>
          <img
            src="../assets/header/dribble.png"
            alt="company logo for Dribble"
          />
        </div>
        <div>
          <img src="../assets/header/slack.png" alt="company logo for Slack" />
        </div>
        <div>
          <img src="../assets/header/vine.png" alt="company logo for Vine" />
        </div>
        <div>
          <img
            src="../assets/header/airbnb.png"
            alt="company logo for Air B and B"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
