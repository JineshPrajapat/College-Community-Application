import React, { useState } from "react";
import axios from "axios";
import { images } from "../../constants";
import "./OpportunityForm.scss";
import ConfirmationDialog from "../ConfirmationDialog/ConfirmationDialog";
import FlashMessage from "../FlashMessage/FlashMessage";

function OpportunityForm() {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [flashMessage, setFlashMessage] = useState(false);

  const [formValue, setformValue] = useState({
    profile: "",
    company: "",
    branch: "",
    link: "",
    experienceRequired: "",
    deadline: "",
    positionType: "",
  });

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
      axios
        .post("http://localhost:3001/Questions", {
          company: formValue.company,
          branch: formValue.branch,
          link: formValue.link,
          deadline: formValue.deadline,
          profile: formValue.profile,
          positionType:formValue.positionType,
          experienceRequired: formValue.experienceRequired,
        })
        .then((response) => {
          console.log("Response:", response);

          if (response.status === 200) {
            setFlashMessage({
              type: "success",
              message:
                "We recieved your questions, will be update in 2 working days. Happy to see you soon!",
            });
          }
        })
        .catch((error) => {
          if (error.response) {
            console.error("Error:", error);
            setFlashMessage({
              type: "error",
              message: "Reservation failed, try again!",
            });
          } else {
            console.error("Network or request error");
          }
        });
    }
    setShowConfirmation(false);
  };

  return (
    <div
      className={`opportunity-body ${ showConfirmation ? "show-confirmation" : ""}`}>
      <div className="opportunity-heading">
        <h2>Share Opportunities among friends</h2>
        <p>
        Unleash potential together by sharing diverse opportunities including jobs, internships, full-time, and part-time positions. Empower friends to pursue their dreams and aspirations.
        </p>
      </div>
      <div className="opportunity-form-container">
        {/* <img src={images.garima} alt="Dal-makhani" /> */}
        <form id="opportunity-form" onSubmit={handleFormSubmit}>
          <label htmlFor="profile" aria-required="true">
            Profile:
            <input
              type="text"
              placeholder="profile"
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
              placeholder="Enter company name"
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
              <option value="job">Job</option>
              <option value="IFt">Internship: Full-time</option>
              <option value="IPT">Internship: Part-time</option>
            </select>
          </label>
          <label htmlFor="experienceRequired" aria-required="true">
            Years of experience:
            <input
              type="text"
              placeholder="NA / 2year"
              id="experienceRequired"
              name="experienceRequired"
              value={formValue.experienceRequired}
              onChange={handleChange}
              required
            />
          </label>
          <label htmlFor="link">
            Link For Apply:
            <input
              type="text"
              placeholder="https://www.abc.com"
              id="link"
              name="link"
              value={formValue.phone_number}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="deadline">
            Aplication Deadline:
            <input
              type="date"
              id="deadline"
              name="deadline"
              aria-hidden="true"
              value={formValue.deadline}
              onChange={handleChange}
              required
            />
          </label>

          <button className="opportunity-btn" type="submit">
            Submit
          </button>
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
