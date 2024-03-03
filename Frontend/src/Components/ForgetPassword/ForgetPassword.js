// ForgetPassword.js

import React, { useState } from 'react';
import './ForgetPassword.scss'; // Import the SCSS file for styling
import { responsivePropType } from 'react-bootstrap/esm/createUtilityClasses';
import axios from 'axios';
import baseURL from '../../api/api';
import { Link } from 'react-router-dom';

function ForgetPassword() {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationSent, setverificationSent] = useState(false);


  const handleSendVerification = (event) => {
    axios.post(`${baseURL}/user/reset-password-token`,{
      email:email
    })
      .then(response =>{
        console.log("forget pass reponse", response);
        if(response.status === 200){
          // on successful otp sent 
          setEmailSent(true);
          setverificationSent(true);
        }
      })
      .catch(error => {
        if (error.response) {
          if (error.response.status === 401) {
              // handle already registered
              console.error('Email not found');
              // setFlashMessage({ type: 'error', message: 'Email not have registerd' });
              // window.location.href = 'http://localhost:3000/login';
          }
          else if (error.response.status === 403) {
              console.log("All fields required");
              // setFlashMessage({ type: 'error', message: 'All fields required' });
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
  };

  return (
    <div className="forget-password-container form_container">
      {!verificationSent && (
        <div className="forget-password-step">
          <h2>Forget Password</h2>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button className="send-verification-btn" onClick={handleSendVerification}>Send Verification</button>
        </div>
      )}
      {emailSent && (
        <div className="forget-password-step">
          <h2>Check Email</h2>
          <p>A reset password link has been sent to {email}.</p>
          <div>
                <Link to= "/login" className='text-blue-500 hover:underline transition-colors duration-300'>
                    Back to login
                </Link>
            </div>
        </div>
      )}
    </div>
  );
}

export default ForgetPassword;
