import React, { useEffect, useState } from "react";
// Component imports
import Header from "./pages/Home/Header";
import Categories from "./pages/Home/Categories";
import HowItWorks from "./pages/Home/HowItWorks";
import Reviews from "./pages/Home/Reviews";
import FAQ from "./pages/Home/FAQ";
import JobGuides from "./pages/Home/JobGuides";
import Footer from "./pages/Home/Footer";
// MUI imports
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function App() {
  const [showButton, setShowButton] = useState(false);

  // enables to render the scroll-to-top button after certain amount of scrolling down
  useEffect(() => {
    const handleVisibility = () => {
      window.pageYOffset > 1500 ? setShowButton(true) : setShowButton(false);
    };
    window.addEventListener("scroll", handleVisibility);
    return () => {
      window.removeEventListener("scroll", handleVisibility);
    };
  }, []);
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="App">
      <main>
        <button
          onClick={handleScrollToTop}
          className={
            showButton
              ? `scrollToTop buttonRoundGreen scrollVisible`
              : `scrollToTop buttonRoundGreen scrollHidden`
          }
        >
          <KeyboardArrowUpIcon />
        </button>
        <Header />
        <Categories />
        <HowItWorks />
        <JobGuides />
        <Reviews />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}

export default App;
