import React, { useState } from 'react';
import axios from "axios";
import baseURL from '../../../api/api';

export const ProfileImageUpdater = ({ setProfileFormOpen }) => {

    const [processing, setProcessing] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    const handleImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setSelectedImage(URL.createObjectURL(file));
            setImageFile(file);
        }
    };

    const handleCancelImage = () => {
        setSelectedImage(null);
        setImageFile(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);
        if (!imageFile) {
            alert('Please select an image first.');
            setProcessing(false);
            return;
        }
        const formData = new FormData();
        formData.append('profileImage', imageFile);

        try {
            const token = localStorage.getItem('token');
            await axios.put(`${baseURL}/profile/updateDisplayPicture`, formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then(response => {
                    console.log("response of image", response);
                    if (response.status === 200) {
                        console.log('Profile image updated successfully!');
                    }
                })
                .catch(error => {
                    if (error.response.status === 400) {
                        console.log("Image type Not supported, file name  must no contain any dot!");
                    }
                    else if (error.response.status === 404) {
                        console.log("User not found");
                    }
                })
                .finally(() => {
                    setImageFile(null);
                    setSelectedImage(null);
                    setProcessing(false);
                })
        } catch (error) {
            console.error('Error uploading profile image:', error);
        }

        setProfileFormOpen(false);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg mx-2 p-6 w-full max-w-md relative">
                <h2 className="text-xl font-bold mb-4">Update Profile Image</h2>
                <div className="flex flex-col items-center">
                    {!selectedImage ? (
                        <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 p-20 w-full cursor-pointer">
                            <i className="fa-solid fa-image text-gray-400 text-4xl mb-2"></i>
                            <span className="text-gray-500">Click to upload image</span>
                            <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                name='profileImgae'
                                onChange={handleImageChange}
                                required
                            />
                        </label>
                    ) : (
                        <div className="relative">
                            <div className='w-80 h-80'>
                                <img
                                    src={selectedImage}
                                    alt="Selected"
                                    className="rounded-full w-full h-full border-black border-3"
                                />
                            </div>
                            <button
                                className="absolute top-0 right-0  "
                                onClick={handleCancelImage}
                            >
                                <i className="fa-solid fa-times bg-red-500 text-white p-2 rounded-full hover:bg-red-600"></i>
                            </button>
                        </div>
                    )}
                    <div className='flex items-center justify-between w-full' >
                        <button
                            className={`mt-4 py-2 px-4 rounded-md text-gray-600 duration-500 hover:bg-gray-300 hover:text-black ${processing ? " cursor-not-allowed" : " cursor-pointer"} `}
                            disabled={processing}
                            onClick={() => setProfileFormOpen(false)}
                        >
                            Cancel
                        </button>
                        <button
                            className={`mt-4  text-white py-2 px-4 rounded-md duration-300  ${processing ? " cursor-wait bg-blue-400" : " cursor-pointer bg-blue-500 hover:bg-blue-600"}`}
                            disabled={processing}
                            onClick={handleSubmit}
                        >
                            {processing ? "Updating...":"Update"}
                        </button>

                    </div>
                </div>
            </div>
        </div>
    )
}
