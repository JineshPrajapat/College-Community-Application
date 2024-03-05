import React, { useState } from 'react';
import './MultiForm.scss';
import { AdditionalDetails } from './AdditionalDetails';
import { EducationalDetails } from './EducationalDetails';
import { PersionalDetails } from './PersionalDetails';


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


    // function to moving next form, by getting response form child component
    const handleFormSubmit = () => {
        // Logic to handle successful form submission for educational details
        console.log('Educational details form submitted successfully');
        nextStep();                 // Move to the next step within MultiForm
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

                {/* college or professional form */}
                {step === 1 && (
                    <fieldset>
                        <EducationalDetails handleFormSubmit={handleFormSubmit} />
                    </fieldset>
                )}

                {/* presonal details */}
                {step === 2 && (
                    <fieldset >
                        <PersionalDetails handleFormSubmit={handleFormSubmit}/>
                    </fieldset>
                )}

                {/* Addistional Details */}
                {step === 3 && (
                    <fieldset>
                        <AdditionalDetails />
                    </fieldset>
                )}
            </div>
        </div>
    );
}

export default MultiForm;

