import React, { useState } from 'react';
import axios from 'axios';
import baseURL from '../../../api/api';
import FlashMessage from '../../FlashMessage/FlashMessage';
import './UpdateProfileSettings.scss';

const UpdateProfileSettings = () => {
  const [flashMessage, setFlashMessage] = useState(false);

  const [formValue, setFormValue] = useState({
    bio: '',
    position: '',
    experience: '',
    state: '',
    skills: [],
    hobbies: [],
    references: [],
    socialMedia: [],
    languages: [],
    photo: null,
    coverPhoto: null,
    resume: null,
    studentID: null
  });

  const handleChange = (event) => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.value
    });
  }

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormValue({
      ...formValue,
      [name]: files[0],
    });
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.post(`${baseURL}/userProfile/setting`, formValue, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log("Response: ", response);

      if (response.status === 200) {
        setFlashMessage({ type: 'success', message: 'Update Successful' });
      }
    } catch (error) {
      console.error('Error:', error);
      if (error.response) {
        if (error.response.status === 400) {
          setFlashMessage({ type: 'error', message: 'An error occurred' });
        }
      } else {
        setFlashMessage({ type: 'error', message: 'Network or request error' });
      }
    }
  }

  return (
    <div className="user-update-settings">
      {/* <h2>Update Profile</h2> */}
      <form>
        {/* Render each input with an update button */}

        {Object.keys(formValue).map(key => (
          <div className="update-box">
            <div key={key} className='input_container'>
              {/* <label className='input_label' htmlFor={`${key}_field`}>{key}</label> */}
              <label className='input_label' htmlFor={`${key}_field`}>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
              {key === 'photo' || key === 'coverPhoto' || key === 'pdf' || key === 'studentID' || key === 'resume' ? (
                <input
                  className='input_field'
                  name={key}
                  type='file'
                  id={`${key}_field`}
                  accept={key === 'pdf' ? ".pdf" : "image/*"}
                  onChange={handleFileChange}
                />
              ) : (
                <input
                  className='input_field'
                  name={key}
                  type='text'
                  id={`${key}_field`}
                  value={formValue[key]}
                  onChange={handleChange}
                />
              )}

            </div>
            <button type="button" onClick={handleUpdate}>Update</button>
          </div>
        ))}
      </form>

      {/* flash component */}
      {flashMessage && <FlashMessage type={flashMessage.type} message={flashMessage.message} />}
    </div>
  );
};

export default UpdateProfileSettings;
