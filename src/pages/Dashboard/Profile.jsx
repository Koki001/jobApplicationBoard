import NavBar from "../../components/NavBar";
import MyDashboard from "./Candidates/MyDashboard";
import CompanyDashboard from "./Employers/CompanyDashboard";
import MyProfile from "./Candidates/MyProfile";
import CompanyProfile from "./Employers/CompanyProfile";
import JobPost from "./Employers/JobPost";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ref, child, get, onValue } from "firebase/database";
import { db, auth, storage } from "../../firebase/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { ACC_TYPE } from "../../redux/slices/accTypeSlice";
import { useNavigate } from "react-router-dom";
import { USER } from "../../redux/slices/userSlice";
// MUI imports
import Swal from "sweetalert2";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ViewComfyOutlinedIcon from "@mui/icons-material/ViewComfyOutlined";
import EventNoteOutlinedIcon from "@mui/icons-material/EventNoteOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import SavedJobs from "./Candidates/SavedJobs";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [dashPage, setDashPage] = useState("dashboard");
  const [dashNav, setDashNav] = useState(false);

  const [userInfo, setUserInfo] = useState();

  const handleDashNav = (e) => {
    e.stopPropagation();
    setDashNav(!dashNav);
  };
  // components specific to candidate accounts
  const candidateItems = {
    dashboard: <MyDashboard />,
    profile: <MyProfile />,
    bookmarks: <SavedJobs />
  };
  // components specific to employer accounts
  const employerItems = {
    dashboard: <CompanyDashboard />,
    profile: <CompanyProfile />,
    post: <JobPost posted={() => setDashPage("dashboard")} />,
  };
  useEffect(() => {
    const unlisten = onAuthStateChanged(auth, async (user) => {
      if (user) {
        onValue(ref(db, "users/" + auth.currentUser.uid), (snapshot) => {
          if (snapshot.val() !== null) {
            dispatch(USER(snapshot.val()));
            dispatch(ACC_TYPE(snapshot.val().type));
            setUserInfo(snapshot.val());
          }
        });
      }
      return () => {
        unlisten();
      };
    });
  }, [auth.currentUser?.uid]);

  const handleSignout = () => {
    Swal.fire({
      title: "Sign out of your account?",
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
    <section className="dashboardSection">
      <div className="dashboardContainer navWrapper">
        <nav
          className={
            dashNav
              ? "dashboardNav dashboardNavVisible"
              : "dashboardNav dashboardNavHidden"
          }
        >
          <input
            className="sr-only dashNavCheckbox"
            id="dashNav"
            type="checkbox"
          />
          <label
            onClick={handleDashNav}
            className={
              dashNav
                ? "dashboardNavButton dashClosed"
                : "dashboardNavButton dashOpen"
            }
            htmlFor="dashNav"
          >
            <ArrowRightIcon />
          </label>
          <div className="avatar">
            <div className="avatarImage">
              <img src={userInfo?.logo} alt="" />
            </div>
            <p>{userInfo?.name}</p>
          </div>
          <ul className="dashboardOptions">
            <li>
              <label htmlFor="dashboard">
                <ViewComfyOutlinedIcon sx={{ marginRight: "10px" }} />
                overview
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
                {userInfo?.type === "candidate" ? "My Profile" : "Company"}
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
                {userInfo?.type === "candidate" ? "resume" : "post job"}
              </label>
              <input
                onChange={(e) => {
                  setDashPage(e.target.value);
                }}
                className="sr-only"
                id="resume"
                name="dashboard"
                type="radio"
                value={userInfo?.type === "candidate" ? "resume" : "post"}
              />
            </li>
            <li>
              <label htmlFor="saved">
                <BookmarkBorderOutlinedIcon sx={{ marginRight: "10px" }} />
                {userInfo?.type === "candidate" ? "saved jobs" : "applicants"}
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
          {userInfo?.type === "candidate"
            ? candidateItems[dashPage]
            : employerItems[dashPage]}
        </div>
      </div>
    </section>
  );
};

export default Profile;
