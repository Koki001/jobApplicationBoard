import { useLocation, Link } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import NavBar from "./NavBar";
import Footer from "./sections/Footer";
import { db, auth } from "../firebase";
import { ref, child, get } from "firebase/database";
import Pagination from "@mui/material/Pagination";
import { useSelector, useDispatch } from "react-redux";
import {
  pagination,
  PAGINATION_MAX,
  SORT,
} from "../redux/slices/paginationSlice";
import {
  FILTER_CATEGORY,
  FILTER_KEYWORD,
  FILTER_LOCATION,
  FILTER_EXPERIENCE,
  FILTER_SALARY,
  FILTER_TYPE,
  FILTER_ACTIVE,
} from "../redux/slices/jobFilterSlice";
import { POP_UP_LOG } from "../redux/slices/popupSlice";
import { JOB_DETAILS, JOB_LIST } from "../redux/slices/jobListSlice";
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
  const filters = useSelector((state) => state.filter);
  const currentSort = useSelector((state) => state.pagination.sort);
  const [expanded, setExpanded] = useState(false);
  const [salary, setSalary] = useState([30000, 70000]);
  const [jobList, setJobList] = useState([]);
  const [loader, setLoader] = useState(true);
  const [loginReminder, setLoginReminder] = useState(false);
  const [generalSort, setGeneralSort] = useState(currentSort);
  // const [filters, setFilters] = useState({
  //   keyword: "",
  //   category: "",
  //   locations: "",
  //   type: "",
  //   experience: "",
  //   salaryMin: "",
  //   salaryMax: "",
  // });
  const [jobObject, setJobObject] = useState({});
  const scrollRef = useRef();
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
    if (!filters.active) {
      const dbRef = ref(db);
      get(child(dbRef, `data/jobs`))
        .then((snapshot) => {
          let dataArray = [];
          if (snapshot.exists()) {
            let i = 0;
            setJobObject(snapshot.val());
            snapshot.forEach((item) => {
              dataArray.push(item.val());
              dataArray[i].uid = item.key;
              i++;
            });
            if (currentSort === "title") {
              dataArray.sort((a, b) => a.title.localeCompare(b.title));
              setJobList(dataArray);
              dispatch(JOB_LIST(dataArray));
              setLoader(false);
            } else if (currentSort === "latest") {
              dataArray.sort((a, b) => b.dateMs - a.dateMs);
              setJobList(dataArray);
              dispatch(JOB_LIST(dataArray));
              setLoader(false);
            } else if (currentSort === "salary") {
              dataArray.sort((a, b) => b.salary - a.salary);
              setJobList(dataArray);
              dispatch(JOB_LIST(dataArray));
              setLoader(false);
            }
          } else {
            console.log("No data available");
          }
        })
        .then(() => {
          dispatch(PAGINATION_MAX(Math.ceil(jobList.length / 10)));
        })
        .catch((error) => {
          console.error(error);
        });
    } else if (filters.active) {
      const dbRef = ref(db);
      get(child(dbRef, `data/jobs`))
        .then((snapshot) => {
          let dataArray = [];
          if (snapshot.exists()) {
            let i = 0;
            snapshot.forEach((item) => {
              if (
                item
                  .val()
                  .title.toLowerCase()
                  .includes(filters.keyword.toLowerCase())
              ) {
                dataArray.push(item.val());
                dataArray[i].uid = item.key;
                i++;
              }
            });
            setJobList(dataArray);
          } else {
            console.log("No data available");
          }
        })
        .then(() => {
          dispatch(PAGINATION_MAX(Math.ceil(jobList.length / 10)));
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [filters.active]);
  const handleExpand = () => {
    setExpanded(!expanded);
  };
  const handleSalaryChange = (e, val) => {
    dispatch(FILTER_ACTIVE(true));
    dispatch(FILTER_SALARY(val));
  };
  const handleLogoDisplay = (e) => {
    e.target.style.visibility = "visible";
    e.target.parentElement.classList.remove("defaultLoad");
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
  const handleEdit = (e) => {
    e.stopPropagation();
    e.preventDefault();
    console.log("EDIT");
  };
  const handleSort = (e) => {
    dispatch(SORT(e.target.value));
  };
  useEffect(() => {
    if (currentSort === "title") {
      setGeneralSort("title");
      const titleSort = [...jobList];
      titleSort.sort((a, b) => a.title.localeCompare(b.title));
      setJobList(titleSort);
      setLoader(false);
    } else if (currentSort === "latest") {
      setGeneralSort("latest");
      const latestSort = [...jobList];
      latestSort.sort((a, b) => b.dateMs - a.dateMs);
      setJobList(latestSort);
      setLoader(false);
    } else if (currentSort === "salary") {
      setGeneralSort("salary");
      const salarySort = [...jobList];
      salarySort.sort((a, b) => b.salary - a.salary);
      setJobList(salarySort);
      setLoader(false);
    }
  }, [currentSort]);
  const handleFilterApply = (e) => {
    dispatch(FILTER_ACTIVE(true));
    console.log(filters);
    const dbRef = ref(db);
    get(child(dbRef, `data/jobs`))
      .then((snapshot) => {
        let dataArray = [];
        if (snapshot.exists()) {
          let i = 0;
          snapshot.forEach((item) => {
            if (
              item
                .val()
                .title.toLowerCase()
                .includes(filters.keyword.toLowerCase())
            ) {
              dataArray.push(item.val());
              dataArray[i].uid = item.key;
              i++;
            }
          });
          setJobList(dataArray);
        } else {
          console.log("No data available");
        }
      })
      .then(() => {
        dispatch(PAGINATION_MAX(Math.ceil(jobList.length / 10)));
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleFilterClear = () => {
    dispatch(FILTER_ACTIVE(false));
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
                            dispatch(FILTER_KEYWORD(e.target.value))
                          }
                          id="keyword"
                          type="text"
                          value={filters.keyword}
                        />
                      </div>
                      <div className="filtersCategories">
                        <label htmlFor="categories">Categories</label>
                        <input
                          onChange={(e) =>
                            dispatch(FILTER_CATEGORY(e.target.value))
                          }
                          id="categories"
                          type="text"
                          value={filters.category}
                        />
                      </div>
                      <div className="filtersLocation">
                        <label htmlFor="location">Location</label>
                        <input
                          onChange={(e) =>
                            dispatch(FILTER_LOCATION(e.target.value))
                          }
                          id="location"
                          type="text"
                          value={filters.location}
                        />
                      </div>
                    </div>
                    <div className="filtersBottom">
                      <div className="filtersType">
                        <p>Job Type:</p>
                        <div className="typeGroup">
                          <div>
                            <input
                              onChange={(e) =>
                                dispatch(FILTER_TYPE("full-time"))
                              }
                              name="type"
                              type="checkbox"
                              id="fulltime"
                            />
                            <label htmlFor="fulltime">Full-time</label>
                          </div>
                          <div>
                            <input
                              onChange={(e) =>
                                dispatch(FILTER_TYPE("part-time"))
                              }
                              name="type"
                              type="checkbox"
                              id="parttime"
                            />
                            <label htmlFor="parttime">Part-time</label>
                          </div>
                          <div>
                            <input
                              onChange={(e) =>
                                dispatch(FILTER_TYPE("contract"))
                              }
                              name="type"
                              type="checkbox"
                              id="contract"
                            />
                            <label htmlFor="contract">Contract</label>
                          </div>
                        </div>
                      </div>
                      <div className="filtersExperience">
                        <p>Experience:</p>
                        <div className="experienceGroup">
                          <div>
                            <input
                              onChange={(e) =>
                                dispatch(FILTER_EXPERIENCE("junior"))
                              }
                              name="experience"
                              type="checkbox"
                              id="Junior"
                            />
                            <label htmlFor="Junior">{"Junior (0-2 yrs)"}</label>
                          </div>
                          <div>
                            <input
                              onChange={(e) =>
                                dispatch(FILTER_EXPERIENCE("intermediate"))
                              }
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
                              onChange={(e) =>
                                dispatch(FILTER_EXPERIENCE("senior"))
                              }
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
                            <p>
                              {"$" +
                                filters.salary[0].toLocaleString() +
                                " CAD"}
                            </p>
                            <span>-</span>
                            <p>
                              {filters.salary[1] === 150000
                                ? "$" +
                                  filters.salary[1].toLocaleString() +
                                  " CAD+"
                                : "$" +
                                  filters.salary[1].toLocaleString() +
                                  " CAD"}
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
                              value={filters.salary}
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
                    <button
                      onClick={handleFilterClear}
                      className="buttonRoundClear"
                      disabled
                    >
                      clear filters
                    </button>

                    <button
                      onClick={handleFilterApply}
                      className="buttonRoundClear"
                      disabled
                    >
                      apply filters
                    </button>
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
                <select
                  value={generalSort}
                  onChange={handleSort}
                  name="sort"
                  id="sort"
                >
                  <option value="latest">Latest</option>
                  <option value="salary">Salary</option>
                  <option value="title">Job Title</option>
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
                ? jobList.map((item, index) => {
                    if (
                      index > pageSelectorCurrent * 10 - 11 &&
                      index < pageSelectorCurrent * 10
                    ) {
                      return (
                        <Link
                          onClick={handleJobDetails}
                          to={`/jobs/${jobList[index].uid}`}
                          id={jobList[index].uid}
                          key={jobList[index].uid + "key"}
                        >
                          <li className="jobCard">
                            <div className="jobCardHeading">
                              <div className="jobCardLogo defaultLoad">
                                <img
                                  onLoad={handleLogoDisplay}
                                  src={
                                    item.logo
                                      ? item.logo
                                      : "../assets/jobList/batman.gif"
                                  }
                                  alt="company logo"
                                />
                              </div>
                              <div className="jobCardText">
                                <h5>{item.title}</h5>
                                <p className="bottomText">
                                  {item.experience < 2
                                    ? "junior"
                                    : item.experience >= 2 &&
                                      item.experience <= 4
                                    ? "intermediate"
                                    : item.experience >= 5
                                    ? "senior"
                                    : item.experience}
                                </p>
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
                                onClick={
                                  item.id && item.id === auth.currentUser?.uid
                                    ? handleEdit
                                    : handleApply
                                }
                                className="buttonRoundDarkGreen"
                              >
                                {item.id && item.id === auth.currentUser?.uid
                                  ? "edit"
                                  : "apply"}
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
