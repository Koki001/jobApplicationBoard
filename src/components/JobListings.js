import { useLocation, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import NavBar from "./NavBar";
import Footer from "./sections/Footer";
import { db, auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { ref, child, get, onValue } from "firebase/database";
import Pagination from "@mui/material/Pagination";
import { useSelector, useDispatch } from "react-redux";
import {
  pagination,
  PAGINATION_RESET,
  PAGINATION_MAX,
} from "../redux/slices/paginationSlice";
import { POP_UP_LOG } from "../redux/slices/popupSlice";
import {
  JOB_DETAILS,
  JOB_LIST,
  JOB_ACTIVE,
  JOB_ID,
} from "../redux/slices/jobListSlice";
// MUI imports
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import CircularProgress from "@mui/material/CircularProgress";

const JobListings = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const pageSelectorDefault = useSelector((state) => state.pagination.default);
  const pageSelectorCurrent = useSelector((state) => state.pagination.current);
  const storeJobList = useSelector((state) => state.jobs.list);
  const [expanded, setExpanded] = useState(false);
  const [salary, setSalary] = useState([30000, 70000]);
  const [jobList, setJobList] = useState([]);
  const [jobId, setJobId] = useState([]);
  const [loader, setLoader] = useState(true);
  const [loginReminder, setLoginReminder] = useState(false);
  const [filters, setFilters] = useState({
    keyword: "",
    category: "",
    locations: "",
    type: "",
    experience: "",
    salaryMin: "",
    salaryMax: "",
  });

  const [jobObject, setJobObject] = useState({});
  // const jobsRef = useRef()
  const scrollRef = useRef();
  // console.log(jobsRef)
  useEffect(() => {
    if (pageSelectorCurrent > PAGINATION_MAX) {
      dispatch(pagination(1));
    } else if (!pageSelectorCurrent) {
      dispatch(pagination(1));
    }
  }, [location]);
  useEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.key]);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [pageSelectorCurrent]);
  useEffect(() => {
    const dbRef = ref(db);
    // if (storeJobList.length === 0)
    get(child(dbRef, `data/jobs`))
      .then((snapshot) => {
        let dataArray = [];
        let idArray = [];

        if (snapshot.exists()) {
          setJobObject(snapshot.val());
          snapshot.forEach((item) => {
            dataArray.push(item.val());
            idArray.push(item.key);
          });
          setJobList(dataArray);
          setJobId(idArray);
          dispatch(JOB_LIST(dataArray));
        } else {
          console.log("No data available");
        }
      })
      .then(() => {
        setLoader(false);
        dispatch(PAGINATION_MAX(Math.ceil(jobList.length / 10)));
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
  const handleLogoDisplay = (e) => {
    e.target.style.visibility = "visible";
  };
  const handleApply = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (auth.currentUser) {
      setLoginReminder(false);
    } else {
      console.log("no user");
      setLoginReminder(true);
    }
  };
  const handlePageChange = (e, val) => {
    dispatch(pagination(Number(val)));
  };
  const handlePropagation = (e) => {
    e.stopPropagation();
  };
  const handleLoginRedirect = () => {
    setLoginReminder(false);
    dispatch(POP_UP_LOG(true));
  };
  useEffect(() => {
    if (loginReminder) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [loginReminder]);
  const handleJobDetails = (e) => {
    dispatch(JOB_DETAILS(jobObject[e.currentTarget.id]));
  };
  return (
    <div>
      <section className="jobListings">
        <header className="jobsHeader">
          <NavBar />
          <h1>Job Listings</h1>
          <span>Discover your future Dream Career</span>
        </header>
        {loader === false ? (
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
                        <input
                          onChange={(e) =>
                            setFilters((prev) => ({
                              ...prev,
                              keyword: e.target.value,
                            }))
                          }
                          id="keyword"
                          type="text"
                        />
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

            <div ref={scrollRef} className="jobsSort">
              <p>
                Total of <span>{jobList.length}</span> jobs found
              </p>
              <p>
                Page {pageSelectorCurrent || pageSelectorDefault} of{" "}
                {Math.ceil(jobList.length / 10)}
              </p>
              <div className="sortGroup">
                <label htmlFor="sort">Sort by: </label>
                <select name="sort" id="sort">
                  <option value="">Latest</option>
                  <option value="">Salary Desc</option>
                  <option value="">Salary Asc</option>
                  <option value="">Job Title</option>
                </select>
              </div>
            </div>
            <div
              onClick={() => setLoginReminder(false)}
              aria-hidden={loginReminder ? false : true}
              className={
                loginReminder ? "popupContainer popupActive" : "popupContainer"
              }
            >
              <div onClick={handlePropagation} className="loginReminder">
                <p>You must be logged in to apply.</p>
                <div>
                  <button
                    className="buttonRoundClear"
                    onClick={() => setLoginReminder(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="buttonRoundGreen"
                    onClick={handleLoginRedirect}
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
            <ul className="jobsHolder">
              {loader === false
                ? jobList
                    // .filter((keyword) => {
                    //   if (
                    //     keyword.title
                    //       .toLowerCase()
                    //       .includes(filters.keyword.toLowerCase())
                    //   ) {
                    //     return keyword;
                    //   }
                    // })
                    .map((item, index) => {
                      if (
                        index > pageSelectorCurrent * 10 - 11 &&
                        index < pageSelectorCurrent * 10
                      ) {
                        return (
                          <Link
                            onClick={handleJobDetails}
                            to={`/jobs/${jobId[index]}`}
                            id={jobId[index]}
                            key={jobId[index] + "key"}
                          >
                            <li className="jobCard">
                              <div className="jobCardHeading">
                                <div className="jobCardLogo defaultLoad">
                                  <img
                                    onLoad={handleLogoDisplay}
                                    src={item.logo}
                                    alt="company logo"
                                  />
                                </div>
                                <div className="jobCardText">
                                  <h5>{item.title}</h5>
                                  <h6>{item.experience}</h6>
                                </div>
                              </div>
                              <div className="jobCardType">
                                <p
                                  className="topText"
                                  style={
                                    item.type === "contract"
                                      ? { color: "#9CA89D" }
                                      : item.type === "full-time"
                                      ? { color: "#00BF58" }
                                      : item.type === "part-time"
                                      ? { color: "#FF6060" }
                                      : null
                                  }
                                >
                                  {item.type}
                                </p>
                                <p className="bottomText">
                                  Salary:{" "}
                                  <span>
                                    ${Number(item.salary).toLocaleString("en")}
                                  </span>
                                </p>
                              </div>
                              <div className="jobCardLocation">
                                <p className="topText">
                                  {item.city}, {item.country}
                                </p>
                                <p className="bottomText">{item.category}</p>
                              </div>
                              <div className="jobCardButtons">
                                <BookmarkBorderIcon />
                                <button
                                  onClick={handleApply}
                                  className="buttonRoundDarkGreen"
                                >
                                  apply
                                </button>
                              </div>
                            </li>
                          </Link>
                        );
                      }
                    })
                : null}
            </ul>
            <div className="pagePagination">
              <Pagination
                sx={{
                  padding: "0",
                  width: "auto",

                  "& li": {
                    margin: "0 3px",
                  },
                }}
                size={"small"}
                onChange={handlePageChange}
                count={Math.ceil(jobList.length / 10)}
                page={pageSelectorCurrent}
                variant="outlined"
                color="success"
              />
            </div>
          </div>
        ) : (
          <div className="loader">
            <CircularProgress size={"60px"} color="success" />
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
};

export default JobListings;
