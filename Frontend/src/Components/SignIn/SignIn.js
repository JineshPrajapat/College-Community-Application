import React, { useState } from "react";
import axios from "axios";
import baseURL from "../../api/api";
import { useAuth } from "../../AuthProvider/AuthProvider";
import { Link, useNavigate } from 'react-router-dom';
import '../SignUp/SignUp.scss';
import FlashMessage from "../FlashMessage/FlashMessage";
import { images } from '../../constants';
import ForgetPassword from '../ForgetPassword/ForgetPassword';


function Login() {

    const navigate = useNavigate();                                //initialize useNavigate
    const {setIsLoggedIn} = useAuth();
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

        axios.post(`${baseURL}/user/login`, {
            email: formValue.email,
            password: formValue.password,
        })
            .then(response => {
                console.log("Response:", response);

                if (response.status === 200) {
                    const token = response.data.token;    
                    // const userId = response.data.user._id;
                    const userName = response.data.user.username; 
                    const avatarUrl = response.data.user.profileImage;
                    const userProfession = response.data.user.profileDetails.profession;  
                    // localStorage.setItem('userId', userId);
                    localStorage.setItem('token', token);      
                    localStorage.setItem('userName', userName);              // Store token in local storage
                    localStorage.setItem('avatarUrl', avatarUrl); 
                    localStorage.setItem('userProfession', userProfession); 
                    
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
                        window.location.href = 'http://localhost:3000/Login';

                    } else if (error.response.status === 401) {
                        // Handle authentication failure
                        console.error('Authentication failed');
                        setFlashMessage({ type: 'error', message: 'Authentication failed' });
                        window.location.href = 'http://localhost:3000/Login';

                    } else {
                        // Handle other errors
                        console.error('Error:', error.response);
                    }
                } else {
                    // Handle network or request errors
                    console.error('Network or request error:', error);
                    setFlashMessage({ type: 'error', message: 'Server Error' });
                }
            });
    }

    return (
        <div className="Login-page">

            {flashMessage &&
                <FlashMessage type={flashMessage.type} message={flashMessage.message} />}

            {!showForgetPassword ? (
                <form className="form_container" id="login-form" onSubmit={handleFormSubmit}>
                    <div className="logo_container">
                        <img src={images.jinesh} alt="Khaao"></img>
                    </div>
                    <div className="title_container">
                        <p className="title">Login to your Account</p>
                        <span className="subtitle">Welcome back, just sigin and enjoy the experience</span>
                    </div>
                    <br />
                    <div className="input_container">
                        <label className="input_label" htmlFor="email_field">Email</label>
                        <img className="icon" src={images.email} viewBox='0 0 24 24'></img>
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
                        <img className="icon" src={images.password} viewBox='0 0 24 24'></img>
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
                    {/* <Link to="/ForgetPassword" className="forget_password" href="#">Forgot password?</Link> */}
                    <div className="forget_password" onClick={handleFormChange}>Forget Password</div>
                    <button title='Sign In' type='submit' className='sign-in_btn'><span>Log In</span></button>
                    <div className="new_to_account">
                        <h4 >New to CareerPerpHub?<Link to="/Signup">Create Account</Link></h4>
                    </div>
                </form>
            ) : (
                <ForgetPassword />
            )}



        </div>
    );
}

export default Login;