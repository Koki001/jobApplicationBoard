import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import NavBar from "./helpers/NavBar";
import Footer from "./sections/Footer";

const JobListings = () => {

  const location = useLocation();

  useEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.key]);

  return (
    <div>
      <section className="jobListings">
        <header>
          <NavBar />
        </header>
      </section>
      <Footer />
    </div>
  );
};

export default JobListings;
