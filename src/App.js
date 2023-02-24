import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// Component imports
import Header from "./components/sections/Header";
import Categories from "./components/sections/Categories";
import HowItWorks from "./components/sections/HowItWorks";
import Reviews from "./components/sections/Reviews";
import FAQ from "./components/sections/FAQ";
import JobGuides from "./components/sections/JobGuides";
import Footer from "./components/sections/Footer";
function App() {
  const [showButton, setShowButton] = useState(false);
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  useEffect(() => {
    const handleVisibility = () => {
      window.pageYOffset > 1000 ? setShowButton(true) : setShowButton(false);
    };
    window.addEventListener("scroll", handleVisibility);
    return () => {
      window.removeEventListener("scroll", handleVisibility);
    };
  });

  return (
    // index #7 layout
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
          <span>Scroll</span> To <span>Top</span>
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
