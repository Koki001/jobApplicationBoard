import NavBar from "../NavBar";

// MUI imports
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ViewComfyOutlinedIcon from "@mui/icons-material/ViewComfyOutlined";
import EventNoteOutlinedIcon from "@mui/icons-material/EventNoteOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
const Profile = () => {
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
                className="sr-only"
                id="dashboard"
                name="dashboard"
                type="radio"
              />
            </li>
            <li>
              <label htmlFor="profile">
                <PersonOutlineIcon sx={{ marginRight: "10px" }} />
                profile
              </label>
              <input
                className="sr-only"
                id="profile"
                name="dashboard"
                type="radio"
              />
            </li>
            <li>
              <label htmlFor="resume">
                <EventNoteOutlinedIcon sx={{ marginRight: "10px" }} />
                resume
              </label>
              <input
                className="sr-only"
                id="resume"
                name="dashboard"
                type="radio"
              />
            </li>
            <li>
              <label htmlFor="saved">
                <BookmarkBorderOutlinedIcon sx={{ marginRight: "10px" }} />
                saved jobs
              </label>
              <input
                className="sr-only"
                id="saved"
                name="dashboard"
                type="radio"
              />
            </li>
            <li>
              <label htmlFor="settings">
                <SettingsOutlinedIcon sx={{ marginRight: "10px" }} />
                settings
              </label>
              <input
                className="sr-only"
                id="settings"
                name="dashboard"
                type="radio"
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
          <div className="dashboardContent">
            <h2>Dashboard</h2>
            <ul className="dashboardStats">
              <li>Visitors</li>
              <li>Shortlisted</li>
              <li>Views</li>
              <li>Applied Jobs</li>
            </ul>
            <div className="dashboardSummary">
              <div className="summaryChart">chart</div>
              <div className="recentlyApplied">recent applications</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
