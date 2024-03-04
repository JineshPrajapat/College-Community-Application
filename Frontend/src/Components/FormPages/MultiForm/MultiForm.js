import React, { useState } from 'react';
import './MultiForm.scss';


const CollegeInfo = [
    {
        "name": "College A",
        "courses": [
            {
                "name": "BTech",
                "fields": [
                    {
                        "name": "CSE",
                        "enrollmentNumbers": [
                            {
                                "enrollmentNumber": "123456",
                                "studentId": "studentId1"
                            },
                            {
                                "enrollmentNumber": "789012",
                                "studentId": "studentId2"
                            }
                            // Add more enrollment numbers and student IDs as needed
                        ]
                    },
                    {
                        "name": "ECE",
                        "enrollmentNumbers": [
                            // Add enrollment numbers and student IDs for ECE field if applicable
                        ]
                    },
                    {
                        "name": "ME",
                        "enrollmentNumbers": [
                            // Add enrollment numbers and student IDs for ME field if applicable
                        ]
                    },
                    {
                        "name": "CE",
                        "enrollmentNumbers": [
                            // Add enrollment numbers and student IDs for CE field if applicable
                        ]
                    }
                    // Add more fields as needed
                ]
            },
            {
                "name": "MTech",
                "fields": [
                    // Define fields similar to BTech for MTech course if applicable
                ]
            },
            {
                "name": "PhD",
                "fields": [
                    // Define fields similar to BTech for PhD course if applicable
                ]
            }
            // Add more courses as needed
        ]
    },
    {
        "name": "College B",
        "courses": [
            // Define courses and fields similar to College A if applicable
        ]
    }
    // Add more colleges as needed
];



function MultiForm() {
    const [step, setStep] = useState(1);

    const [formType, setFormType] = useState('college');
    const handleFormTypeChange = (type) => {
        setFormType(type);
    };

    const nextStep = () => {
        setStep(step + 1);
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted!');
    };

    return (
        <div className='mscontainer'>
            <div id="msform" onSubmit={handleSubmit}>
                {/* progressbar */}
                <ul id="progressbar">
                    <li className={step === 1 ? 'active' : ''}>Educational Details</li>
                    <li className={step === 2 ? 'active' : ''}>Personal Details</li>
                    <li className={step === 3 ? 'active' : ''}>Social Profiles</li>
                </ul>
                {/* fieldsets */}

                {/* college or professional form */}
                <fieldset style={{ display: step === 1 ? 'block' : 'none' }}>
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
                    <form  onSubmit={handleSubmit}>
                        {formType === 'college' && (
                            <>
                                <select name="collegeName" className="h-96" required>
                                    <option value="" disabled  >Select College</option>
                                    <option value="College of Technology And Engineering, Udaipur">College of Technology And Engineering, Udaipur</option>

                                </select>
                                {/* <input type="text" name="collegeAddress" placeholder="College Address" /> */}
                                <select name="courseName" required>
                                    <option value="" disabled>Select Course</option>
                                    <option value="Btech">Btech</option>
                                    <option value="Mtech">Mtech</option>
                                    <option value="Phd">Phd</option>
                                    {/* Add more options as needed */}
                                </select>
                                <select name="branchName" required>
                                    <option value="" disabled>Select Branch</option>
                                    <option value="Artificial Intelligence and Data Science">Artificial Intelligence and Data Science</option>
                                    <option value="Computer ScienceComputer Science">Computer Science</option>
                                    <option value="Electronics and Communication">Electronics and Communication</option>
                                    <option value="Electrical Engineering">Electrical Engineering</option>
                                    <option value="Mining Engineering">Mining Engineering</option>
                                    <option value="Mechanical Engineering">Mechanical Engineering</option>
                                    <option value="Civil Engineering">Civil Engineering</option>
                                    <option value="Agriculture Engineering">Agriculture Engineering</option>
                                    {/* Add more options as needed */}
                                </select>
                                <input type="text" name="year" placeholder="PassOut Year" required/>
                                <input type="text" name="enrollmentNumber" placeholder="Enrollment Number" required/>
                                <lebel className=''>Student Id
                                    <input type="file" name="studentId" accept="image/*,.pdf" placeholder="Student ID" required />
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
                        <input
                            type="button"
                            className="next action-button"
                            value="Next"
                            onClick={nextStep}
                        />
                    </form>
                </fieldset>

                {/* presonal details */}
                <fieldset style={{ display: step === 2 ? 'block' : 'none' }}>
                    <h2 className="fs-title">Personal Details</h2>
                    <h3 className="fs-subtitle">We will never sell it</h3>
                    <form className="personal-form" onSubmit={handleSubmit}>

                        <input type="text" name="fname" placeholder="First Name" />
                        <input type="text" name="lname" placeholder="Last Name" />
                        <div className="gender-radio">
                            <label>
                                <input type="radio" name="gender" value="male" />
                                <span className="radio-label">Male</span>
                            </label>
                            <label>
                                <input type="radio" name="gender" value="female" />
                                <span className="radio-label">Female</span>
                            </label>
                        </div>
                        <input type="text" name="profession" placeholder="Profession" />
                        <input type="text" name="state" placeholder="State"></input>
                        {/* <textarea name="Bio" placeholder="Bio"></textarea> */}
                        <input
                            type="button"
                            className="next action-button"
                            value="Save & Next"
                            onClick={nextStep}
                        />
                    </form>
                </fieldset>

                {/* social deatils */}
                <fieldset style={{ display: step === 3 ? 'block' : 'none' }}>
                    <h2 className="fs-title">Social Profiles</h2>
                    <h3 className="fs-subtitle">Your presence on the social network</h3>
                    <form className='social-from' onSubmit={handleSubmit}>
                        <input type="text" name="Linkedin" placeholder="Linkedin" />
                        <input type="text" name="Github" placeholder="Github" />
                        <input type="text" name="twitter" placeholder="Twitter" />
                        <input type="text" name="facebook" placeholder="Facebook" />
                        <button type="submit" className="submit action-button" onClick={nextStep} > Save
                        </button>
                    </form>

                </fieldset>
            </div>
        </div>
    );
}

export default MultiForm;

