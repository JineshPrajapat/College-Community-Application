import React, { useState } from 'react';
import { Link, Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import baseURL from '../../api/api';
import appURL from "../../api/webapp";
import { useSignUp } from '../../AuthProvider/SignUpProvider';
import FlashMessage from "../FlashMessage/FlashMessage";
import MultiForm from '../FormPages/MultiForm/MultiForm';
// import './SignUp.scss'
import "../SignIn/SignIn.scss";
import { images } from '../../constants'

function SignUp() {

    const { setIsSignedUp } = useSignUp();

    const [flashMessage, setFlashMessage] = useState(null);
    const [processing, setProcessing] = useState(false);
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
        console.log("otp sent function invoked");
        setProcessing(true);
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
                        setFlashMessage({ type: 'info', message: 'Already registered' });
                        window.location.href = `${appURL}/Login`;
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
            .finally(() => {
                setProcessing(false);       // Set loading back to false regardless of success or failure
            });

    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true);
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
                    const token = response.data.token;
                    localStorage.setItem('token', token);
                    console.log("signup", token);
                    setIsSignedUp(true);
                    navigate("/UserForm");
                }
            })
            .catch(error => {
                if (error.response) {
                    if (error.response.status === 409) {
                        // handle already registered
                        console.error('Already registered');
                        setFlashMessage({ type: 'error', message: 'Already registered' });
                        window.location.href = `${appURL}/Login`;

                    } else if (error.response.status === 410) {
                        // handle already registered
                        console.error('UserName already used');
                        setFlashMessage({ type: 'error', message: 'UserName already used, Please choose other UserName.' });
                        window.location.href = 'http://localhost:3000/Signup';
                    }
                    else if (error.response.status === 400) {
                        // handle already registered
                        console.error('Otp expires');
                        setFlashMessage({ type: 'error', message: 'OTP expires' });
                        window.location.href = `${appURL}/Login`;
                    } else if (error.response.status === 401) {
                        console.error("OTP doesn't match");
                        setFlashMessage({ type: 'error', message: "OTP doesn't match, try again" });
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
            .finally(() => {
                setProcessing(false);            // Set loading back to false regardless of success or failure
            });
    }


    return (
        <div className='Login-page'>

            {flashMessage &&
                <FlashMessage type={flashMessage.type} message={flashMessage.message} />}
            <div className='login-form '>
                <div className='mb-20'>
                    <div className='bg-[#101A2F] rounded-b-[14vw] md:rounded-b-[6vw] h-[14vh] relative '>
                        <div className='flex px-3 items-center justify-between py-3'>
                            <NavLink to="/" className='text-white'>
                                <i class="fa-solid fa-arrow-left text-xl"></i>
                            </NavLink>
                            <div className='text-white text-2xl'>Sign Up to</div>
                            <div></div>
                        </div>
                        
                    </div>
                    <div className='bg-white mx-[20vw] w-[60vw] px-2 py-[10px] rounded-2xl absolute top-20 md:top-24 shadow-md'>
                        <div className='flex flex-row justify-center items-center gap-2'>
                            <div className=' w-6 h-6'>
                                <img className='w-full h-full' src={images.mainLogo1} alt="logo" />
                            </div>
                            <div className=' text-2xl'>Let's Chat</div>
                        </div>
                    </div>
                </div>
                {!showOTPForm ? (
                    <div className='body'>
                        <form className='form_container' onSubmit={sendOTP}>
                            {/* <div className='logo_container'>
                            <img src={images.jinesh} alt='' />
                        </div>
                        <div className='title_container'>
                            <p className='title'>Get Started by Registering an Account</p>
                            <span className='subtitle'>Get started with our app, just create an account and enjoy the benefits</span>
                        </div>
                        <br /> */}
                            <div className='input_container'>
                                <label className='input_label' htmlFor='user_field'>Username</label>
                                <img className='icon' src={images.usersvgrepo} alt='' viewBox='0 0 24 24'></img>
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
                                <img className='icon' src={images.emailsvgrepo} alt='' viewBox='0 0 24 24'></img>
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
                                <img className='icon' src={images.passwordsvgrepo} alt='' viewBox='0 0 24 24'></img>
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
                                <img className='icon' src={images.passwordsvgrepo} alt='' viewBox='0 0 24 24'></img>
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

                            <button title='Sign In' type='submit' className={`sign-in_btn ${processing ? " bg-blue-200" : ""}`} disabled={processing}>
                                <span>{processing ? 'Sending OTP...' : 'Sign Up'}</span>
                            </button>

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
                            {/* <div className="new_to_account">
                                <h4 >Already on careerPrepHub?<Link to="/Login">Log in</Link></h4>
                            </div> */}

                        </form>
                        <div className="new_to_account">
                            <h4 >Already on careerPrepHub?</h4>
                            <span><Link to="/Login">Sign In</Link></span>
                        </div>
                        <p className='note mb-1'> <Link to="/privacy">Terms of use &amp; Conditioms</Link></p>
                    </div>

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
                        <button title='Submit' type='submit' className={`submit_btn sign-in_btn ${processing ? " bg-blue-200" : ""}`} disabled={processing}>
                            <span>{processing ? 'Processing...' : 'Verify OTP'}</span>
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default SignUp;