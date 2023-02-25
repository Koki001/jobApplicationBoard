import { useEffect } from "react";
import NavBar from "./helpers/NavBar";
import Footer from "./sections/Footer";
import { useLocation } from "react-router-dom";

const Pricing = () => {
  const location = useLocation();
  useEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.key]);
  return (
    <div>
      <section className="pricing" id="pricing">
        <header className="pricingHeader">
          <NavBar />
          <h1>Pricing</h1>
          <p>Choose your membership</p>
        </header>
        <div className="pricingPlan wrapper">
          <h2>Simple Plan for All</h2>
          <ul className="pricingCards">
            <li>
              <h5>Standard</h5>
              <h4>0</h4>
              <div className="planDetails">
                <p>1 Domain</p>
                <p>1 Year Premium Support</p>
                <p>3gb Hosting</p>
              </div>
              <button className="buttonPriceGreen">Choose Plan</button>
            </li>
            <li className="popular">
              <div className="popularBanner">
                <img src="../assets/pricing/popular.png" alt="popular banner" />
                <p className="popularText">popular</p>
              </div>
              <h5>Gold</h5>
              <h4>
                <span className="dollarSign">$</span> 27.
                <span className="cents">99</span>
              </h4>
              <div className="planDetails">
                <p>3 Domains</p>
                <p>1 Year Premium Support</p>
                <p>10gb Hosting</p>
              </div>
              <button className="buttonPriceGreen">Choose Plan</button>
            </li>
            <li>
              <h5>Diamond</h5>
              <h4>
                <span className="dollarSign">$</span> 39.<span className="cents">99</span>
              </h4>
              <div className="planDetails">
                <p>Unlimited Domains</p>
                <p>3 Years Premium Support</p>
                <p>Unlimited Hosting</p>
              </div>
              <button className="buttonPriceGreen">Choose Plan</button>
            </li>
          </ul>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Pricing;
