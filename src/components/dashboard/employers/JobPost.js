import { push, ref } from "firebase/database";
import { useRef, useState } from "react";
import { db } from "../../../firebase";

const JobPost = () => {
  const [info, setInfo] = useState({});
  // const resRef = useRef()

  const handlePostJob = () => {
    push(ref(db, "data/jobs"), {
      title: info.title,
      description: info.description,
      responsibilities: info.responsibilities,
      required: info.required,
      benefits: info.benefits,
      salary: 10,
    });
  };
  const handleTextareaFocus = (e) => {
    if (e.target.value === ""){
      e.target.value += "• ";
    }
  }
  const handleTextareaEnter = (e) => {
    if (e.code === "Enter"){
      e.target.value += "• ";
    }
  }
  return (
    <div className="dashboardContent">
      <h2>Post a new job</h2>
      <div className="jobPostDetails">
        <h3>Job Details</h3>
        <div className="postTitle">
          <label htmlFor="jobPostTitle">Position title</label>
          <input
            onChange={(e) =>
              setInfo((prev) => ({
                ...prev,
                title: e.target.value,
              }))
            }
            className="editable"
            id="jobPostTitle"
            type="text"
          />
        </div>
        <div className="postDescription">
          <label htmlFor="jobPostDescription">Description</label>
          <textarea
            onChange={(e) =>
              setInfo((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            rows={8}
            className="editable"
            id="jobPostDescription"
            type="text"
          />
        </div>
        <div className="postResponsibilities">
          <label htmlFor="jobPostResponsibilities">Responsibilities</label>
          <textarea
            // ref={resRef}
            onFocus={handleTextareaFocus}
            onKeyUp={handleTextareaEnter}
            onChange={(e) =>
              setInfo((prev) => ({
                ...prev,
                responsibilities: e.target.value,
              }))
            }
            rows={8}
            className="editable"
            id="jobPostResponsibilities"
            type="text"
          />
        </div>
        <div className="postRequired">
          <label htmlFor="jobPostRequired">Required Skills</label>
          <textarea
            onFocus={handleTextareaFocus}
            onKeyUp={handleTextareaEnter}
            onChange={(e) =>
              setInfo((prev) => ({
                ...prev,
                required: e.target.value,
              }))
            }
            rows={8}
            className="editable"
            id="jobPostRequired"
            type="text"
          />
        </div>
        <div className="postBenefits">
          <label htmlFor="jobPostBenefits">Benefits</label>
          <textarea
            onFocus={handleTextareaFocus}
            onKeyUp={handleTextareaEnter}
            onChange={(e) =>
              setInfo((prev) => ({
                ...prev,
                benefits: e.target.value,
              }))
            }
            rows={8}
            className="editable"
            id="jobPostBenefits"
            type="text"
          />
        </div>
        <div className="postMix">
          <div className="postCategory">
            <label htmlFor="jobPostCategory">Category</label>
            <input className="editable" id="jobPostCategory" type="text" />
          </div>
          <div className="postType">
            <label htmlFor="jobPostType">Type</label>
            <select name="jobPostType" id="jobPostType">
              <option value="full-time">Full Time</option>
              <option value="part-time">Part Time</option>
              <option value="contract">Contract</option>
            </select>
            {/* <input className="editable" id="jobPostType" type="text" /> */}
          </div>
          <div className="postSalary">
            <label htmlFor="jobPostSalary">Salary</label>
            <input className="editable" id="jobPostSalary" type="text" />
          </div>
        </div>
      </div>
      <div className="jobPostSkills">
        <h3>Skills & Experience</h3>
        <div className="postSkills">
          <label htmlFor="jobPostSkills">Skills</label>
          <input className="editable" id="jobPostSkills" type="text" />
        </div>
        <div className="postExperience">
          <label htmlFor="jobPostExperience">Experience Required</label>
          <input className="editable" id="jobPostExperience" type="text" />
        </div>
      </div>
      <div className="jobPostLocation">
        <h3>Job Location</h3>
        <form action="" className="myProfileForm">
          <div className="addressTop">
            <label htmlFor="postingStreet">Address</label>
            <input className="editable" id="postingStreet" type="text" />
          </div>
          <div className="addressMiddle">
            <div className="profileCountry">
              <label htmlFor="postingCountry">Country</label>
              <input className="editable" id="postingCountry" type="text" />
            </div>
            <div className="profileCity">
              <label htmlFor="postingCity">City</label>
              <input className="editable" id="postingCity" type="text" />
            </div>
            <div className="profilePostal">
              <label htmlFor="postingPostal">Post Code</label>
              <input className="editable" id="postingPostal" type="text" />
            </div>
          </div>
        </form>
        <div className="jobPostMap"></div>
      </div>
      <button onClick={handlePostJob} className="buttonSquareGreen">
        review
      </button>
    </div>
  );
};

export default JobPost;
