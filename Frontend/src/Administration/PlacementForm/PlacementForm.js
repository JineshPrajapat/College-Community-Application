import React, { useState } from 'react';
import axios from 'axios';
import ConfirmationDialog from '../../Components/ConfirmationDialog/ConfirmationDialog';
import FlashMessage from '../../Components/FlashMessage/FlashMessage';
import './PlacementForm.scss';

const PlacementsForm = () => {

    const [showConfirmation, setShowConfirmation] = useState(false);
    const [flashMessage, setFlashMessage] = useState(false);

    const [formValue, setformValue] = useState({
        year: '',
        branch: '',
        company: '',
        numApplied: '',
        numPlaced: ''
    });

    const handleChange = (event) => {
        setformValue({
            ...formValue,
            [event.target.name]: event.target.value
        })
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        setShowConfirmation(true);
    };

    const handleConfirmation = (isConfirmed) => {
        if (isConfirmed) {
            axios
                .post("http://localhost:3001/Admin/placementform", {
                    year:formValue.year,
                    branch: formValue.branch,
                    company: formValue.company,
                    numApplied:formValue.numApplied,
                    numPlaced:formValue.numPlaced 
                })
                .then((response) => {
                    console.log("Response:", response);

                    if (response.status === 200) {
                        setFlashMessage({
                            type: "success",
                            message:
                                "Details added succesfully!",
                        });
                    }
                })
                .catch((error) => {
                    if (error.response) {
                        console.error("Error:", error);
                        setFlashMessage({
                            type: "error",
                            message: "Failed, try again!",
                        });
                    } else {
                        console.error("Network or request error");
                    }
                });
        }
        setShowConfirmation(false);
    };

    return (

        <div className={`input-placement-details ${showConfirmation ? "show-confirmation" : ""}`}>
            <div className="form-header">
                <div>
                    <p>This form captures placement details like year, branch, company, number of students applied, and placed. Its advantage lies in easy data collection for analyzing placement trends, aiding career services. "Shape your future, one placement at a time."</p>
                </div>
            </div>
            <form className="placements-form" onSubmit={handleFormSubmit}>
                <div className="form-group">
                    <label htmlFor="year">Year:</label>
                    <input
                        type="text"
                        id="year"
                        name="year"
                        value={formValue.year}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="branch">Branch:</label>
                    <select
                        id="branch"
                        name="branch"
                        value={formValue.branch}
                        onChange={handleChange}>

                        <option value="cse">Computer Science Engineering</option>
                        <option value="ai&Da">Artificial Intelligence and Data Science</option>
                        <option value="ece">Electronics and Communication Engineering</option>
                        <option value="ee">Electrical Engineering</option>
                        <option value="me">Mechanical Engineering</option>
                        <option value="ag">Agriculture Engineering</option>
                        <option value="ce">Civil Engineering</option>
                        <option value="mge">MiningEngineering</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="company">Company:</label>
                    <input
                        type="text"
                        id="company"
                        name="company"
                        value={formValue.company}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="numApplied">Number of Students Applied:</label>
                    <input
                        type="text"
                        id="numApplied"
                        name="numApplied"
                        value={formValue.numApplied}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="numPlaced">Number of Students Placed:</label>
                    <input
                        type="text"
                        id="numPlaced"
                        name="numPlaced"
                        value={formValue.numPlaced}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Submit</button>
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
    );
};

export default PlacementsForm;
