import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Login from "./helpers/Login";
import Signup from "./helpers/Signup";
import { POP_UP_LOG, POP_UP_REG } from "../redux/slices/popupSlice";
import { pagination, PAGINATION_MAX } from "../redux/slices/paginationSlice";
import { useSelector, useDispatch } from "react-redux";
import { JOB_ACTIVE } from "../redux/slices/jobListSlice";
import { auth } from "../firebase";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const NavBar = () => {
  const popups = useSelector((state) => state.popups);
  const [userActive, setUserActive] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const [submenu, setSubmenu] = useState(false);
  const [lastEvent, setLastEvent] = useState("");
  const ref = useRef(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();

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
  const handleLogin = () => {
    dispatch(POP_UP_LOG(true));
  };
  const handleSignUp = () => {
    dispatch(POP_UP_REG(true));
  };
  const handleExitLogin = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(POP_UP_LOG(false));
    dispatch(POP_UP_REG(false));
  };
  const handleExitSignup = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(POP_UP_REG(false));
  };
  useEffect(() => {
    if (popups.login || popups.signup) {
      document.body.style.overflow = "hidden";
    } else if (!popups.login && !popups.signup) {
      document.body.style.overflow = "unset";
    }
  }, [popups.login, popups.signup]);

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
    if (!location.pathname.includes("jobs")) {
      dispatch(pagination(1));
      dispatch(JOB_ACTIVE(false));
    }
    dispatch(POP_UP_LOG(false));
  }, [location]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserActive(true);
      } else {
        setUserActive(false);
      }
    });
  }, [auth.currentUser]);

  const handleSignout = () => {
    if (location.pathname === "/dashboard") {
      navigate("/");
      signOut(auth);
    } else {
      signOut(auth);
    }
  };
  const handleProfile = () => {
    navigate("/dashboard")
  };
  return (
    <nav tabIndex={0} className="navWrapper">
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
          <div className="subMenuTitle">Explore</div>
          <ul
            className={submenu === true ? `subMenu slideOut` : `subMenu hide`}
          >
            <li>
              <Link to={"/#about"}>About Us</Link>
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
          </ul>
        </li>
        <li>
          <Link to={"/pricing"}>Plans</Link>
        </li>
        <li>
          <Link to={"/contactUs"}>contact</Link>
        </li>
      </ul>
      {!userActive ? (
        <div className="navButtons">
          <button onClick={handleLogin} className="buttonRoundClear">
            Log In
          </button>
          <button onClick={handleSignUp} className="buttonRoundGreen">
            Sign Up
          </button>
        </div>
      ) : (
        <div className="navButtons">
          <button onClick={handleProfile} className="buttonRoundClear">
            Profile
          </button>
          <button onClick={handleSignout} className="buttonRoundGreen">
            Sign Out
          </button>
        </div>
      )}
      <div
        onClick={handleExitLogin}
        aria-hidden={popups.login || popups.signup ? false : true}
        className={
          popups.login === true || popups.signup === true
            ? "popupContainer popupActive"
            : "popupContainer"
        }
      >
        {popups.login === true ? (
          <Login />
        ) : popups.signup === true ? (
          <Signup />
        ) : null}
      </div>
    </nav>
  );
};

export default NavBar;
