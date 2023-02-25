import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";

const NavBar = () => {
  const location = useLocation();
  const [submenu, setSubmenu] = useState(false);
  const ref = useRef(null);
  const menuRef = useRef(null);
  const handleOpenLinks = (e) => {
    e.stopPropagation();

    setSubmenu(!submenu);
  };
  useEffect(() => {
    const handleCloseLinks = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setSubmenu(false);
      }
    };
    document.addEventListener("mousedown", handleCloseLinks);
    return () => {
      document.removeEventListener("mousedown", handleCloseLinks);
    };
  }, [menuRef]);
  useEffect(() => {
    if (location.pathname === "/" && location.hash !== "") {
      ref.current?.click();
    }
  }, [location]);
  return (
    <nav className="navWrapper">
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
        <li
          ref={menuRef}
          className="subMenuParent"
          onClick={handleOpenLinks}
          // onMouseLeave={handleCloseLinks}
        >
          {/* <Link to={"/#about"}>About</Link> */}
          About
          {/* <a href="#about">about us</a> */}
          {/* {submenu && ( */}
          <ul
            className={submenu === true ? `subMenu slideOut` : `subMenu hide`}
          >
            <li>
              <Link to={"/#about"}>Get started</Link>
            </li>
            <li>
              <Link to={"/#blog"}>Guides / Blog</Link>
            </li>
            <li>
              <Link to={"/#reviews"}>Testimonials</Link>
            </li>
            <li>
              <Link to={"/#contact"}>Newsletter</Link>
            </li>
          </ul>
          {/* )} */}
        </li>
        <li>
          <Link to={"/#faq"}>FAQ</Link>
          {/* <a href="#faq">FAQ</a> */}
        </li>
        <li>
          <Link to={"/contactUs"}>contact</Link>
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
