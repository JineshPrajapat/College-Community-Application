// import React from 'react';
// import { useState } from 'react';
// import {useNavigate} from 'react-router-dom';

// import axios from 'axios';
// import baseURL from '../../../api/api';

// export const AdditionalDetails = () => {

//     const navigate = useNavigate();
//     const [processing, setProcessing] = useState(false);
//     const [formValue, setFormValue] = useState({
//         about: '',
//         position: '',
//         experience: '',
//         skills: [],
//         hobbies: [],
//         languages: [],
//         linkedin: '',
//         github: '',
//         twitter: '',
//         youtube: '',
//         profileImage: null
//     });

//     const handleChange = (event) => {
//         setFormValue({
//             ...formValue,
//             [event.target.name]: event.target.value
//         });
//     }

//     const handleFileChange = (e) => {
//         const { name, files } = e.target;
//         setFormValue({
//             ...formValue,
//             [name]: files[0], name,
//         });
//     };

//     const handleAdditionalFormSubmit = async (e) => {
//         e.preventDefault();
//         setProcessing(true);

//         const token = localStorage.getItem("token");
//         console.log("additional details token ;", token);

//         const formData = new FormData();
//         formData.append('about', formValue.about);
//         formData.append('position', formValue.position);
//         formData.append('experience', formValue.experience);
//         formData.append('skills', formValue.skills);
//         formData.append('hobbies', formValue.hobbies);
//         formData.append('languages', formValue.languages);
//         formData.append('linkedin', formValue.linkedin);
//         formData.append('github', formValue.github);
//         formData.append('twitter', formValue.twitter);
//         formData.append('youtube', formValue.youtube);
//         formData.append('profileImage', formValue.profileImage);

//         try {

//             axios.put(`${baseURL}/profile/additionalDetails`, formData,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`
//                     }
//                 })
//                 .then(response => {
//                     console.log("Additional Response", response);

//                     if (response.status === 200) {
//                         console.log("Additional Details Updated Successfully!");
//                         navigate('/Login');

//                     }
//                 })
//                 .catch(error => {
//                     if (error.response.status) {
//                         console.log("All field required");
//                     }
//                     else {
//                         console.error("Error:", error);
//                     }
//                 })
//                 .finally(() => {
//                     setProcessing(false);
//                 });

//         }
//         catch (error) {
//             console.error("Network or request error", error);
//         }
//     }


//     return (
//         <div>
//             <h2 className="fs-title">Social Profiles</h2>
//             <h3 className="fs-subtitle">Your presence on the social network</h3>
//             <form className='social-from' onSubmit={handleAdditionalFormSubmit}>

//                 <label className="">Profile Image</label>
//                 <input
//                     type='file'
//                     placeholder='profileImage'
//                     name='profileImage'
//                     id='profileImage_field'
//                     accept='.jpg, .jpeg, .png'
//                     onChange={handleFileChange} />

//                 <textarea 
//                     name='about' 
//                     placeholder='about' 
//                     id='about_field'
//                     value={formValue.about}
//                     onChange={handleChange}
//                 />
//                 <input
//                     type='text'
//                     placeholder='Position'
//                     name='position'
//                     id='position_field'
//                     value={formValue.position}
//                     onChange={handleChange} />
//                 <input
//                     type='text'
//                     placeholder='Experience'
//                     name='experience'
//                     id='experience_field'
//                     value={formValue.experience}
//                     onChange={handleChange} />
//                 <input
//                     type='text'
//                     placeholder='Add skills each by comma-separated'
//                     name='skills'
//                     id='skills_field'
//                     value={formValue.skills}
//                     onChange={handleChange} />
//                 <input
//                     type='text'
//                     placeholder='Add hobbies each by comma-separated'
//                     name='hobbies'
//                     id='hobbies_field'
//                     value={formValue.hobbies}
//                     onChange={handleChange} />
//                 <input
//                     type='text'
//                     placeholder='Add languages each by comma-separated'
//                     name='languages'
//                     id='languages_field'
//                     value={formValue.languages}
//                     onChange={handleChange} />
//                 <input
//                     type="text"
//                     placeholder="Linkedin"
//                     name="linkedin"
//                     id='linkedin_field'
//                     value={formValue.linkedin}
//                     onChange={handleChange} />
//                 <input
//                     type="text"
//                     placeholder="Github"
//                     name="github"
//                     id='github_field'
//                     value={formValue.github}
//                     onChange={handleChange} />
//                 <input
//                     type="text"
//                     placeholder="Twitter"
//                     name="twitter"
//                     id='twitter_field'
//                     value={formValue.twitter}
//                     onChange={handleChange} />
//                 <input
//                     type="text"
//                     placeholder="YouTube"
//                     name="youtube"
//                     id='youTube_field'
//                     value={formValue.youtube}
//                     onChange={handleChange} />

