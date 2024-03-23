import React, { useState } from "react";
import axios from "axios";
import baseURL from "../../../api/api";
import { useNavigate } from "react-router-dom";
import { images } from "../../../constants";
import "./OpportunityForm.scss";
import ConfirmationDialog from "../../ConfirmationDialog/ConfirmationDialog";
import FlashMessage from "../../FlashMessage/FlashMessage";

function OpportunityForm() {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [flashMessage, setFlashMessage] = useState(false);

  const [formValue, setformValue] = useState({
    profile: "",
    company: "",
    branch: "",
    opportunityLink: "",
    yearOfExperience: "",
    applicationDeadline: "",
    positionType: "",
  });

  const navigate = useNavigate();
  const handleCancel = () => {
    navigate(-1);                   // Navigate back to previous page
  };

  const handleChange = (event) => {
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };

  const handleDescriptionChange = (questionDescription) => {
    // console.log(questionDescription);
    setformValue((prevState) => ({
      ...prevState,
      questionDescription: questionDescription,
    }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setShowConfirmation(true);
  };

  const handleConfirmation = (isConfirmed) => {
    if (isConfirmed) {

      // Retrieve token from localStorage
      const token = localStorage.getItem('token');
      console.log("frontend token", token);

      if (token) {
        console.log(formValue)
        axios
          .post(`${baseURL}/opportunity/addOpportunity`, {
            company: formValue.company,
            branch: formValue.branch,
            opportunityLink: formValue.opportunityLink,
            applicationDeadline: formValue.applicationDeadline,
            profile: formValue.profile,
            positionType: formValue.positionType,
            yearOfExperience: formValue.yearOfExperience,
          }, {
            headers: {
              Authorization: `Bearer ${token}`            // Include token in Authorization header
            }
          })
          .then((response) => {
            console.log("Response:", response);

            if (response.status === 200) {

              setFlashMessage({
                type: "success",
                message:
                  "We recieved your opportunity, Thanks for your help. Happy to see you soon!",
              });
              navigate('/Opportunity');
            }
          })
          .catch((error) => {
            if (error.response) {
              console.error("Error:", error);
              setFlashMessage({
                type: "error",
                message: "Opportunity updation failed, try again!",
              });
            } else {
              console.error("Network or request error");
            }
          });
      }
      else {
        setFlashMessage({
          type: "error",
          message: "Not Authorized",
        });
      }
    }
    setShowConfirmation(false);
  };

  return (
    <div
      className={`opportunity-body ${showConfirmation ? "show-confirmation" : ""}`}>
      <div className="opportunity-heading">
        <h2>Share Opportunities among friends</h2>
        <p>
          Unleash potential together by sharing diverse opportunities including jobs, internships, full-time, and part-time positions. Empower friends to pursue their dreams and aspirations.
        </p>
      </div>
      <div className="opportunity-form-container">
        {/* <img src={images.garima} alt="Dal-makhani" /> */}
        <form id="opportunity-form" onSubmit={handleFormSubmit}>
          <div className="pb-4">
            <strong >Add Oppotunity</strong>
          </div>
          <label htmlFor="profile" aria-required="true">
            Profile:
            <input
              type="text"
              placeholder="Job Profile"
              id="profile"
              name="profile"
              value={formValue.profile}
              onChange={handleChange}
              required
            />
          </label>
          <label htmlFor="company" aria-required="true">
            Company:
            <input
              type="text"
              placeholder="Company name"
              id="company"
              name="company"
              value={formValue.company}
              onChange={handleChange}
              required
            />
          </label>
          <label htmlFor="Branch:">
            Branch
            <select
              id="branch"
              name="branch"
              value={formValue.branch}
              onChange={handleChange}
            >
              <option value="" disabled selected>Select Branch</option>
              <option value="cse">Computer Science Engineering</option>
              <option value="ai&Da">
                Artificial Intelligence and Data Science
              </option>
              <option value="ece">
                Electronics and Communication Engineering
              </option>
              <option value="ee">Electrical Engineering</option>
              <option value="me">Mechanical Engineering</option>
              <option value="ag">Agriculture Engineering</option>
              <option value="ce">Civil Engineering</option>
              <option value="mge">MiningEngineering</option>
              <option value="other">Other</option>
            </select>
          </label>
          <label htmlFor="positionType:">
            Position Type:
            <select
              id="positionType"
              name="positionType"
              value={formValue.positionType}
              onChange={handleChange}
            >
              <option value="" disabled selected>Select Position</option>
              <option defaultChecked value="job">Job</option>
              <option value="IFt">Internship: Full-time</option>
              <option value="IPT">Internship: Part-time</option>
            </select>
          </label>
          <label htmlFor="yearOfExperience" aria-required="true">
            Years of experience:
            <input
              type="text"
              placeholder="NA / 2year"
              id="yearOfExperience"
              name="yearOfExperience"
              value={formValue.yearOfExperience}
              onChange={handleChange}
              required
            />
          </label>
          <label htmlFor="opportunityLink">
            Link For Apply:
            <input
              type="text"
              placeholder="https://www.abc.com"
              id="opportunityLink"
              name="opportunityLink"
              value={formValue.opportunityLink}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="applicationDeadline">
            Aplication Deadline:
            <input
              type="date"
              id="applicationDeadline"
              name="applicationDeadline"
              aria-hidden="true"
              value={formValue.applicationDeadline}
              onChange={handleChange}
              required
            />
          </label>

          <div className="btn-post" >
            <button className="opportunity-btn" type="submit">
              Submit
            </button>
            <div className="close" onClick={handleCancel}>Cancel</div>
          </div>
        </form>

        {/* confirmation component */}
        {showConfirmation && (
          <ConfirmationDialog
            message={"Are you sure you want to submit this form?"}
            onConfirm={handleConfirmation}
          />
        )}

        {/* flash component */}
        {flashMessage && (
          <FlashMessage
            type={flashMessage.type}
            message={flashMessage.message}
          />
        )}
      </div>
    </div>
  );
}

export default OpportunityForm;
