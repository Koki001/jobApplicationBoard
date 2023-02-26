import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBar from "./helpers/NavBar";
import Footer from "./sections/Footer";
import axios from "axios";
import db from "../firebase";
import { ref, child, get, remove } from "firebase/database";

// MUI imports
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

const JobListings = () => {
  const location = useLocation();
  const [expanded, setExpanded] = useState(false);
  const [salary, setSalary] = useState([30000, 70000]);
  const [jobList, setJobList] = useState([]);
  const [jobId, setJobId] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const dbRef = ref(db);
    // remove(dbRef)
    get(child(dbRef, `data/jobs`))
      .then((snapshot) => {
        let dataArray = [];
        let idArray = [];
        if (snapshot.exists()) {
          snapshot.forEach((item) => {
            dataArray.push(item.val());
            idArray.push(item.key);
          });
          setJobList(dataArray);
          setJobId(idArray);
        } else {
          console.log("No data available");
        }
      })
      .then(() => {
        setLoader(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const handleExpand = () => {
    setExpanded(!expanded);
  };
  const handleSalaryChange = (e, val) => {
    setSalary(val);
  };
  useEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.key]);
  console.log(jobList[1]);
  // console.log(jobId)
  return (
    <div>
      <section className="jobListings">
        <header className="jobsHeader">
          <NavBar />
          <h1>Job Listings</h1>
          <span>Discover your future Dream Career</span>
        </header>
        <div className="jobsMain wrapper">
          <div className="jobsFilter">
            <Accordion
              expanded={expanded}
              onChange={handleExpand}
              sx={{
                boxShadow: "none",
                backgroundColor: "#EFF6F3",
                borderRadius: "20px",
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                  "& .MuiSvgIcon-root": {
                    backgroundColor: "white",
                    borderRadius: "50%",
                  },
                }}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography
                  sx={{
                    fontSize: "1.1rem",
                  }}
                >
                  Filters
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <form className="filtersForm" action="">
                  <div className="filtersTop">
                    <div className="filtersKeyword">
                      <label htmlFor="keyword">Keyword or Title</label>
                      <input id="keyword" type="text" />
                    </div>
                    <div className="filtersCategories">
                      <label htmlFor="categories">Categories</label>
                      <input id="categories" type="text" />
                    </div>
                    <div className="filtersLocation">
                      <label htmlFor="location">Location</label>
                      <input id="location" type="text" />
                    </div>
                  </div>
                  <div className="filtersBottom">
                    <div className="filtersType">
                      <p>Job Type:</p>
                      <div className="typeGroup">
                        <div>
                          <input name="type" type="checkbox" id="fulltime" />
                          <label htmlFor="fulltime">Full-time</label>
                        </div>
                        <div>
                          <input name="type" type="checkbox" id="parttime" />
                          <label htmlFor="parttime">Part-time</label>
                        </div>
                        <div>
                          <input name="type" type="checkbox" id="contract" />
                          <label htmlFor="contract">Contract</label>
                        </div>
                      </div>
                    </div>
                    <div className="filtersExperience">
                      <p>Experience:</p>
                      <div className="experienceGroup">
                        <div>
                          <input
                            name="experience"
                            type="checkbox"
                            id="Junior"
                          />
                          <label htmlFor="Junior">{"Junior (0-2 yrs)"}</label>
                        </div>
                        <div>
                          <input
                            name="experience"
                            type="checkbox"
                            id="Intermediate"
                          />
                          <label htmlFor="Intermediate">
                            {"Intermediate (2-5 yrs)"}
                          </label>
                        </div>
                        <div>
                          <input
                            name="experience"
                            type="checkbox"
                            id="Senior"
                          />
                          <label htmlFor="Senior">{"Senior (5+ yrs)"}</label>
                        </div>
                      </div>
                    </div>
                    <div className="filtersSalary">
                      <p>Salary:</p>
                      <div className="salaryGroup">
                        <div className="salaryRange">
                          <p>{"$" + salary[0].toLocaleString() + " CAD"}</p>
                          <span>-</span>
                          <p>
                            {salary[1] === 150000
                              ? "$" + salary[1].toLocaleString() + " CAD+"
                              : "$" + salary[1].toLocaleString() + " CAD"}
                          </p>
                        </div>
                        <Box
                          sx={{
                            width: 250,
                            "& .MuiSlider-thumb": {
                              backgroundColor: "#00BF58",

                              "&:hover": {
                                backgroundColor: "#755146",
                                boxShadow: "none",
                              },
                            },
                            "& .MuiSlider-mark": {
                              display: "none",
                            },
                            "& .MuiSlider-rail": {
                              color: "#244034",
                            },
                            "& .MuiSlider-track": {
                              color: "#00BF58",
                            },
                          }}
                        >
                          <Slider
                            getAriaLabel={() => "Salary range"}
                            value={salary}
                            onChange={handleSalaryChange}
                            // valueLabelDisplay="auto"
                            step={5000}
                            marks
                            min={0}
                            max={150000}
                          />
                        </Box>
                      </div>
                    </div>
                  </div>
                </form>
                <div className="filterButtons">
                  <button className="buttonRoundClear">clear filters</button>

                  <button className="buttonRoundClear">apply filters</button>
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
          <div className="jobsSort">
            <p>
              Total of <span>{jobList.length}</span> jobs found
            </p>
            <div className="sortGroup">
              <label htmlFor="sort">Sort: </label>
              <select name="sort" id="sort">
                <option value="">Latest</option>
                <option value="">Salary Desc</option>
                <option value="">Salary Asc</option>
                <option value="">Job Title</option>
              </select>
            </div>
          </div>
          <ul className="jobsHolder">
            {loader === false
              ? jobList.map((item, index) => {
                  return (
                    <li key={jobId[index]} className="jobCard">
                      <div className="jobCardHeading">
                        <div className="jobCardLogo">
                          <img src={item.logo} alt="company logo" />
                        </div>
                        <div className="jobCardText">
                          <h5>{item.title}</h5>
                          <h6>{item.experience}</h6>
                        </div>
                      </div>
                      <div className="jobCardType">
                        <p className="topText">{item.type}</p>
                        <p className="bottomText">
                          Salary: ${Number(item.salary).toLocaleString("en")}
                        </p>
                      </div>
                      <div className="jobCardLocation">
                        <p className="topText">
                          {item.city}, {item.country}
                        </p>
                        <p className="bottomText">{item.category}</p>
                      </div>
                      <div className="jobCardButtons">
                        <BookmarkBorderIcon
                        // sx={{
                        //   "&:hover": {

                        //     transform: "scale(1.3)",
                        //   },
                        //   borderRadius: "50%",
                        //   fontSize: "24px",
                        //   transition: "all 0.1s linear",
                        //   // padding: "10px"
                        //   margin: "0 5px",
                        // }}
                        />
                        <button className="buttonRoundGreen">apply</button>
                      </div>
                    </li>
                  );
                })
              : null}
          </ul>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default JobListings;