//                 {/* <input type="text" name="facebook" placeholder="Facebook" /> */}
//                 <button type="submit" className={`submit action-button `} disabled={processing} > 
//                     {processing ? "Processing..." : "Save"}
//                 </button>
//             </form>
//         </div>
//     )
// }


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import baseURL from '../../../api/api';

export const AdditionalDetails = () => {
    const navigate = useNavigate();
    const [processing, setProcessing] = useState(false);
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
    });
    const [skill, setSkill] = useState('');
    const [hobby, setHobby] = useState('');
    const [language, setLanguage] = useState('');

    const handleChange = (event) => {
        setFormValue({
            ...formValue,
            [event.target.name]: event.target.value,
        });
    };

    const handleAddSkill = () => {
        if (skill) {
            setFormValue({
                ...formValue,
                skills: [...formValue.skills, skill],
            });
            setSkill('');
        }
    };

    const handleRemoveSkill = (index) => {
        const newSkills = formValue.skills.filter((_, i) => i !== index);
        setFormValue({
            ...formValue,
            skills: newSkills,
        });
    };

    const handleAddHobby = () => {
        if (hobby) {
            setFormValue({
                ...formValue,
                hobbies: [...formValue.hobbies, hobby],
            });
            setHobby('');
        }
    };

    const handleRemoveHobby = (index) => {
        const newHobbies = formValue.hobbies.filter((_, i) => i !== index);
        setFormValue({
            ...formValue,
            hobbies: newHobbies,
        });
    };

    const handleAddLanguage = () => {
        if (language) {
            setFormValue({
                ...formValue,
                languages: [...formValue.languages, language],
            });
            setLanguage('');
        }
    };

    const handleRemoveLanguage = (index) => {
        const newLanguages = formValue.languages.filter((_, i) => i !== index);
        setFormValue({
            ...formValue,
            languages: newLanguages,
        });
    };

    const handleAdditionalFormSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);

        const token = localStorage.getItem("token");
        console.log("additional details token ;", token);

        const formData = new FormData();
        formData.append('about', formValue.about);
        formData.append('position', formValue.position);
        formData.append('experience', formValue.experience);
        formData.append('skills', JSON.stringify(formValue.skills));
        formData.append('hobbies', JSON.stringify(formValue.hobbies));
        formData.append('languages', JSON.stringify(formValue.languages));
        formData.append('linkedin', formValue.linkedin);
        formData.append('github', formValue.github);
        formData.append('twitter', formValue.twitter);
        formData.append('youtube', formValue.youtube);

        try {
            axios.put(`${baseURL}/profile/additionalDetails`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
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
                        console.log("All fields required");
                    } else {
                        console.error("Error:", error);
                    }
                })
                .finally(() => {
                    setProcessing(false);
                });

        } catch (error) {
            console.error("Network or request error", error);
        }
    };

    return (
        <div>
            <h2 className="fs-title">Social Profiles</h2>
            <h3 className="fs-subtitle">Your presence on the social network</h3>
            <form className='social-form' onSubmit={handleAdditionalFormSubmit}>
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
                    onChange={handleChange}
                />
                <input
                    type='text'
                    placeholder='Experience'
                    name='experience'
                    id='experience_field'
                    value={formValue.experience}
                    onChange={handleChange}
                />

                <div className='flex items-center justify-between gap-2'>
                    <input
                        type='text'
                        placeholder='List your skills here, showcasing what you excel at.'
                        value={skill}
                        onChange={(e) => setSkill(e.target.value)}
                        className=''
                    />
                    <span
                        onClick={handleAddSkill}
                        className=' cursor-pointer p-[13px] px-4 bg-green-400 hover:bg-green-500 text-white font-sans font-semibold mb-[10px] rounded-[3px]'
                    >
                        Add 
                    </span>
                </div>
                <div className='flex flex-row flex-wrap gap-2 mb-2'>
                    {formValue.skills.map((skill, index) => (
                        <div key={index} className='p-2 flex flex-row gap-2 text-sm font-sans bg-blue-500 text-white rounded-[3px] hover:bg-blue-400'>
                            <span>{skill}</span>
                            <button type="button" onClick={() => handleRemoveSkill(index)}><i class="fa-solid fa-xmark"></i></button>
                        </div>
                    ))}
                </div>

                <div className='flex items-center justify-between gap-2'>
                    <input
                        type='text'
                        placeholder='Add hobby'
                        value={hobby}
                        onChange={(e) => setHobby(e.target.value)}
                    />
                    <span 
                        onClick={handleAddHobby}
                        className='cursor-pointer p-[13px] px-4 bg-green-400 hover:bg-green-500 text-white font-sans font-semibold mb-[10px] rounded-[3px]'
                    >Add</span>
                </div>
                <div className='flex flex-row flex-wrap gap-2 mb-2'>
                    {formValue.hobbies.map((hobby, index) => (
                        <div key={index} className='p-2 flex flex-row gap-2 text-sm font-sans bg-blue-500 text-white rounded-[3px] hover:bg-blue-400'>
                            <span>{hobby}</span>
                            <button type="button" onClick={() => handleRemoveHobby(index)}><i class="fa-solid fa-xmark"/></button>
                        </div>
                    ))}
                </div>

                <div className='flex items-center justify-between gap-2'>
                    <input
                        type='text'
                        placeholder='Add language'
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                    />
                    <span
                        onClick={handleAddLanguage}
                        className='cursor-pointer p-[13px] px-4 bg-green-400 hover:bg-green-500 text-white font-sans font-semibold mb-[10px] rounded-[3px]'
                    >Add</span>
                </div>
                <div className='flex flex-row flex-wrap gap-2 mb-2'>
                    {formValue.languages.map((language, index) => (
                        <div key={index} className='p-2 flex flex-row gap-2 text-sm font-sans bg-blue-500 text-white rounded-[3px] hover:bg-blue-400'>
                            <span>{language}</span>
                            <button type="button" onClick={() => handleRemoveLanguage(index)} ><i class="fa-solid fa-xmark"/></button>
                        </div>
                    ))}
                </div>

                <input
                    type="text"
                    placeholder="Linkedin"
                    name="linkedin"
                    id='linkedin_field'
                    value={formValue.linkedin}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    placeholder="Github"
                    name="github"
                    id='github_field'
                    value={formValue.github}
                    onChange={handleChange}
                />
                {/* <input
                    type="text"
                    placeholder="Twitter"
                    name="twitter"
                    id='twitter_field'
                    value={formValue.twitter}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    placeholder="YouTube"
                    name="youtube"
                    id='youtube_field'
                    value={formValue.youtube}
                    onChange={handleChange}
                /> */}

                <button type="submit" className={`submit action-button`} disabled={processing}>
                    {processing ? "Processing..." : "Save"}
                </button>
            </form>
        </div>
    );
};
