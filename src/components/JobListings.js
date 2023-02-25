import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBar from "./helpers/NavBar";
import Footer from "./sections/Footer";

// MUI imports
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

const JobListings = () => {
  const [expanded, setExpanded] = useState(false);
  const [salary, setSalary] = useState([30000, 70000]);
  const handleExpand = () => {
    setExpanded(!expanded);
  };
  const handleSalaryChange = (e, val) => {
    setSalary(val);
  };
  const location = useLocation();

  useEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.key]);
  const fakeArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
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
              Total of <span>1,811</span> jobs found
            </p>
            <div className="sortGroup">
              <p>Sort:</p>
              <button>select</button>
            </div>
          </div>
          <ul className="jobsHolder">
            {fakeArray.map((item) => {
              return <li className="jobCard">JOB CARD {item}</li>;
            })}
          </ul>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default JobListings;
