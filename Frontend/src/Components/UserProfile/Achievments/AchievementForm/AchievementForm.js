import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './AchievementForm.scss';
import baseURL from '../../../../api/api';

function AchievementForm() {

    const [formValue, setFormValue] = useState({
        achievement: null,
        heading: '',
        description: ''
    });

    const navigate = useNavigate();
    const handleCancel = () => {
        navigate(-1);                   // Navigate back to previous page
    };

    // const handleFileChange = (e) => {
    //     e.preventDefault();
    //     const files = Array.from(e.target.files);

    //     const newImages = files.map(file => ({
    //         src: URL.createObjectURL(file),
    //         heading: formData.heading,
    //         description: formData.description,
    //         type: file.type.startsWith('image/') ? 'image' : 'pdf'
    //     }));

    //     setFormData(prevState => ({
    //         ...prevState,
    //         images: [...prevState.images, ...newImages]
    //     }));
    // };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormValue({
            ...formValue,
            [name]: files[0], name,
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValue(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        // Display formData before posting
        console.log('FormValue:', formValue);

        const formData = new FormData();
        formData.append('achievement', formValue.achievement);
        formData.append('heading', formValue.heading);
        formData.append('description', formValue.description);

        // Post data to the server
        try {
            await axios.post(`${baseURL}/achievement/addAchivement`, formData,
            {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            .then((response) => {
                if(response.status === 200)
                {
                    console.log("Achievement Added successfully");
                    console.log("response", response);
                    alert("achivement updated successfully");
                    navigate(-1);
                }
            })
            .catch(error =>{
                if(error.response.status === 400)
                {
                    console.log("All fields required");
                }
                else if(error.response.status === 403)
                {
                    console.log("User not found");
                }
            })

            // console.log('Data posted successfully!', response.data);
        } catch (error) {
            console.error('Error posting data to the server:', error.message);
        }
    };

    return (
        <div className="form-section">
            <form onSubmit={handleSubmit} className="upload-form">
                <input
                    type="text"
                    placeholder="Enter heading"
                    name="heading"
                    value={formValue.heading}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    placeholder="Description"
                    name="description"
                    value={formValue.description}
                    onChange={handleInputChange}
                />
                <input
                    type="file"
                    name="achievement"
                    accept="image/*,.pdf"
                    multiple
                    onChange={handleFileChange}
                    required
                />
                <div className="btn-add-close">
                    <button type="submit" className='submit'>Add</button>
                    <button type="" className='close' onClick={handleCancel}>Cancel</button>
                </div>
            </form>

            {/* <div className="images">
                {formValue.achievement.map((image, index) => (
                    <div key={index} className="image">
                        {image.type === 'image' ? (
                            <img src={image.src} alt={image.heading} />
                        ) : (
                            <embed src={image.src} width="100%" height="auto" />
                        )}
                        <div className="caption">
                            <h3>{image.heading}</h3>
                            <p className='description'>{image.description.slice(0, 50) + '...'}</p>
                        </div>
                    </div>
                ))}
            </div> */}
        </div>
    );
};

export default AchievementForm;