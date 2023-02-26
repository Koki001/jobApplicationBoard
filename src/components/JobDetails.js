import { useParams } from "react-router-dom";
import { useLocation, Link } from "react-router-dom";
import NavBar from "./helpers/NavBar";
import Footer from "./sections/Footer";
import db from "../firebase";
import { ref, child, get, remove } from "firebase/database";
import { useEffect, useState } from "react";

const JobDetails = () => {
  const location = useLocation();
  const [details, setDetails] = useState({});
  const { id } = useParams();

  useEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.key]);

  useEffect(() => {
    const dbRef = ref(db);
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
  }, []);
  return (
    <div className="jobDetailsSection">
      <header>
        <NavBar />
      </header>
      <div className="jobDetails wrapper">
        <Link to={"/jobs"}><button>go back</button></Link>
        <h1>{details.title}</h1>
        <p>
          ${details.salaryMin} - ${details.salaryMax}
        </p>
        <p>{details.description}</p>
        <button>apply</button>
      </div>
      <Footer />
    </div>
  );
};

export default JobDetails;
