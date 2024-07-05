import React, { useState } from "react";
import axios from "axios";
import baseURL from "../../api/api";
import appURL from "../../api/webapp";
import { useAuth } from "../../AuthProvider/AuthProvider";
import { Link, NavLink, useNavigate } from 'react-router-dom';
// import '../SignUp/SignUp.scss';
import "./SignIn.scss";
import FlashMessage from "../FlashMessage/FlashMessage";
import { images } from '../../constants';
import ForgetPassword from '../ForgetPassword/ForgetPassword';
import '@fortawesome/fontawesome-free/css/all.css';


function Login() {

    const navigate = useNavigate();                                //initialize useNavigate
    const { setIsLoggedIn } = useAuth();
    const [processing, setProcessing] = useState(false);
    const [flashMessage, setFlashMessage] = useState(null);
    const [showForgetPassword, setShowForgetPassword] = useState(false);

    const [formValue, setformValue] = React.useState({
        email: '',
        password: ''
    });

    // console.log('formValue:', formValue);

    const handleChange = (event) => {
        setformValue({
            ...formValue,
            [event.target.name]: event.target.value
        });
    }

    const handleFormChange = (event) => {
        setShowForgetPassword(true);
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        setProcessing(true);
        axios.post(`${baseURL}/user/login`, {
            email: formValue.email,
            password: formValue.password,
        })
            .then(response => {
                console.log("Response:", response);

                if (response.status === 200) {
                    const token = response.data.token;
                    const userId = response.data.user._id;
                    const userName = response.data.user.username;
                    const fullName = response.data.user.profileDetails.fullName;
                    const avatarUrl = response.data.user.profileImage;
                    const userProfession = response.data.user.profileDetails.profession;
                    const email = response.data.user.email;
                    const expirationTime = new Date().getTime() + 2 * 60 * 60 * 1000;

                    localStorage.setItem('userId', userId);
                    localStorage.setItem('token', token);
                    localStorage.setItem('userName', userName);              // Store token in local storage
                    localStorage.setItem('fullName', fullName);
                    localStorage.setItem('avatarUrl', avatarUrl);
                    localStorage.setItem('userProfession', userProfession);
                    localStorage.setItem('email', email);
                    localStorage.setItem('expirationTime', expirationTime);

                    // localStorage.setItem('userId', userId);                  
                    console.log(token);
                    // console.log("userId", userId);
                    setFlashMessage({ type: 'success', message: 'Login successful.' });
                    setIsLoggedIn(true);
                    navigate('/')
                }
            })
            .catch(error => {
                if (error.response) {
                    if (error.response.status === 404) {
                        // Handle user not found
                        console.error('User not found');
                        setFlashMessage({ type: 'error', message: 'User not found' });
                        window.location.href = `${appURL}/Login`;

                    } else if (error.response.status === 401) {
                        // Handle authentication failure
                        console.error('User is not registered. Please signup first');
                        setFlashMessage({ type: 'error', message: 'User is not registered. Please signup first' });
                        window.location.href = `${appURL}/Signup`;

                    } else if (error.response.status === 403) {
                        setFlashMessage({ type: 'error', message: 'All fields are required, please try again.' });


                    } else if (error.response.status === 402) {
                        setFlashMessage({ type: 'error', message: 'Incorrect password.' });
                        window.location.href = `${appURL}/Login`;
                    } else {
                        // Handle other errors
                        console.error('Error:', error.response);
                    }
                } else {
                    // Handle network or request errors
                    console.error('Network or request error:', error);
                    setFlashMessage({ type: 'error', message: 'Server Error' });
                }
            })
            .finally(() => {
                setProcessing(false);       // Set loading back to false regardless of success or failure
            });
    }

    return (
        <div className="">

            {flashMessage &&
                <FlashMessage type={flashMessage.type} message={flashMessage.message} />}

            <div className='login-form '>
                <div className='mb-20 md:mb-40'>
                    <div className='bg-[#101A2F] rounded-b-[14vw] md:rounded-b-[6vw] h-[14vh] relative '>
                        <div className='flex px-3 items-center justify-between py-3'>
                            <NavLink to="/" className='text-white'>
                                <i class="fa-solid fa-arrow-left text-xl md:text-3xl"></i>
                            </NavLink>
                            <div className='text-white text-2xl md:text-3xl font-bold '>Sign in to</div>
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

                <div className="flex flex-col justify-center mx-auto px-4 mb-2 font-sans">
                    <i className="text-red-500 pb-1">Please use the following credentials to access the website:</i>
                    <div className="flex flex-col justify-start items-start pl-4">
                        <p>Email: <strong>chinmayjain854@gmail.com</strong></p>
                        <p>Password: <strong className="">Chinmay@1234</strong></p>
                    </div>
                </div>

                <div className="body">
                    {!showForgetPassword ? (
                        <div className="flex flex-col justify-between flex-1" >
                            <form id="login-form" onSubmit={handleFormSubmit}>
                                <div className="input_container">
                                    <label className="input_label" htmlFor="email_field">Email</label>
                                    <img className="icon" src={images.emailsvgrepo} viewBox='0 0 24 24'></img>
                                    <input
                                        className="input_field"
                                        placeholder="name@gmail.com"
                                        name="email"
                                        type="text"
                                        id="email_field"
                                        value={formValue.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="input_container">
                                    <label className="input_label" htmlFor="password_field">Password</label>
                                    <img className="icon" src={images.passwordsvgrepo} viewBox='0 0 24 24'></img>
                                    <input
                                        className="input_field"
                                        placeholder="Password"
                                        name="password"
                                        type="password"
                                        id="password_field"
                                        value={formValue.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <button title='Sign In' type='submit' className={`sign-in_btn ${processing ? " bg-blue-200" : ""}`} disabled={processing}>
                                    <span>{processing ? 'Signing In...' : 'Continue '}</span>
                                    {!processing && <i class="fa-solid fa-arrow-right text-xl"></i>}
                                </button>

                                <div className="forget_password" onClick={handleFormChange}>Forget your password?</div>

                            </form>

                            <div className="new_to_account">
                                <h4 >New to Let's Chat?</h4>
                                <span><Link to="/Signup">Sign Up</Link></span>
                            </div>
                        </div>
                    ) : (
                        <ForgetPassword />
                    )}
                </div>
            </div>




        </div>
    );
}

export default Login;