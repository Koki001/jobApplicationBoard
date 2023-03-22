import { push, ref } from "firebase/database";
import React, { useRef, useState } from "react";
import { auth, db } from "../../../firebase";
import jobSectors from "../../helpers/jobSectors";
import { useSelector } from "react-redux";
import * as dayjs from "dayjs";

const JobPost = (props) => {
  const user = useSelector((state) => state.user);
  const [info, setInfo] = useState({ skills: [] });
  const [currentSkill, setCurrentSkill] = useState("");
  const regexNum = new RegExp("^[0-9]*$");
  // const resRef = useRef()
  const date = new Date()
  const handlePostJob = () => {
    const companyID = auth.currentUser.uid
    console.log(companyID)
    if (
      info.title &&
      info.description &&
      info.responsibilities &&
      info.required &&
      info.benefits &&
      info.category &&
      info.type &&
      info.salary &&
      info.skills &&
      info.experience &&
      info.address &&
      info.country &&
      info.city &&
      info.postal
    ) {
      push(ref(db, "data/jobs"), {
        company: user.user.name,
        title: info.title,
        description: info.description,
        responsibilities: info.responsibilities,
        required: info.required,
        benefits: info.benefits,
        category: info.category,
        type: info.type,
        salary: info.salary,
        skills: info.skills,
        experience: info.experience,
        address: info.address,
        country: info.country,
        city: info.city,
        postal: info.postal,
        createdOn: dayjs().format("dddd/MM/YYYY"),
        dateMs: date.getTime(),
        id: companyID
      }).then(() => {
        alert("job posted");
        props.posted();
      });
    } else {
      alert("fill out all fields");
    }
  };
  const handleTextareaFocus = (e) => {
    if (e.target.value === "") {
      e.target.value += "• ";
    }
  };
  const handleTextareaEnter = (e) => {
    if (e.code === "Enter") {
      e.target.value += "• ";
    }
  };
  const handleSalary = (e) => {
    if (regexNum.test(e.target.value)) {
      setInfo((prev) => ({
        ...prev,
        salary: e.target.value,
      }));
    } else {
      e.target.value = "";
    }
  };
  const handleSkills = (e) => {
    setCurrentSkill(e.target.value);
  };
  const handleSkillsEnter = (e) => {
    if (e.code === "Enter"){
      handleAddSkill()
    }
  }
  const handleAddSkill = () => {
    if (currentSkill !== "") {
      setCurrentSkill("");
      setInfo((prev) => ({
        ...prev,
        skills: [...prev.skills, currentSkill],
      }));
    }
  };
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
            id="jobPostResponsibilities"
            type="text"
          />
        </div>
        <div className="postRequired">
          <label htmlFor="jobPostRequired">Requirements</label>
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
            id="jobPostBenefits"
            type="text"
          />
        </div>
        <div className="postMix">
          <div className="postCategory">
            <label htmlFor="jobPostCategory">Category</label>
            <select
              defaultValue={"categoryPlaceholder"}
              onChange={(e) =>
                setInfo((prev) => ({
                  ...prev,
                  category: e.target.value,
                }))
              }
              name="jobPostCategory"
              id="jobPostCategory"
            >
              <option disabled value="categoryPlaceholder">
                Please select one
              </option>
              {jobSectors.map((item, index) => {
                return (
                  <option key={index + "jobSector"} value={item}>
                    {item}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="postType">
            <label htmlFor="jobPostType">Type</label>
            <select
              defaultValue={"typePlaceholder"}
              onChange={(e) =>
                setInfo((prev) => ({
                  ...prev,
                  type: e.target.value,
                }))
              }
              name="jobPostType"
              id="jobPostType"
            >
              <option disabled value="typePlaceholder">
                Please select one
              </option>
              <option value="full-time">Full Time</option>
              <option value="part-time">Part Time</option>
              <option value="contract">Contract</option>
            </select>
            {/* <input  id="jobPostType" type="text" /> */}
          </div>
          <div className="postSalary">
            <label htmlFor="jobPostSalary">Salary</label>
            <input
              placeholder="Numbers only..."
              onChange={handleSalary}
              id="jobPostSalary"
              type="text"
            />
          </div>
          <div className="postExperience">
            <label htmlFor="jobPostExperience">Experience Required</label>
            <select
              defaultValue={"experiencePlaceholder"}
              onChange={(e) =>
                setInfo((prev) => ({
                  ...prev,
                  experience: e.target.value,
                }))
              }
              name="jobPostExperience"
              id="jobPostExperience"
            >
              <option disabled value="experiencePlaceholder">
                Please select one
              </option>
              <option value="0">Less than 1 year</option>
              <option value="1">1 year</option>
              <option value="2">2 years</option>
              <option value="3">3 years</option>
              <option value="4">4 years</option>
              <option value="5">5 years</option>
              <option value="6">6 years</option>
              <option value="7">7 years</option>
              <option value="8">8 years</option>
              <option value="9">9 years</option>
              <option value="10">10 years</option>
              <option value="11">More than 10 years</option>
            </select>
          </div>
          <div className="postSkills">
            <div>
              <label htmlFor="jobPostSkills">Skills</label>
              <input
                onChange={handleSkills}
                onKeyDown={handleSkillsEnter}
                value={currentSkill}
                className=""
                id="jobPostSkills"
                type="text"
              />
            </div>
            <button className="buttonSquareDarkGreen" onClick={handleAddSkill}>add</button>
            <p>First 4 skills will be displayed on the job posting's details page.</p>
          </div>
        </div>
        <div className="skillHolder">
          {info.skills.map((item, index) => {
            return (
              <span className="skillItem" key={index + "skillItem"}>{item}</span>
            )
          })}
        </div>
      </div>
      <div className="jobPostLocation">
        <h3>Job Location</h3>
        <form action="" className="myProfileForm">
          <div className="addressTop">
            <label htmlFor="postingStreet">Address</label>
            <input
              onChange={(e) =>
                setInfo((prev) => ({
                  ...prev,
                  address: e.target.value,
                }))
              }
              id="postingStreet"
              type="text"
            />
          </div>
          <div className="addressMiddle">
            <div className="profileCountry">
              <label htmlFor="postingCountry">Country</label>
              <input
                onChange={(e) =>
                  setInfo((prev) => ({
                    ...prev,
                    country: e.target.value,
                  }))
                }
                id="postingCountry"
                type="text"
              />
            </div>
            <div className="profileCity">
              <label htmlFor="postingCity">City</label>
              <input
                onChange={(e) =>
                  setInfo((prev) => ({
                    ...prev,
                    city: e.target.value,
                  }))
                }
                id="postingCity"
                type="text"
              />
            </div>
            <div className="profilePostal">
              <label htmlFor="postingPostal">Post Code</label>
              <input
                onChange={(e) =>
                  setInfo((prev) => ({
                    ...prev,
                    postal: e.target.value,
                  }))
                }
                id="postingPostal"
                type="text"
              />
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
