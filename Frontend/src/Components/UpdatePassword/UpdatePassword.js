import axios from 'axios';
import baseURL from '../../api/api';
import React, { useState } from 'react'
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai"
import { Link, useLocation } from 'react-router-dom';
import FlashMessage from '../FlashMessage/FlashMessage';

export const UpdatePassword = () => {

    const location = useLocation();
    const [showResetForm, setShowResetForm] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [flashMessage, setFlashMessage] = useState(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: ""
    })
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleOnChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: [e.target.value]
        }))
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        setProcessing(true);
        const token = location.pathname.split('/').at(-1);
        console.log("token", token)
        axios.put(`${baseURL}/user/reset-password`, {
            password: formData.password,
            confirmPassword: formData.confirmPassword,
            token: token
        })
            .then(response => {
                console.log("Response:", response);

                if (response.status === 200) {
                    console.log("Password Reset Successfull");
                    setShowSuccessMessage(true);
                    setShowResetForm(false);

                    setFlashMessage({ type: 'success', message: 'Password Reset successful.' });
                    // navigate('/careerprephub')
                }
            })
            .catch(error => {
                if (error.response) {
                    if (error.response.status === 402) {
                        // Handle user not found
                        console.error('Link is expired. Please regenerate your Link');
                        setFlashMessage({ type: 'error', message: "Link is expired. Please regenerate your Link" });
                        // window.location.href = 'http://localhost:3000/Login';

                    } else if (error.response.status === 401) {
                        // Handle authentication failure
                        console.error("Password don't match.");
                        setFlashMessage({ type: 'error', message: "Password don't match." });
                        // window.location.href = 'http://localhost:3000/Login';

                    }
                    else if (error.response.status === 404) {
                        // Handle authentication failure
                        console.error('User Not Found');
                        setFlashMessage({ type: 'error', message: 'Authentication failed' });
                        // window.location.href = 'http://localhost:3000/Login';

                    }
                    else if (error.response.status === 410) {
                        // Handle authentication failure
                        console.error('Failed to update password.');
                        setFlashMessage({ type: 'error', message: 'Failed to update password, try again' });
                        // window.location.href = 'http://localhost:3000/Login';

                    }
                } else {
                    // Handle network or request errors
                    console.error('Network or request error:', error);
                    setFlashMessage({ type: 'error', message: 'Something went wrong while reseting the password.' });
                }
            })
            .finally(() => {
                setProcessing(false);
            });
    }


    return (
        <div className="max-w-md mx-auto h-full rounded-lg shadow-lg p-6">

            {flashMessage &&
                <FlashMessage type={flashMessage.type} message={flashMessage.message} />}


            {!showResetForm && (
                <div className="reset-from-container">
                    <h1 className='text-3xl font-semibold mb-4'>Choose new Password</h1>
                    <p className='text-gray-700 mb-4'>Almost done. Enter your new password and you are all set</p>
                    <form className='space-y-4 flex flex-col gap-2' onSubmit={handleOnSubmit}>
                        <label className=''>
                            <div className='relative'>
                                <p className='mb-1'>New Password</p>
                                <input type={showPassword ? "text" : "password"}
                                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors duration-300'
                                    name="password"
                                    value={formData.password}
                                    placeholder='Password'
                                    onChange={handleOnChange}
                                    required />
                                <span onClick={() => setShowPassword((prev) => !prev)}
                                    className='absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer'>
                                    {
                                        showPassword ? <AiFillEyeInvisible fontSize={(24)} /> : <AiFillEye fontSize={(24)} />
                                    }
                                </span>
                            </div>
                        </label>

                        <label className=''>
                            <div className='relative'>
                                <p className='mb-1' >Confirm New Password</p>
                                <input type={showConfirmPassword ? "text" : "password"}
                                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors duration-300'
                                    name="confirmPassword"
                                    placeholder='Confirm Password'
                                    value={formData.confirmPassword}
                                    onChange={handleOnChange}
                                    required />

                                <span onClick={() => setShowConfirmPassword((prev) => !prev)}
                                    className='absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer'>
                                    {
                                        showConfirmPassword ? <AiFillEyeInvisible fontSize={(24)} /> : <AiFillEye fontSize={(24)} />
                                    }
                                </span>
                            </div>
                        </label>
                        <button
                            type='submit'
                            className='w-full px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-600 transition-colors duration-300'
                            disabled={processing}
                        >
                            {processing ? 'Processing...' : "Reset Password"} Reset Password
                        </button>
                    </form>
                    <div>
                        <Link to="/login" className='text-blue-500 hover:underline transition-colors duration-300'>
                            Back to login
                        </Link>
                    </div>
                </div>
            )}

            {showSuccessMessage && (
                <div class="w-64 bg-black rounded-lg p-8 text-white text-center shadow-md hover:shadow-lg transition duration-300 ease-in-out">
                    <p class="text-lg font-semibold mb-4">Password reset successful!</p>
                    <p class="text-sm mb-4">Now login and enjoy the website.</p>
                    <Link to="/login" className='text-blue-500 hover:underline transition-colors duration-300'>
                        Back to login
                    </Link>
                </div>
            )}
        </div>
    )
}

