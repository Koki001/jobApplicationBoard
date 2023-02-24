import React from "react";
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
  return (
    // index #7 layout
    <div className="App">
      <main>
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
