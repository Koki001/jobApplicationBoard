const JobGuides = () => {
  return (
    <section className="jobGuides">
      <div className="jobGuidesTop">
        <div className="jobGuidesHeading">
          <h2>Jobi Guides</h2>
          <a href="#">Explore more</a>
        </div>
        <div className="jobGuidesBlogs">
          <div className="blogCard">
            <div className="blogImage">
              <img src="" alt="" />
              <p>text</p>
            </div>
            <p>featured - date</p>
            <p>blog title</p>
            <a href="#">continue reading</a>
          </div>
        </div>
        <div className="jobGuidesBlogs">
          <div className="blogCard">
            <div className="blogImage">
              <img src="" alt="" />
              <p>text</p>
            </div>
            <p>featured - date</p>
            <p>blog title</p>
            <a href="#">continue reading</a>
          </div>
        </div>
      </div>
      <div className="jobGuidesBottom">
        <div className="cvUploadLeft">
          <img src="" alt="" />
        </div>
        <div className="cvUploadRight">
          <h2>Get your Matched Jobs in a few minutes.</h2>
          <p>Find your dream job</p>
          <button>upload CV</button>
        </div>
      </div>
    </section>
  );
};

export default JobGuides;
