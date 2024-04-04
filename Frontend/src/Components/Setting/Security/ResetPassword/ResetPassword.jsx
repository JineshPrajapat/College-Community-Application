import React, { useState } from 'react';
import baseURL from '../../../../api/api';
import axios from 'axios';
import FlashMessage from '../../../FlashMessage/FlashMessage';

const ResetPassword = () => {

  const [processing, setProcessing] = useState(false);
  const [flashMessage, setFlashMessage] = useState(null);
  const [formValue, setformValue] = React.useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  })

  const handleChange = (event) => {
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value
    })
  };


  // You can perform validation here before submitting the data to the server
  // You would typically make an API call here to submit the data to the server


  const handleSubmit = (e) => {
    e.preventDefault();
    setProcessing(true);

    const token = localStorage.getItem('token');

    axios.put(`${baseURL}/user/changepassword`, {
      currentPassword: formValue.currentPassword,
      newPassword: formValue.newPassword,
      confirmNewPassword: formValue.confirmPassword
    }, {
      headers: {
        Authorization: `Bearer ${token}`            // Include token in Authorization header
      }
    })
      .then(response => {
        console.log("response", response)
        if (response.status === 200) {
          console.log("Password updated successfully");
          setFlashMessage({ type: 'success', message: "Password updated successfully" });
        }
      })
      .catch(error => {
        if (error.response) {
          if (error.response.status === 404) {
            console.log("User not found, email not matched");
            setFlashMessage({ type: 'error', message: 'Incorrect password.' });
          }
          else if (error.response.status === 400) {
            console.log("New password doesn't match to Current confirm password.")
            setFlashMessage({ type: 'error', message: "New password doesn't match to Current confirm password." });
          }
          else if (error.response.status === 402) {
            console.log("Current Password is Incorrect");
            setFlashMessage({ type: 'error', message: 'Current Password is Incorrect' });
          }
        }
        else {
          console.error('Network or request error:', error);
          setFlashMessage({ type: 'error', message: 'Server Error' });
        }
      })
      .finally(() => {
        setProcessing(false);
        setformValue({
          currentPassword: "",
          newPassword: "",
          confirmPassword: ""
        });
      });


  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">

      {flashMessage &&
        <FlashMessage type={flashMessage.type} message={flashMessage.message} />}

      <h2 className="text-2xl font-semibold mb-4">Reset Password</h2>
      <p className="text-gray-600 mb-4">Please enter your current password along with the new password and confirm the new password.</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="currentPassword" className="block mb-1 text-sm">Current Password</label>
          <input
            type="password"
            placeholder="*****"
            name="currentPassword"
            value={formValue.currentPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="newPassword" className="block mb-1 text-sm">New Password</label>
          <input
            type="password"
            placeholder="*****"
            name="newPassword"
            value={formValue.newPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block mb-1 text-sm">Confirm New Password</label>
          <input
            type="password"
            placeholder="*****"
            name="confirmPassword"
            value={formValue.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md transition duration-300 hover:bg-blue-600"
          disabled={processing}
        >
          {processing ? 'Processing...' : 'Reset Password'}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
