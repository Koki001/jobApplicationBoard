import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";

const NavBar = () => {
  const location = useLocation();
  const [submenu, setSubmenu] = useState(false);
  const [lastEvent, setLastEvent] = useState("");
  const ref = useRef(null);
  const menuRef = useRef(null);
  const handleOpenLinks = (e) => {
    e.stopPropagation();
    setSubmenu(true);
  };
  const handleOpenLinksKey = (e) => {
    if (e.code === "Enter") {
      setSubmenu(!submenu);
      setLastEvent("");
    }
  };
  const handleOpenLinksHover = (e) => {
    setSubmenu(true);
    if (lastEvent === "") {
      setLastEvent("hover");
    }
  };
  const handleCloseLinksHover = () => {
    if (lastEvent === "hover") {
      setSubmenu(false);
      setLastEvent("");
    }
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
    <nav tabIndex={1} className="navWrapper">
      <a ref={ref} className="sr-only" href={location.hash}></a>
      <div className="navLogo">
        <img src={"../assets/header/jobiLogo.png"} alt="jobi company logo" />
      </div>
      <ul className="navMenu">
        <li>
          <Link to={"/#home"}>home</Link>
        </li>
        <li>
          <Link to={"/jobs"}>jobs</Link>
        </li>
        <li
          tabIndex={0}
          ref={menuRef}
          className={`subMenuParent`}
          onClick={handleOpenLinks}
          onKeyDown={handleOpenLinksKey}
          onMouseEnter={handleOpenLinksHover}
          onMouseLeave={handleCloseLinksHover}
        >
          <div className="subMenuTitle">About</div>
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
              <Link to={"/#faq"}>FAQ</Link>
            </li>
            <li>
              <Link to={"/#contact"}>Newsletter</Link>
            </li>
          </ul>
        </li>
        <li>
          <Link to={"/pricing"}>Plans</Link>
        </li>
        <li>
          <Link to={"/contactUs"}>contact</Link>
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
