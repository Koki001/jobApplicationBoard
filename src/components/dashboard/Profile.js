import NavBar from "../NavBar";
import Dashboard from "./Dashboard";
import MyProfile from "./candidates/MyProfile";
import CompanyProfile from "./employers/CompanyProfile";
import JobPost from "./employers/JobPost";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ref, child, get, onValue } from "firebase/database";
import { db, auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { ACC_TYPE } from "../../redux/slices/accTypeSlice";
// MUI imports
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ViewComfyOutlinedIcon from "@mui/icons-material/ViewComfyOutlined";
import EventNoteOutlinedIcon from "@mui/icons-material/EventNoteOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useLocation, useNavigate } from "react-router-dom";
const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const account = useSelector((state) => state.type.type);
  const navigate = useNavigate();
  const location = useLocation();
  const accountType = useSelector((state) => state.type.type);
  const [dashPage, setDashPage] = useState("dashboard");
  const [popupLogout, setPopupLogout] = useState(false);
  const candidateItems = {
    dashboard: <Dashboard />,
    profile: <MyProfile />,
  };
  const employerItems = {
    dashboard: <Dashboard />,
    profile: <CompanyProfile />,
    post: <JobPost />,
  };

  useEffect(() => {
    if (account === "") {
      onValue(
        ref(db, "users/candidates/" + auth.currentUser.uid),
        (snapshot) => {
          if (snapshot.val() !== null) {
            dispatch(ACC_TYPE("candidates"));
          } else {
            dispatch(ACC_TYPE("employers"));
          }
        }
      );
    }
  }, []);

  const handleSignout = () => {
    setPopupLogout(true);
  };
  const handleSignoutFinal = () => {
    setPopupLogout(false);
    if (location.pathname === "/dashboard") {
      navigate("/");
      signOut(auth);
    } else {
      signOut(auth);
    }
  };

  const handlePropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <section className="dashboardSection">
      <div className="dashboardContainer wrapper">
        <div
          onClick={() => setPopupLogout(false)}
          aria-hidden={popupLogout ? false : true}
          className={
            popupLogout ? "popupContainer popupActive" : "popupContainer"
          }
        >
          <div onClick={handlePropagation} className="logoutReminder">
            <p>Are you sure you want to sign out?</p>
            <div>
              <button
                className="buttonRoundClear"
                onClick={() => setPopupLogout(false)}
              >
                Cancel
              </button>
              <button className="buttonRoundGreen" onClick={handleSignoutFinal}>
                Yes, sign out
              </button>
            </div>
          </div>
        </div>
        <nav className="dashboardNav">
          <div className="avatar">
            <div className="avatarImage">{/* <img src="" alt="" /> */}</div>
            <p>USER</p>
          </div>
          <ul className="dashboardOptions">
            <li>
              <label htmlFor="dashboard">
                <ViewComfyOutlinedIcon sx={{ marginRight: "10px" }} />
                dashboard
              </label>
              <input
                onChange={(e) => {
                  setDashPage(e.target.value);
                }}
                className="sr-only"
                id="dashboard"
                name="dashboard"
                type="radio"
                value={"dashboard"}
              />
            </li>
            <li>
              <label htmlFor="profile">
                <PersonOutlineIcon sx={{ marginRight: "10px" }} />
                my profile
              </label>
              <input
                onChange={(e) => {
                  setDashPage(e.target.value);
                }}
                className="sr-only"
                id="profile"
                name="dashboard"
                type="radio"
                value={"profile"}
              />
            </li>
            <li>
              <label htmlFor="resume">
                <EventNoteOutlinedIcon sx={{ marginRight: "10px" }} />
                {accountType === "candidates" ? "resume" : "post job"}
              </label>
              <input
                onChange={(e) => {
                  setDashPage(e.target.value);
                }}
                className="sr-only"
                id="resume"
                name="dashboard"
                type="radio"
                value={accountType === "candidate" ? "resume" : "post"}
              />
            </li>
            <li>
              <label htmlFor="saved">
                <BookmarkBorderOutlinedIcon sx={{ marginRight: "10px" }} />
                saved jobs
              </label>
              <input
                onChange={(e) => {
                  setDashPage(e.target.value);
                }}
                className="sr-only"
                id="saved"
                name="dashboard"
                type="radio"
                value={"bookmarks"}
              />
            </li>
            <li>
              <label htmlFor="settings">
                <SettingsOutlinedIcon sx={{ marginRight: "10px" }} />
                settings
              </label>
              <input
                onChange={(e) => {
                  setDashPage(e.target.value);
                }}
                className="sr-only"
                id="settings"
                name="dashboard"
                type="radio"
                value={"settings"}
              />
            </li>
          </ul>
          <div className="dashboardLogout">
            <label onClick={handleSignout} htmlFor="log out">
              <LogoutOutlinedIcon sx={{ marginRight: "10px" }} />
              log out
            </label>
            <input
              className="sr-only"
              id="log out"
              name="dashboard"
              type="radio"
            />
          </div>
        </nav>
        <div className="dashboardWrapper">
          <NavBar />
          {accountType === "candidates"
            ? candidateItems[dashPage]
            : employerItems[dashPage]}
        </div>
      </div>
    </section>
  );
};

export default Profile;
