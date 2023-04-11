import React, { useEffect, useRef, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import Footer from "./Home/Footer";
import NavBar from "../components/NavBar";
import jobSectors from "../components/helpers/jobSectors";
import { db, auth } from "../firebase/firebase";
import { ref, child, get, set } from "firebase/database";
// redux imports
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
  FILTER_RESET,
} from "../redux/slices/jobFilterSlice";
import { JOB_DETAILS, JOB_LIST } from "../redux/slices/jobListSlice";
// MUI imports +
import Swal from "sweetalert2";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Accordion from "@mui/material/Accordion";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import CircularProgress from "@mui/material/CircularProgress";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

const JobListings = () => {
  const pageSelectorDefault = useSelector((state) => state.pagination.default);
  const pageSelectorCurrent = useSelector((state) => state.pagination.current);
  const currentSort = useSelector((state) => state.pagination.sort);
  const filters = useSelector((state) => state.filter);

  const [expanded, setExpanded] = useState(true);
  const [jobNum, setJobNum] = useState();
  const [pageNum, setPageNum] = useState();
  const [jobList, setJobList] = useState([]);
  const [loader, setLoader] = useState(true);
  const [loginReminder, setLoginReminder] = useState(false);
  const [generalSort, setGeneralSort] = useState(currentSort);
  const [jobObject, setJobObject] = useState({});
  const [savedKeys, setSavedKeys] = useState();

  const location = useLocation();
  const dispatch = useDispatch();
  const scrollRef = useRef();
  const saveJobRef = useRef();

  useEffect(() => {
    if (pageSelectorCurrent > pageNum) {
      dispatch(pagination(pageNum));
    } else if (!pageSelectorCurrent) {
      dispatch(pagination(1));
    }
  }, [location, pageNum]);
  useEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.key]);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [pageSelectorCurrent]);
  // get main data and save results to be mapped
  useEffect(() => {
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
  }, []);

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
      Swal.fire({
        text: "You must be logged in to apply",
        icon: "warning",
        confirmButtonText: "Ok",
        confirmButtonColor: "green",
      });
    }
  };
  const handleEdit = (e) => {
    e.stopPropagation();
    e.preventDefault();
    console.log("EDIT");
  };
  const handleSaveJob = (e) => {
    let id = e.currentTarget.id;
    e.stopPropagation();
    e.preventDefault();
    if (auth.currentUser) {
      console.log(id);
      setLoginReminder(false);
      const dbRef = ref(db);
      get(child(dbRef, `data/jobs/${id}`)).then((snapshot) => {
        set(
          ref(db, `users/${auth.currentUser?.uid}/savedJobs/${id}`),
          snapshot.val()
        );
      });
    } else {
      Swal.fire({
        text: "You must be logged in to save this job",
        icon: "warning",
        confirmButtonText: "Ok",
        confirmButtonColor: "green",
      });
    }
  };
  // check if jobs are already saved
  useEffect(() => {
    const dbRef = ref(db);
    const keys = [];
    get(child(dbRef, `users/${auth.currentUser?.uid}/savedJobs`)).then(
      (snapshot) => {
        snapshot.forEach((item) => {
          keys.push(item.key);
        });
        setSavedKeys(keys);
      }
    );
  }, []);
  console.log(savedKeys);
  // remember previous sort order
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
  const handleFilterClear = () => {
    dispatch(FILTER_ACTIVE(false));
    dispatch(FILTER_RESET());
    dispatch(pagination(1));
  };
  console.log(jobList)
  useEffect(() => {
    if (loginReminder) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [loginReminder]);

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
                onChange={() => setExpanded(!expanded)}
                sx={{
                  boxShadow: "none",
                  backgroundColor: "#d2dfd9",
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
                        <select
                          onChange={(e) =>
                            dispatch(FILTER_CATEGORY(e.target.value))
                          }
                          value={filters.category}
                          name="category"
                          id="category"
                        >
                          <option defaultChecked value="">
                            All Categories
                          </option>
                          {jobSectors.map((item, index) => {
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
                              type="radio"
                              id="fulltime"
                              value={"full-time"}
                              checked={filters.type === "full-time"}
                            />
                            <label htmlFor="fulltime">Full-time</label>
                          </div>
                          <div>
                            <input
                              onChange={(e) =>
                                dispatch(FILTER_TYPE("part-time"))
                              }
                              name="type"
                              type="radio"
                              id="parttime"
                              value={"part-time"}
                              checked={filters.type === "part-time"}
                            />
                            <label htmlFor="parttime">Part-time</label>
                          </div>
                          <div>
                            <input
                              onChange={(e) =>
                                dispatch(FILTER_TYPE("contract"))
                              }
                              name="type"
                              type="radio"
                              id="contract"
                              value={"contract"}
                              checked={filters.type === "contract"}
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
                              type="radio"
                              id="Junior"
                              checked={filters.experience === "junior"}
                            />
                            <label htmlFor="Junior">{"Junior (0-2 yrs)"}</label>
                          </div>
                          <div>
                            <input
                              onChange={(e) =>
                                dispatch(FILTER_EXPERIENCE("intermediate"))
                              }
                              name="experience"
                              type="radio"
                              id="Intermediate"
                              checked={filters.experience === "intermediate"}
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
                              type="radio"
                              id="Senior"
                              checked={filters.experience === "senior"}
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
                                ? " ANY "
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
                              onChange={(e, val) =>
                                dispatch(FILTER_SALARY(val))
                              }
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
                      // disabled
                    >
                      clear filters
                    </button>
                    {/* 
                    <button
                      onClick={handleFilterApply}
                      className="buttonRoundClear"
                      // disabled
                    >
                      apply filters
                    </button> */}
                  </div>
                </AccordionDetails>
              </Accordion>
            </div>

            <div ref={scrollRef} className="jobsSort">
              <p>
                Total of <span>{jobNum}</span> jobs found
              </p>
              <p>
                Page {pageSelectorCurrent || pageSelectorDefault} of {pageNum}
              </p>
              <div className="sortGroup">
                <label htmlFor="sort">Sort by: </label>
                <select
                  value={generalSort}
                  onChange={(e) => dispatch(SORT(e.target.value))}
                  name="sort"
                  id="sort"
                >
                  <option value="latest">Latest</option>
                  <option value="salary">Salary</option>
                  <option value="title">Job Title</option>
                </select>
              </div>
            </div>
            <ul className="jobsHolder">
              {loader === false
                ? jobList
                    ?.filter((item) =>
                      item.category
                        .toLowerCase()
                        .includes(filters.category.toLowerCase())
                    )
                    .filter((item) =>
                      item.title
                        .toLowerCase()
                        .includes(filters.keyword.toLowerCase())
                    )
                    .filter(
                      (item) =>
                        item.city
                          .toLowerCase()
                          .includes(filters.location.toLowerCase()) ||
                        item.country
                          .toLowerCase()
                          .includes(filters.location.toLowerCase())
                    )
                    .filter((item) => item.type.includes(filters.type))
                    .filter((item) =>
                      item.experience.includes(filters.experience)
                    )
                    .filter((item) => {
                      if (filters.salary[1] === 150000) {
                        return item;
                      } else {
                        return (
                          item.salaryMin >= filters.salary[0] &&
                          item.salaryMax <= filters.salary[1]
                        );
                      }
                    })
                    .map((item, index, arr) => {
                      if (pageNum !== Math.ceil(arr.length / 10)) {
                        setPageNum(Math.ceil(arr.length / 10));
                      }
                      if (jobNum !== arr.length) {
                        setJobNum(arr.length);
                      }
                      if (
                        index > pageSelectorCurrent * 10 - 11 &&
                        index < pageSelectorCurrent * 10
                      ) {
                        return (
                          <Link
                            onClick={(e) =>
                              dispatch(
                                JOB_DETAILS(jobObject[e.currentTarget.id])
                              )
                            }
                            to={`/jobs/${item.uid}`}
                            id={item.uid}
                            key={item.uid + "key"}
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
                                <button
                                  ref={saveJobRef}
                                  className={
                                    item.uid.includes(savedKeys)
                                      ? "savedJob saveJobButton"
                                      : "saveJobButton"
                                  }
                                  onClick={handleSaveJob}
                                  id={item.uid}
                                >
                                  <BookmarkBorderIcon />
                                </button>
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
                onChange={(e, val) => dispatch(pagination(Number(val)))}
                count={pageNum}
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
