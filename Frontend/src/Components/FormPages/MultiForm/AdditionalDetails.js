import React from 'react';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';

import axios from 'axios';
import baseURL from '../../../api/api';

export const AdditionalDetails = () => {

    const navigate = useNavigate();

    const [formValue, setFormValue] = useState({
        about: '',
        position: '',
        experience: '',
        skills: [],
        hobbies: [],
        languages: [],
        linkedin: '',
        github: '',
        twitter: '',
        youtube: '',
        profileImage: null
    });

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

    const handleAdditionalFormSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");
        console.log("additional details token ;", token);

        const formData = new FormData();
        formData.append('about', formValue.about);
        formData.append('position', formValue.position);
        formData.append('experience', formValue.experience);
        formData.append('skills', formValue.skills);
        formData.append('hobbies', formValue.hobbies);
        formData.append('languages', formValue.languages);
        formData.append('linkedin', formValue.linkedin);
        formData.append('github', formValue.github);
        formData.append('twitter', formValue.twitter);
        formData.append('youtube', formValue.youtube);
        formData.append('profileImage', formValue.profileImage);

        try {

            axios.put(`${baseURL}/profile/additionalDetails`, formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then(response => {
                    console.log("Additional Response", response);

                    if (response.status === 200) {
                        console.log("Additional Details Updated Successfully!");
                        navigate('/Login');
                        
                    }
                })
                .catch(error => {
                    if (error.response.status) {
                        console.log("All field required");
                    }
                    else {
                        console.error("Error:", error);
                    }
                })

        }
        catch (error) {
            console.error("Network or request error", error);
        }
    }


    return (
        <div>
            <h2 className="fs-title">Social Profiles</h2>
            <h3 className="fs-subtitle">Your presence on the social network</h3>
            <form className='social-from' onSubmit={handleAdditionalFormSubmit}>

                <label className="">Profile Image</label>
                <input
                    type='file'
                    placeholder='profileImage'
                    name='profileImage'
                    id='profileImage_field'
                    accept='.jpg, .jpeg, .png'
                    onChange={handleFileChange} />

                <textarea 
                    name='about' 
                    placeholder='about' 
                    id='about_field'
                    value={formValue.about}
                    onChange={handleChange}
                />
                <input
                    type='text'
                    placeholder='Position'
                    name='position'
                    id='position_field'
                    value={formValue.position}
                    onChange={handleChange} />
                <input
                    type='text'
                    placeholder='Experience'
                    name='experience'
                    id='experience_field'
                    value={formValue.experience}
                    onChange={handleChange} />
                <input
                    type='text'
                    placeholder='Add skills each by comma-separated'
                    name='skills'
                    id='skills_field'
                    value={formValue.skills}
                    onChange={handleChange} />
                <input
                    type='text'
                    placeholder='Add hobbies each by comma-separated'
                    name='hobbies'
                    id='hobbies_field'
                    value={formValue.hobbies}
                    onChange={handleChange} />
                <input
                    type='text'
                    placeholder='Add languages each by comma-separated'
                    name='languages'
                    id='languages_field'
                    value={formValue.languages}
                    onChange={handleChange} />
                <input
                    type="text"
                    placeholder="Linkedin"
                    name="linkedin"
                    id='linkedin_field'
                    value={formValue.linkedin}
                    onChange={handleChange} />
                <input
                    type="text"
                    placeholder="Github"
                    name="github"
                    id='github_field'
                    value={formValue.github}
                    onChange={handleChange} />
                <input
                    type="text"
                    placeholder="Twitter"
                    name="twitter"
                    id='twitter_field'
                    value={formValue.twitter}
                    onChange={handleChange} />
                <input
                    type="text"
                    placeholder="YouTube"
                    name="youtube"
                    id='youTube_field'
                    value={formValue.youtube}
                    onChange={handleChange} />

                {/* <input type="text" name="facebook" placeholder="Facebook" /> */}
                <button type="submit" className="submit action-button" > Save
                </button>
            </form>
        </div>
    )
}
