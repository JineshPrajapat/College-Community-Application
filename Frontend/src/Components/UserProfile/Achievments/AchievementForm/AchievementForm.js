import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './AchievementForm.scss';

function AchievementForm() {

    const [formData, setFormData] = useState({
        images: [],
        heading: '',
        description: ''
    });

    const navigate = useNavigate();
    const handleCancel = () => {
        navigate(-1);                   // Navigate back to previous page
    };

    const handleFileChange = (e) => {
        e.preventDefault();
        const files = Array.from(e.target.files);

        const newImages = files.map(file => ({
            src: URL.createObjectURL(file),
            heading: formData.heading,
            description: formData.description,
            type: file.type.startsWith('image/') ? 'image' : 'pdf'
        }));

        setFormData(prevState => ({
            ...prevState,
            images: [...prevState.images, ...newImages]
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Display formData before posting
        console.log('FormData:', formData);

        // Post data to the server
        try {
            const response = await axios.post('YOUR_SERVER_ENDPOINT', formData);
            console.log('Data posted successfully!', response.data);
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
                    value={formData.heading}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    placeholder="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                />
                <input
                    type="file"
                    name="file"
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

            <div className="images">
                {formData.images.map((image, index) => (
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
            </div>
        </div>
    );
};

export default AchievementForm;