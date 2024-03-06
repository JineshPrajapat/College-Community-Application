import React, { useState } from 'react';
import { Link, Navigate,Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import baseURL from '../../api/api';
import { useSignUp } from '../../AuthProvider/SignUpProvider';
import FlashMessage from "../FlashMessage/FlashMessage";
import MultiForm from '../FormPages/MultiForm/MultiForm';
import './SignUp.scss'
import { images } from '../../constants'

function SignUp() {

    // const { setIsSignedUp } = useSignUp();
    
    const [flashMessage, setFlashMessage] = useState(null);
    const navigate = useNavigate();

    const [formValue, setformValue] = useState({
        username: '',
        email: '',
        password: '',
        confirmedPassword: "",
        otp: ""
    });

    const [showOTPForm, setShowOTPForm] = useState(false);

    const handleChange = (event) => {
        setformValue({
            ...formValue,
            [event.target.name]: event.target.value
        });
    }

    const sendOTP = async (event) => {
        event.preventDefault();
        console.log("otp sent");
        axios.post(`${baseURL}/user/sendOTP`, {
            email: formValue.email
        })
            .then(response => {
                console.log("Response: ", response);

                if (response.status === 200) {
                    //  successful otp sent flash message
                    setFlashMessage({ type: 'success', message: 'OTP Sent Successfull' });
                    setShowOTPForm(true);
                    // navigate('/UserDetail');
                    // return <Navigate to="/UserProfileSetting" />;

                }
            })
            .catch(error => {
                if (error.response) {
                    if (error.response.status === 401) {
                        // handle already registered
                        console.error('Already registered');
                        setFlashMessage({ type: 'error', message: 'Already registered' });
                        window.location.href = 'http://localhost:3000/login';
                    }
                    else if (error.response.status === 403) {
                        setFlashMessage({ type: 'error', message: 'All fields required' });
                    }
                    else {
                        //handle other error
                        console.error('Error:', error);
                    }
                } else {
                    // handle network or request error
                    console.error('Network or request error:', error);
                }
            })

    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        axios.post(`${baseURL}/user/signup`, {
            username: formValue.username,
            email: formValue.email,
            password: formValue.password,
            // confirmedPassword: formValue.confirmedPassword,
            otp: formValue.otp
        })
            .then(response => {
                console.log("registerd Response: ", response);
                if (response.status === 200) {
                    //  successful registration flash message
                    setFlashMessage({ type: 'success', message: 'Registred Successfull' });
                    // setIsSignedUp(true);
                }
            })
            .catch(error => {
                if (error.response) {
                    if (error.response.status === 400) {
                        // handle already registered
                        console.error('Already registered');
                        setFlashMessage({ type: 'error', message: 'Already registered' });
                        window.location.href = 'http://localhost:3000/login';
                    }
                    else if (error.response.status === 403) {
                        setFlashMessage({ type: 'error', message: 'All fields required' });
                    }
                    else {
                        //handle other error
                        console.error('Error:', error);

                    }
                } else {
                    // handle network or request error
                    console.error('Network or request error:', error);
                }
            })
    }


    return (
        <div className='Login-page'>
            <>
                {flashMessage &&
                    <FlashMessage type={flashMessage.type} message={flashMessage.message} />}

                {!showOTPForm ? (
                    <form className='form_container' onSubmit={sendOTP}>
                        <div className='logo_container'>
                            <img src={images.jinesh} alt='' />
                        </div>
                        <div className='title_container'>
                            <p className='title'>Get Started by Registering an Account</p>
                            <span className='subtitle'>Get started with our app, just create an account and enjoy the benefits</span>
                        </div>
                        <br />
                        <div className='input_container'>
                            <label className='input_label' htmlFor='user_field'>Username</label>
                            <img className='icon' src={images.userlogo} alt='' viewBox='0 0 24 24'></img>
                            <input
                                className='input_field'
                                placeholder='Username'
                                name='username'
                                type='text'
                                id='user_field'
                                value={formValue.username}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='input_container'>
                            <label className='input_label' htmlFor='email_field'>Email</label>
                            <img className='icon' src={images.email} alt='' viewBox='0 0 24 24'></img>
                            <input
                                className='input_field'
                                placeholder='name@mail.com'
                                title='Input title'
                                name='email'
                                type='text'
                                id='email_field'
                                value={formValue.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='input_container'>
                            <label className='input_label' htmlFor='password_field'>Password</label>
                            <img className='icon' src={images.password} alt='' viewBox='0 0 24 24'></img>
                            <input
                                className='input_field'
                                placeholder='Password'
                                title='Input title'
                                name='password'
                                type='password'
                                id='password_field'
                                value={formValue.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='input_container'>
                            <label className='input_label' htmlFor='confirmedPassword_field'>Confirmed Password</label>
                            <img className='icon' src={images.password} alt='' viewBox='0 0 24 24'></img>
                            <input
                                className='input_field'
                                placeholder='Password'
                                title='Input title'
                                name='confirmedPassword'
                                type='confirmedPassword'
                                id='confirmedPassword_field'
                                value={formValue.confirmedPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button title='Sign In' type='submit' className='sign-in_btn' ><span>Sign Up</span></button>
                        <div className='separartor'>
                            {/* <hr className='line'/> */}
                            {/* <span>Or</span> */}
                            {/* <hr className='line'/> */}
                        </div>
                        {/* <button title='Sign In' type='submit' className='sign-in_ggl'><span>Sign In with Google</span></button>
                <button title='Sign In' type='submit' className='sign-in_apl'>
                    <svg height={20} width={16} xmlns='http;//www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink' preserveAspectRatio='xMidYmid' viewBox='0 0 256 315'></svg>
                    <span>Sign In with Apple</span>
                </button> */}
                        <div className="new_to_account">
                            <h4 >Already on careerPrepHub?<Link to="/Login">Log in</Link></h4>
                        </div>
                        <p className='note'> <Link to="/privacy">Terms of use &amp; Conditioms</Link></p>
                    </form>
                ) : (
                    <form className='form_container' onSubmit={handleFormSubmit}>
                        <div className='input_container'>
                            <h1>Verify Email</h1>
                            <p>A verification has been sent to you. Enter the code below.</p>
                            <label className='input_label font-extrabold'>
                                Enter OTP
                            </label>
                            <input
                                className='input_field'
                                placeholder='Enter OTP'
                                name='otp'
                                type='text'
                                id='otp_field'
                                value={formValue.otp}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button title='Submit' type='submit' className='submit_btn'>
                            <span>Submit</span>
                        </button>
                    </form>
                )}
            </>
            <Link to="/UserForm">hello</Link>
            <Routes>
                {/* <Route path="/" element={<ParentComponent />}/> */}
                <Route path="/UserForm" element={<MultiForm />} />
            </Routes>
        </div>
    );
}

export default SignUp;