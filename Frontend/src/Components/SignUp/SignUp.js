import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import baseURL from '../../api/api';
import appURL from "../../api/webapp";
import { useSignUp } from '../../AuthProvider/SignUpProvider';
import FlashMessage from "../FlashMessage/FlashMessage";
import { images } from '../../constants';
import "../SignIn/SignIn.scss";

function SignUp() {
    const { setIsSignedUp } = useSignUp();
    const [flashMessage, setFlashMessage] = useState(null);
    const [processing, setProcessing] = useState(false);
    const navigate = useNavigate();

    const [formValue, setFormValue] = useState({
        username: '',
        email: '',
        password: '',
        confirmedPassword: '',
        otp: ''
    });

    const [showOTPForm, setShowOTPForm] = useState(false);
    const [passwordMismatch, setPasswordMismatch] = useState(false);
    const [passwordError, setPasswordError] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === 'username') {
            // Remove spaces and restrict to alphanumeric characters
            const username = value.replace(/\s+/g, '').replace(/[^a-zA-Z0-9]/g, '');
            setFormValue({ ...formValue, [name]: username });
        } else {
            setFormValue({ ...formValue, [name]: value });
        }

        if (name === 'password') {
            setPasswordError(validatePassword(value));
        }

        if (name === 'confirmedPassword' || name === 'password') {
            setPasswordMismatch(
                name === 'password'
                    ? formValue.confirmedPassword !== value
                    : formValue.password !== value
            );
        }
    };

    const validatePassword = (password) => {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecialChar = /[@$!%*?&#]/.test(password);

        if (password.length < minLength) {
            return 'Password must be at least 8 characters long';
        }
        if (!hasUpperCase || !hasLowerCase) {
            return 'Password must contain at least one uppercase & lowercase letter';
        }
        if (!hasNumber) {
            return 'Password must contain at least one number';
        }
        if (!hasSpecialChar) {
            return 'Password must contain at least one special character (@, $, !, %, *, ?, &, #)';
        }

        return '';
    };

    const sendOTP = async (event) => {
        event.preventDefault();
        setProcessing(true);
        try {
            const response = await axios.post(`${baseURL}/user/sendOTP`, {
                email: formValue.email
            });

            if (response.status === 200) {
                setFlashMessage({ type: 'success', message: 'OTP Sent Successfully' });
                setShowOTPForm(true);
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    setFlashMessage({ type: 'info', message: 'Already registered' });
                    window.location.href = `${appURL}/Login`;
                } else if (error.response.status === 403) {
                    setFlashMessage({ type: 'error', message: 'All fields required' });
                } else {
                    console.error('Error:', error);
                }
            } else {
                console.error('Network or request error:', error);
            }
        } finally {
            setProcessing(false);
        }
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true);
        try {
            const response = await axios.post(`${baseURL}/user/signup`, {
                username: formValue.username,
                email: formValue.email,
                password: formValue.password,
                otp: formValue.otp
            });

            if (response.status === 200) {
                setFlashMessage({ type: 'success', message: 'Registered Successfully' });
                const token = response.data.token;
                localStorage.setItem('token', token);
                setIsSignedUp(true);
                navigate("/UserForm");
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 409) {
                    setFlashMessage({ type: 'error', message: 'Already registered' });
                    window.location.href = `${appURL}/Login`;
                } else if (error.response.status === 410) {
                    setFlashMessage({ type: 'error', message: 'Username already used, Please choose another username.' });
                    window.location.href = 'http://localhost:3000/Signup';
                } else if (error.response.status === 400) {
                    setFlashMessage({ type: 'error', message: 'OTP expired' });
                    window.location.href = `${appURL}/Login`;
                } else if (error.response.status === 401) {
                    setFlashMessage({ type: 'error', message: "OTP doesn't match, try again" });
                } else if (error.response.status === 403) {
                    setFlashMessage({ type: 'error', message: 'All fields required' });
                } else {
                    console.error('Error:', error);
                }
            } else {
                console.error('Network or request error:', error);
            }
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div className='Login-page'>
            {flashMessage && <FlashMessage type={flashMessage.type} message={flashMessage.message} />}
            <div className='login-form '>
                <div className='mb-20 md:mb-40'>
                    <div className='bg-[#101A2F] rounded-b-[14vw] md:rounded-b-[6vw] h-[14vh] relative '>
                        <div className='flex px-3 items-center justify-between py-3'>
                            <NavLink to="/" className='text-white'>
                                <i className="fa-solid fa-arrow-left text-xl md:text-3xl"></i>
                            </NavLink>
                            <div className='text-white text-2xl md:text-3xl font-bold'>Sign Up to</div>
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

                <div className='body'>
                    {!showOTPForm ? (
                        <div className="flex flex-col justify-between flex-1" >
                            <form className='form_container' onSubmit={sendOTP}>
                                <div className='input_container'>
                                    <label className='input_label' htmlFor='user_field'>
                                        Username
                                    </label>
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
                                        // title='Input title'
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
                                        // title='Input title'
                                        name='password'
                                        type='password'
                                        id='password_field'
                                        value={formValue.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                {passwordError && (
                                    <p className='text-red-600 text-sm mb-1'>{passwordError}</p>
                                )}
                                <div className='input_container'>
                                    <label className='input_label' htmlFor='confirmedPassword_field'>Confirm Password</label>
                                    <img className='icon' src={images.passwordsvgrepo} alt='' viewBox='0 0 24 24'></img>
                                    <input
                                        className='input_field'
                                        placeholder='Confirm Password'
                                        disabled={!formValue.password}
                                        // title='Input title'
                                        name='confirmedPassword'
                                        type='password'
                                        id='confirmedPassword_field'
                                        value={formValue.confirmedPassword}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                {passwordMismatch && formValue.password && formValue.confirmedPassword && (
                                    <p className='text-red-600 text-sm mt-1'>Password didn't match</p>
                                )}

                                <button title='Sign In' type='submit' className={`sign-in_btn ${processing ? " bg-blue-200" : ""}`} disabled={processing}>
                                    <span>{processing ? "Processing..." : "Sign Up"}</span>
                                </button>
                            </form>
                            <div className="new_to_account">
                                <h4 >Already on Let's Chat?</h4>
                                <span><Link to="/Login">Sign In</Link></span>
                            </div>
                            <p className='note mb-1'> <Link to="/privacy">Terms of use &amp; Conditioms</Link></p>
                        </div>
                    ) : (
                        <div className="flex flex-col justify-between flex-1">
                            <form className='form_container' onSubmit={handleFormSubmit}>
                                <div className='input_container'>
                                    <label className='input_label' htmlFor='otp_field'>OTP</label>
                                    <img className='icon' src={images.otpsvgrepo} alt='' viewBox='0 0 24 24'></img>
                                    <input
                                        className='input_field'
                                        placeholder='Enter OTP'
                                        title='Input title'
                                        name='otp'
                                        type='text'
                                        id='otp_field'
                                        value={formValue.otp}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <button title='Sign In' type='submit' className={`sign-in_btn ${processing ? " bg-blue-200" : ""}`} disabled={processing}>
                                    <span>{processing ? "Processing..." : "Submit"}</span>
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SignUp;


