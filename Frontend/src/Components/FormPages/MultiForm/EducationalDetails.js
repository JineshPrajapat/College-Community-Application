import React from 'react';
import { useState } from 'react';
import baseURL from '../../../api/api';
import axios from 'axios';

export const EducationalDetails = ({ handleFormSubmit }) => {

    const [formType, setFormType] = useState('college');
    const [formValue, setFormValue] = useState({
        collegeName: '',
        courseName: '',
        branchName: '',
        enrollmentNumber: '',
        passoutYear: '',
        studentId: null,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValue({ ...formValue, [name]: value });
    };

    const handleChange = (event) => {
        setFormValue({
            ...formValue,
            [event.target.name]: event.target.value
        });
    }

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormValue({
            ...formValue,
            [name]: files[0], name,
        });
    };

    const handleFormTypeChange = (type) => {
        setFormType(type);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");
        console.log("token", token);
        const formData = new FormData();
        formData.append('collegeName', formValue.collegeName);
        formData.append('courseName', formValue.courseName);
        formData.append('branchName', formValue.branchName);
        formData.append('enrollmentNumber', formValue.enrollmentNumber);
        formData.append('passoutYear', formValue.passoutYear);
        formData.append('studentId', formValue.studentId);

        try {
            axios.post(`${baseURL}/userinfo/submitInfo`, formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then(response => {
                    console.log("submitInfo", response);
                    if (response.status === 200) {
                        console.log("Information submitted successfully");
                        // call handleFormsubmit to call next form on successful submition
                        handleFormSubmit();    
                    }
                })
                .catch(error => {
                    if (error.response) {
                        if (error.response.status === 400) {
                            console.log("File not supported");
                        }
                        else if (error.response.status === 404) {
                            console.log("User not found");
                        }
                        else {
                            console.log("Error:", error);
                        }
                    }
                    else {
                        // handle network or request error
                        console.error('Network or request error:', error);
                    }
                })
        }
        catch (error) {
            console.error('Network or request error:', error);
        }
    };

    return (
        <div>
            <h2 className="fs-title">What is your Current Status</h2>
            <h3 className="fs-subtitle">This is step 1</h3>
            <div className="form-type-buttons">
                <button className={`form-type-button ${formType === 'college' ? 'active' : ''}`} onClick={() => handleFormTypeChange('college')}>
                    College Student
                </button>
                <button className={`form-type-button ${formType === 'professional' ? 'active' : ''}`} onClick={() => handleFormTypeChange('professional')}>
                    Professional
                </button>
            </div>
            <form onSubmit={handleSubmit}>
                {formType === 'college' && (
                    <>
                        <select
                            name="collegeName"
                            value={formValue.collegeName}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled  >Select College</option>
                            <option value="College of Technology And Engineering">College of Technology And Engineering, Udaipur</option>

                        </select>
                        {/* <input type="text" name="collegeAddress" placeholder="College Address" /> */}
                        <select
                            name="courseName"
                            value={formValue.courseName}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled>Select Course</option>
                            <option value="Btech">Btech</option>
                            <option value="Mtech">Mtech</option>
                            <option value="Phd">Phd</option>
                        </select>
                        <select
                            name="branchName"
                            value={formValue.branchName}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled>Select Branch</option>
                            <option value="Artificial Intelligence and Data Science Engineering">Artificial Intelligence and Data Science Engineering</option>
                            <option value="Computer Science Engineering">Computer Science Engineering</option>
                            <option value="Electronics and Communication Engineering">Electronics and Communication Engineering</option>
                            <option value="Electrical Engineering">Electrical Engineering</option>
                            <option value="Mining Engineering">Mining Engineering</option>
                            <option value="Mechanical Engineering">Mechanical Engineering</option>
                            <option value="Civil Engineering">Civil Engineering</option>
                            <option value="Agriculture Engineering">Agriculture Engineering</option>
                        </select>
                        <input
                            type="text"
                            name="passoutYear"
                            placeholder="PassOut Year"
                            id='year_field'
                            value={formValue.passoutYear}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="enrollmentNumber"
                            placeholder="Enrollment Number"
                            id='enrollmentNumber_field'
                            value={formValue.enrollmentNumber}
                            onChange={handleChange}
                            required
                        />

                        <lebel className=''>Student Id
                            <input
                                type="file"
                                name="studentId"
                                accept="image/*,.pdf"
                                placeholder="Student ID"
                                id='studentId_field'
                                onChange={handleFileChange}
                            />
                        </lebel>
                    </>
                )}
                {formType === 'professional' && (
                    <>
                        <input type="text" name="jobRole" placeholder="Job Role" />
                        <input type="text" name="company" placeholder="Company" />
                        <input type="text" name="companyId" placeholder="Company ID" />
                    </>
                )}
                <button type="submit" className="submit action-button" > Save & Next
                </button>
            </form>
        </div>
    )
}
