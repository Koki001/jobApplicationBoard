import React, { useEffect, useState } from "react";
import { db, auth } from "../../../firebase/firebase";
import { ref, child, get } from "firebase/database";
import { Link } from "react-router-dom";

const SavedJobs = () => {
  const [jobObject, setJobObject] = useState({});
  const [jobList, setJobList] = useState([]);

  useEffect(() => {
    const dbRef = ref(db);
    get(child(dbRef, `users/${auth.currentUser?.uid}/savedJobs`))
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
    <div className="savedJobs">
      <h2>Saved Jobs</h2>
      {jobList.map((item) => {
        return (
          <Link
            onClick={(e) =>
              dispatch(JOB_DETAILS(jobObject[e.currentTarget.id]))
            }
            to={`/jobs/${item.uid}`}
            id={item.uid}
            key={item.uid + "key"}
          >
            <li className="jobCard">
              <div className="jobCardHeading">
                <div className="jobCardLogo defaultLoad">
                  <img
                    src={item.logo ? item.logo : "../assets/jobList/batman.gif"}
                    alt="company logo"
                  />
                </div>
                <div className="jobCardText">
                  <h5>{item.title}</h5>
                  <p className="bottomText">
                    {item.experience < 2
                      ? "junior"
                      : item.experience >= 2 && item.experience <= 4
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
                  <span>${Number(item.salary).toLocaleString("en")}</span>
                </p>
              </div>
              <div className="jobCardLocation">
                <p className="topText">
                  {item.city}, {item.country}
                </p>
                <p className="bottomText">{item.category}</p>
              </div>
              <div className="jobCardButtons">

              </div>
            </li>
          </Link>
        );
      })}
    </div>
  );
};

export default SavedJobs;
