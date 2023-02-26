import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import NavBar from "./helpers/NavBar";
import Footer from "./sections/Footer";
import db from "../firebase";
import { ref, child, get, remove } from "firebase/database";
import { useEffect, useState } from "react";

const JobDetails = () => {
  const [details, setDetails] = useState({})
  const { id } = useParams();


  useEffect(() => {
    const dbRef = ref(db)
    get(child(dbRef, `data/jobs/${id}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setDetails(snapshot.val())
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <div className="jobDetailsSection">
      <header>
        <NavBar />
      </header>
      <div className="jobDetails wrapper">
        <h1>{details.title}</h1>
        <p>${details.salaryMin} - ${details.salaryMax}</p>
        <p>
          {details.description}
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default JobDetails;
