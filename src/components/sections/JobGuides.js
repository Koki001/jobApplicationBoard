// MUI imports
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

const JobGuides = () => {
  return (
    <section id="blog" className="jobGuides">
      <div className="jobGuidesWrapper wrapper">
        <div className="jobGuidesTop">
          <div className="jobGuidesHeading">
            <h2>Jobi Guides</h2>
            <a href="#">Explore More {">"}</a>
          </div>
          <ul className="jobGuidesBlogs">
            <li className="blogCard">
              <div className="blogImage">
                <img
                  src="../assets/jobGuides/blogPlaceholder.png"
                  alt="placeholder image for blog"
                />
                <button className="buttonRoundGreen">category</button>
              </div>
              <p className="publishedText">Published: 18 Jul 2021</p>
              <p className="blogHeading">
                Print and publush visual layour mockups
              </p>
              <a className="blogLink" href="#">
                Continue Reading <ArrowRightAltIcon />
              </a>
            </li>
            <li className="blogCard">
              <div className="blogImage">
                <img
                  src="../assets/jobGuides/blogPlaceholder.png"
                  alt="placeholder image for blog"
                />
                <button className="buttonRoundGreen">category</button>
              </div>
              <p className="publishedText">Published: 04 Feb 2022</p>
              <p className="blogHeading">
                Designer's Checklist for Every UX/UI Project
              </p>
              <a className="blogLink" href="#">
                Continue Reading <ArrowRightAltIcon />
              </a>
            </li>
          </ul>
        </div>
        <div className="jobGuidesBottom">
          <div className="cvUploadLeft">
            <img src="../assets/jobGuides/blogPlaceholder.png" alt="" />
          </div>
          <div className="cvUploadRight">
            <h2><span>Get your</span> <span>Matched Jobs in a</span> few minutes.</h2>
            <p>Find your dream job & earn from world leading brands. Upload your CV now.</p>
            <button className="buttonSquareGreen"> <img src="../assets/jobGuides/upload.png" alt="upload CV icon"/> Upload CV</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobGuides;
