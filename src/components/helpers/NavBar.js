import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";

const NavBar = () => {
  const location = useLocation();
  // const [linkScroll, setLinkScroll] = useState(location.hash)
  // const navigate = useNavigate()
  const ref = useRef(null);

  useEffect(() => {
    if (location.pathname === "/" && location.hash !== "") {
      ref.current?.click();
    }
  }, [location]);
  return (
    <nav>
      <a ref={ref} className="sr-only" href={location.hash}></a>
      <div className="navLogo">
        <img src="../assets/header/jobiLogo.png" alt="jobi company logo" />
      </div>
      <ul className="navMenu">
        <li>
          <Link to={"/#home"}>home</Link>
          {/* <a href="#home">home</a> */}
        </li>
        <li>
          <Link to={"/#jobs"}>jobs</Link>
          {/* <a href="#jobs">jobs</a> */}
        </li>
        <li>
          <Link to={"/#about"}>about</Link>
          {/* <a href="#about">about us</a> */}
        </li>
        <li>
          <Link to={"/#faq"}>FAQ</Link>
          {/* <a href="#faq">FAQ</a> */}
        </li>
        <li>
          <Link to={"/#contact"}>contact</Link>
          {/* <a href="#contact">contact</a> */}
        </li>
      </ul>
      <div className="navButtons">
        <button className="buttonRoundClear">Login/Sign up</button>

        <button className="buttonRoundGreen">Post a job</button>
      </div>
    </nav>
  );
};

export default NavBar;
