import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
// Component imports
import Login from "./auth/Login";
import Signup from "./auth/Signup";
// redux imports
import { useSelector, useDispatch } from "react-redux";
import { POP_UP_LOG, POP_UP_REG } from "../redux/slices/popupSlice";
import { pagination } from "../redux/slices/paginationSlice";
import { USER_RESET } from "../redux/slices/userSlice";
import { JOB_ACTIVE } from "../redux/slices/jobListSlice";
// MUI +
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Swal from "sweetalert2";

const NavBar = () => {
  const [userActive, setUserActive] = useState(false);
  const [submenu, setSubmenu] = useState(false);
  const [lastEvent, setLastEvent] = useState("");
  const [showNav, setShowNav] = useState(false);
  const popups = useSelector((state) => state.popups);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
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
  const handleExitLogin = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(POP_UP_LOG(false));
    dispatch(POP_UP_REG(false));
  };
  // disable scrolling if popup active
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
    setShowNav(false);
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
    const unlisten = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserActive(true);
      } else {
        setUserActive(false);
        dispatch(USER_RESET());
      }
    });
    return () => {
      unlisten();
    };
  }, [auth.currentUser]);

  const handleSignout = () => {
    Swal.fire({
      title: "Sign out of your account?",
      // text: "Do you want to continue",
      icon: "warning",
      reverseButtons: true,
      showCancelButton: true,
      cancelButtonText: "Cancel",
      cancelButtonColor: "green",
      confirmButtonText: "Sign Out",
      confirmButtonColor: "orange",
    }).then((choice) => {
      if (choice.isConfirmed) {
        signOut(auth);
        navigate("/");
      }
    });
  };
  return (
    <div className={"navWrapper"}>
      <button onClick={() => setShowNav(!showNav)} className="showNavButton">
        menu
      </button>
      <nav tabIndex={0} className={showNav ? "mainNav" : "hideNav"}>
        <a ref={ref} className="sr-only" href={location.hash}></a>
        <div className="navLogo">
          {location.pathname === "/" || location.pathname === "/dashboard" ? (
            <img
              onClick={() => navigate("/")}
              src={"../assets/header/jobiLogo.png"}
              alt="jobi company logo"
            />
          ) : (
            <img
              onClick={() => navigate("/")}
              src={"../assets/header/jobiLogoDark.png"}
              alt="jobi company logo"
            />
          )}
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
            onFocus={handleOpenLinks}
          >
            <div className="subMenuTitle">
              Explore <KeyboardArrowDownIcon />
            </div>
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
            <button
              onClick={() => dispatch(POP_UP_LOG(true))}
              className="buttonRoundClear"
            >
              Log In
            </button>
            <button
              onClick={() => dispatch(POP_UP_REG(true))}
              className="buttonRoundGreen"
            >
              Sign Up
            </button>
          </div>
        ) : (
          <div className="navButtons">
            <button
              onClick={() => navigate("/dashboard")}
              className="buttonRoundClear"
            >
              Profile
            </button>
            <button onClick={handleSignout} className="buttonRoundGreen">
              Sign Out
            </button>
          </div>
        )}
      </nav>
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
    </div>
  );
};

export default NavBar;
