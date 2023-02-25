import { Link } from "react-router-dom";
// MUI imports
import PinterestIcon from "@mui/icons-material/Pinterest";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";

const Footer = () => {
  return (
    <footer id="contact" className="footerMain wrapper">
      <div className="footerTop">
        <div className="footerLogo">
          <img src="../assets/header/jobiLogo.png" alt="jobi company logo" />
        </div>
        <div>
          <h4>Products</h4>
          <ul className="footerProducts">
            <li>
              <a href="#">Take the tour</a>
            </li>
            <li>
              <a href="#">Live chat</a>
            </li>
            <li>
              <a href="#">Self-service</a>
            </li>
            <li>
              <a href="#">Mobile</a>
            </li>
            <li>
              <a href="#">Collaboration</a>
            </li>
            <li>
              <a href="#">Reviews</a>
            </li>
          </ul>
        </div>
        <div>
          <h4>Links</h4>
          <ul className="footerLinks">
            <li>
              <Link to={"/pricing"}>Pricing</Link>
              {/* <a href="#">Pricing</a> */}
            </li>
            <li>
              <Link to={"/#about"}>About us</Link>
              {/* <a href="#">About us</a> */}
            </li>
            <li>
              <a href="#">Careers</a>
            </li>
            <li>
              <a href="#blog">Blog</a>
            </li>
          </ul>
        </div>
        <div>
          <h4>Legal</h4>
          <ul className="footerLegal">
            <li>
              <a href="#">Terms of use</a>
            </li>
            <li>
              <a href="#">Terms & conditions</a>
            </li>
            <li>
              <a href="#">Privacy</a>
            </li>
            <li>
              <a href="#">Cookie policy</a>
            </li>
          </ul>
        </div>
        <div className="footerNewsletter">
          <h4>Newsletter</h4>
          <p>Join & get important updates</p>
          <div className="newsletterInputs">
            <label className="sr-only" htmlFor="newsEmail">
              Please enter your e-mail
            </label>
            <input id="newsEmail" placeholder="Enter your email" type="email" />
            <button className="buttonSquareGreen">Send</button>
          </div>
          <span>We only send interesting and relevant emails.</span>
        </div>
      </div>
      <div className="footerBottom">
        <div className="footerBottomLeft">
          <a href="#">Privacy & Terms</a>
          <Link to={"/contactUs"}>Contact Us</Link>
        </div>
        <p>Copyright© 2023 jobi inc.</p>
        <div className="footerBottomRight">
          <a href="#">
            <FacebookIcon />
          </a>
          <a href="#">
            <InstagramIcon />
          </a>
          <a href="#">
            <PinterestIcon />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
