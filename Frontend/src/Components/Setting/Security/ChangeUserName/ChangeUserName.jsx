import React, { useState, useEffect } from 'react';
import baseURL from '../../../../api/api';
import axios from 'axios';
import FlashMessage from '../../../FlashMessage/FlashMessage';

const ChangeUserName = () => {
  const [currentUsername, setCurrentUsername] = useState('Jinesh');
  const [newUsername, setNewUsername] = useState('');
  const [processing, setProcessing] = useState(false);
  const [flashMessage, setFlashMessage] = useState(null);

  useEffect(() => {
    
    const username = localStorage.getItem("userName");
    setCurrentUsername(username);
  }, []);

  const handleChange = (e) => {
    setNewUsername(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const token = localStorage.getItem('token');
    console.log("addquery token", token);

    axios.put(`${baseURL}/user/changeusername`, {
      newUsername
    }, {
      headers: {
        Authorization: `Bearer ${token}`            // Include token in Authorization header
      }
    })
      .then(response => {
        console.log("response", response)
        if (response.status === 200) {
          console.log("Username Changed Successfully");
          
          setFlashMessage({ type: 'success', message: "Username Changed Successfully" });
        }
      })
      .catch(error => {
        if (error.response) {
          if (error.response.status === 404) {
            console.log("User not found, email not matched");
            setFlashMessage({ type: 'error', message: 'Failed to change Username.' });
          }
        }
        else {
          console.error('Network or request error:', error);
          setFlashMessage({ type: 'error', message: 'Failed to change Username, try again.' });
        }
      })
      .finally(() => {
        setProcessing(false);
        setNewUsername("");
      });
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">

      {flashMessage &&
        <FlashMessage type={flashMessage.type} message={flashMessage.message} />}

      <h2 className="text-2xl font-semibold mb-4">Change Username</h2>
      <p className="text-gray-600 mb-4">
        Current Username: <span className="font-semibold">{currentUsername}</span>
      </p>
      <p className="text-gray-600 mb-4">Please enter your new username below.</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newUsername}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          placeholder="New Username"
          required
        />
        <button
          type="submit"
          className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded-md transition duration-300 hover:bg-blue-600"
          disabled={processing}
        >
          {processing ? 'Processing...' : 'Change Username'}
        </button>
      </form>
    </div>
  );
};

export default ChangeUserName;
