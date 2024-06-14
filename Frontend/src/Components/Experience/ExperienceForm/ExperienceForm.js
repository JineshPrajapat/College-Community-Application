import React, { useState } from "react";
import MyCKeditor from "../../MyCKEditor/MyCKEditor";
import MyQuillEditor from "../../MyQuillEditor/MyQuillEditor"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import baseURL from "../../../api/api";
import { images } from "../../../constants";
import "./ExperienceForm.scss";
import ConfirmationDialog from "../../ConfirmationDialog/ConfirmationDialog";
import FlashMessage from "../../FlashMessage/FlashMessage";

function ExperienceForm() {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [flashMessage, setFlashMessage] = useState(false);


  const navigate = useNavigate();
  const handleCancel = () => {
    navigate(-1);                   // Navigate back to previous page
  };

  const [formValue, setformValue] = useState({
    experienceDescription: "",
    experienceTitle: "",
  });

  const handleChange = (event) => {
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };

  const handleDescriptionChange = (experienceDescription) => {
    // console.log(questionDescription);
    setformValue((prevState) => ({
      ...prevState,
      experienceDescription: experienceDescription,
    }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setShowConfirmation(true);
  };

  const handleConfirmation = (isConfirmed) => {
    if (isConfirmed) {

      const token = localStorage.getItem('token');
      console.log("frontend token", token);

      if (token) {
        axios
          .post(`${baseURL}/experience/addExperience`, {
            experienceTitle: formValue.experienceTitle,
            experienceDescription: formValue.experienceDescription,
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
                  "Experience added successfully.!",
              });
              navigate("/Experience")

            }
          })
          .catch((error) => {
            if (error.response) {
              console.error("Error:", error);
              if (error.response.status === 400) {
                console.error("Error:", error);
                setFlashMessage({
                  type: "error",
                  message: "All fields are required.",
                });
              } else if (error.response.status === 500) {
                setFlashMessage({
                  type: "error",
                  message: "Unable to update experience, try again!",
                });
              }

            } else {
              console.error("Network or request error");
              setFlashMessage({
                type: "error",
                message: "Network error",
              });
            }
          });
      }
      else {
        console.log("Token not found");
        setFlashMessage({
          type: "error",
          message: "Not added,try again",
        });
      }
    }
    setShowConfirmation(false);
  };

  return (
    <div
      className={`experience-body ${showConfirmation ? "show-confirmation" : ""}`}
    >
      <div className="experience-heading">
        <h2> Uniting Experiences for Growth</h2>
        <div className="sub-points">
          <p>
            "Transform your interview jitters into success stories, inspiring
            others to navigate their career paths with confidence and resilience."
          </p>
          <p>
            "Contribute your invaluable insights on placement preparation and job
            experiences, enriching our community with practical wisdom and
            collective learning."
          </p>
          <p>
            "Together, let's cultivate a supportive environment where shared
            experiences propel us all towards professional growth and foster
            lasting connections."
          </p>
        </div>
      </div>
      <div className="experience-form-container">
        {/* <img src={images.garima} alt="Dal-makhani" /> */}
        <form id="experience-form" onSubmit={handleFormSubmit}>
          <div className="pb-4">
            <strong >Add Your Experience</strong>
          </div>
          <label htmlFor="experienceTitle" aria-required="true">
            Experience Title:
            <input
              type="text"
              placeholder="Title"
              id="experienceTitle"
              name="experienceTitle"
              value={formValue.experienceTitle}
              onChange={handleChange}
              required
            />
          </label>
          <label htmlFor="experienceDescription" >
            Share your Experience/Review:
            {/* <MyCKeditor className="pb-3" onDescriptionChange={handleDescriptionChange} /> */}
            <MyQuillEditor classNamepb-3 onDescriptionChange={handleDescriptionChange}/>
          </label>

          <div className="btn-post" >
            <button className="experience-btn" type="submit">
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

export default ExperienceForm;
