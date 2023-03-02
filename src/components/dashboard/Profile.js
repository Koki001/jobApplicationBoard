import NavBar from "../NavBar";
import Dashboard from "./Dashboard";
import MyProfile from "./MyProfile";
// MUI imports
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ViewComfyOutlinedIcon from "@mui/icons-material/ViewComfyOutlined";
import EventNoteOutlinedIcon from "@mui/icons-material/EventNoteOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useState } from "react";
const Profile = () => {

  const [dashPage, setDashPage] = useState("dashboard")
  const dashItems = {
    "dashboard": <Dashboard />,
    "profile": <MyProfile />,
  }

  return (
    <section className="dashboardSection">
      <div className="dashboardContainer wrapper">
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
              onChange={(e) => {setDashPage(e.target.value)}}
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
              onChange={(e) => {setDashPage(e.target.value)}}
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
                resume
              </label>
              <input
              onChange={(e) => {setDashPage(e.target.value)}}
                className="sr-only"
                id="resume"
                name="dashboard"
                type="radio"
                value={"resume"}
              />
            </li>
            <li>
              <label htmlFor="saved">
                <BookmarkBorderOutlinedIcon sx={{ marginRight: "10px" }} />
                saved jobs
              </label>
              <input
              onChange={(e) => {setDashPage(e.target.value)}}
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
              onChange={(e) => {setDashPage(e.target.value)}}
                className="sr-only"
                id="settings"
                name="dashboard"
                type="radio"
                value={"settings"}
              />
            </li>
          </ul>
          <div className="dashboardLogout">
            <label htmlFor="log out">
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
          {
            dashItems[dashPage]
          }
        </div>
      </div>
    </section>
  );
};

export default Profile;
