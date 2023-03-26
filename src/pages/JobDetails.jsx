import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLocation, Link } from "react-router-dom";
import Footer from "./Home/Footer";
import NavBar from "../components/NavBar";
import { db } from "../firebase/firebase";
import { ref, child, get } from "firebase/database";
import { useSelector } from "react-redux";
// MUI imports
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

const JobDetails = () => {
  const jobDetails = useSelector((state) => state.jobs.details);
  const [details, setDetails] = useState(jobDetails);

  const location = useLocation();

  const { id } = useParams();

  useEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.key]);
  useEffect(() => {
    const dbRef = ref(db);
    if (Object.keys(jobDetails).length === 0) {
      get(child(dbRef, `data/jobs/${id}`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            setDetails(snapshot.val());
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  return (
    <div className="jobDetailsSection">
      <header className="jobDetailsHeader">
        <NavBar />
        <h1>Job Details</h1>
      </header>
      {details && (
        <div className="jobDetails wrapper">
          <div className="annoyingLink">
            <Link to={"/jobs"}>
              <KeyboardBackspaceIcon /> back
            </Link>
          </div>
          <div className="jobDetailsLeft">
            <div className="detailsTitle">
              <p>{details.createdOn}</p>
              <h2>{details.title}</h2>
              <div className="detailsSocials">
                <div className="detailsLogo">Facebook</div>
                <div className="detailsLogo">Twitter</div>
                <div className="detailsLogo">Copy</div>
              </div>
            </div>
            <div className="detailsDescription">
              <h3>Job Description:</h3>
              <p style={{ whiteSpace: "pre-wrap" }}>{details.description}</p>
            </div>
            <div className="detailsResponsibilies">
              <h3>Responsibilities:</h3>
              <p>{details.responsibilities}</p>
            </div>
            <div className="detailsRequired">
              <h3>Required Skills:</h3>
              <p>{details.required}</p>
            </div>
            <div className="detailsBenefits">
              <h3>Benefits:</h3>
              <p>{details.benefits}</p>
            </div>
            <Link to={"/jobs"}>
              <button className="buttonRoundBrown">Back to Search</button>
            </Link>
          </div>
          <div className="jobDetailsRight">
            <div className="jobDetailsCompanyTop">
              <div className="companyLogo">
                <img src={details.logo} alt="company logo" />
              </div>
              <h4>{details.company ? details.company : "NO NAME"}</h4>

              <a
                href="https://www.kokicodes.ca/"
                rel="no-referrer"
                target={"_blank"}
                className="buttonRoundGreen"
              >
                Visit Website
              </a>
            </div>
            <div className="jobDetailsCompanyBottom">
              <div className="companyDetails">
                <div>
                  <h5>Salary</h5>
                  <p>${Number(details.salary).toLocaleString("en")}</p>
                </div>
                <div>
                  <h5>Category</h5>
                  <p>{details.category}</p>
                </div>
                <div>
                  <h5>Location</h5>
                  <p>{details.country}</p>
                </div>
                <div>
                  <h5>Job Type</h5>
                  <p>{details.type}</p>
                </div>
                <div>
                  <h5>Date Posted</h5>
                  <p>{details.createdOn}</p>
                </div>
                <div>
                  <h5>Experience</h5>
                  <p>
                    {details.experience < 2
                      ? "junior"
                      : details.experience >= 2 && details.experience <= 4
                      ? "intermediate"
                      : details.experience >= 5
                      ? "senior"
                      : details.experience}
                  </p>
                </div>
              </div>
              {details.skills ? (
                <div className="companyBuzzWords">
                  {details.skills.slice(0, 4).map((item, index) => {
                    return <h5 key={index + "skillDetails"}>{item}</h5>;
                  })}
                </div>
              ) : null}
              <button className="buttonRoundGreen">Apply Now</button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default JobDetails;
