import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import baseURL from '../../../api/api';

export const PersionalDetails = ({ handleFormSubmit }) => {

    const [processing, setProcessing] = useState(false);
    const [formValue, setFormValue] = useState({
        fullName: '',
        gender: '',
        profession: '',
        state: "",
    });

    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'radio' ? target.checked ? target.value : '' : target.value;
        const name = target.name;

        console.log(name, ":", value)

        setFormValue({
            ...formValue,
            [name]: value
        });

    };

    const handleChange = (event) => {
        setFormValue({
            ...formValue,
            [event.target.name]: event.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setProcessing(true);
        const token = localStorage.getItem('token');
        console.log("PersonDetails token", token)
        axios.put(`${baseURL}/profile/updateProfile`, {
            fullName: formValue.fullName,
            gender: formValue.gender,
            profession: formValue.profession,
            state: formValue.state
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                console.log("Response", response);
                if (response.status === 200) {
                    console.log("Personal Details updated Succesfully");
                    // call handle formsubmit function to call other form
                    handleFormSubmit();

                }
            })
            .catch(error => {
                if (error.response.status === 400) {
                    // console.log("Error:", error);
                    console.log("all fields are required");
                }
                else if (error.response.status === 500) {
                    console.log("Unable to update profile");
                }
            })
            .finally(() => {
                setProcessing(false);
            });
    };

    return (
        <div>
            <h2 className="fs-title">Personal Details</h2>
            <h3 className="fs-subtitle">We will never sell it</h3>
            <form className="personal-form" onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    id='fullname_field'
                    value={formValue.fullName}
                    onChange={handleChange}
                />

                {/* <input type="text" name="lname" placeholder="Last Name" /> */}
                <div className="gender-radio">
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="male"
                            checked={formValue.gender === 'male'}
                            onChange={handleInputChange}
                        />
                        <span className="radio-label">Male</span>
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="female"
                            checked={formValue.gender === 'female'}
                            onChange={handleInputChange}
                        />
                        <span className="radio-label">Female</span>
                    </label>
                </div>
                <input
                    type="text"
                    name="profession"
                    placeholder="Profession"
                    id='profession_field'
                    value={formValue.profession}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="state"
                    placeholder="State"
                    id='state_field'
                    value={formValue.state}
                    onChange={handleChange}
                />
                <button type="submit" className={`submit action-button`}  disabled={processing}>
                    {processing ? 'Processing...' : 'Submit'}
                </button>
            </form>
        </div>
    )
}
