import React, { useState } from 'react';
import axios from 'axios';
import FlashMessage from '../../../FlashMessage/FlashMessage';
import baseURL from '../../../../api/api';

const ChangeEmail = () => {

  const [isCodeSent, setIsCodeSent] = useState(false);
  const [flashMessage, setFlashMessage] = useState(null);
  const [processing, setProcessing] = useState(false);

  const [formValue, setformValue] = React.useState({
    currentEmail: "",
    verificationCode: "",
    newEmail: ""
  })

  const handleChange = (event) => {
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value
    })
  };

  const handleSendVerification = (event) => {
    event.preventDefault();
    console.log("handleSendVerification function invoked");
    setProcessing(true);
    axios.post(`${baseURL}/user/sendOTP`, {
      email: formValue.currentEmail
    })
      .then(response => {
        console.log("Response: ", response);

        if (response.status === 200) {
          //  successful otp sent flash message
          setFlashMessage({ type: 'success', message: 'Verification Code Sent Successfull' });
          setIsCodeSent(true);
          // setShowOTPForm(true);
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
      .finally(() => {
        setProcessing(false);       // Set loading back to false regardless of success or failure
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProcessing(true);

    axios.put(`${baseURL}/user/changeemail`, {
      currentEmail: formValue.currentEmail,
      verificationCode: formValue.ChangeEmail,
      newEmail: formValue.newEmail
    })
      .then(response => {
        console.log("registerd Response: ", response);
        if (response.status === 200) {
          //  successful registration flash message
          console.log("response", response);
          setFlashMessage({ type: 'success', message: 'Email Changed Successfully.' });

        }
      })
      .catch(error => {
        if (error.response) {
          if (error.response.status === 400) {
            // handle already registered
            console.error('Verification code expires');
            setFlashMessage({ type: 'error', message: 'Verification code expires' });

          } else if (error.response.status === 401) {
            console.error("Verification code doesn't match");
            setFlashMessage({ type: 'error', message: "Incorrect Verification code" });
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
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">

      {flashMessage &&
        <FlashMessage type={flashMessage.type} message={flashMessage.message} />}

      <h2 className="text-2xl font-semibold mb-4">Change Email</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="currentEmail" className="block mb-1 text-sm">Current Email</label>
          <input
            type="email"
            id="currentEmail"
            name="currentEmail"
            value={formValue.currentEmail}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        {isCodeSent && (
          <div className="mb-4">
            <label htmlFor="verificationCode" className="block mb-1 text-sm">Verification Code</label>
            <input
              type="text"
              id="verificationCode"
              name="verificationCode"
              value={formValue.verificationCode}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
        )}
        {isCodeSent && (
          <div className="mb-4">
            <label htmlFor="newEmail" className="block mb-1 text-sm">New Email</label>
            <input
              type="email"
              id="newEmail"
              name="newEmail"
              value={formValue.newEmail}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
        )}
        {!isCodeSent && (
          <button
            type="button"
            onClick={handleSendVerification}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md transition duration-300 hover:bg-blue-600"
            disabled={processing}
          >
            {processing ? 'Sending Code...' : 'Send Verification Code'} 
          </button>
        )}
        {isCodeSent && (
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md transition duration-300 hover:bg-blue-600"
            disabled={processing}
          >
            {processing ? 'Processing...' : 'Change Email'}
          </button>
        )}
      </form>
    </div>
  );
};

export default ChangeEmail;
