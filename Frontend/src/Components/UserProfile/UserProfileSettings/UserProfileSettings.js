import React, { useState } from 'react';
import axios from 'axios';
import FlashMessage from '../../FlashMessage/FlashMessage';
import './UserProfileSettings.scss';

const UserProfileSettings = () => {

  const [flashMessage, setFlashMessage] = useState(false);

  const [formValue, setformValue] = useState({
    name: '',
    bio: '',
    branch: '',
    position: '',
    experience: '',
    state: '',
    hobbies: [],
    references: [],
    skills: [],
    socialMedia: [],
    languages: [],
    photo: null,
    coverPhoto: null,
    pdf: null,
    studentID: null
  });

  const handleChange = (event) => {
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value
    });
  }

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setformValue({
      ...formValue,
      [name]: files[0],
    });
  };

  // posting data
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', formValue.name);
    formData.append('bio', formValue.bio);
    formData.append('branch', formValue.branch);
    formData.append('position', formValue.position);
    formData.append('experience', formValue.experience);
    formData.append('state', formValue.state);
    formData.append('photo', formValue.photo);
    formData.append('coverPhoto', formValue.coverPhoto);
    formData.append('resume', formValue.resume);
    formData.append('studentID',formValue.studentID);

    try {
      const response = await axios.post("http://localhost:3000/userProfile/setting", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log("Response: ", response);

      if (response.status === 200) {
        window.location.href = 'http://localhost:3001/userProfile';
        setFlashMessage({ type: 'success', message: 'Update Successful' });
      }
    } 
    catch (error) {
      console.error('Error:', error);
      if (error.response) {
        if (error.response.status === 400) {
          setFlashMessage({ type: 'error', message: 'An error occurred' });
          window.location.href = 'http://localhost:3001/userProfile/setting';
        }
      } else {
        setFlashMessage({ type: 'error', message: 'Network or request error' });
      }
    }
  }

  return (
    <div className="user-settings">
      <h2>User Settings</h2>
      <form onSubmit={handleFormSubmit}>
        <div className='input_container'>
          <label className='input_label' htmlFor='user_field'>Name</label>
          <input
            className='input_field'
            placeholder='Full Name'
            name='name'
            type='text'
            id='user_field'
            value={formValue.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className='input_container'>
          <label className='input_label' htmlFor='bio_field'>About yourselves</label>
          <textarea
            className='input_field'
            placeholder='Bio'
            title='Input title'
            name='bio'
            type='text'
            id='bio_field'
            value={formValue.bio}
            onChange={handleChange}
            required
          />
        </div>
        <div className='input_container'>
          <label className='input_label' htmlFor='branch_field'>Branch</label>
          <input
            className='input_field'
            placeholder='Branch'
            title='Input title'
            name='branch'
            type='text'
            id='branch_field'
            value={formValue.branch}
            onChange={handleChange}
            required
          />
        </div>
        <div className='input_container'>
          <label className='input_label' htmlFor='position_field'>Position</label>
          <input
            className='input_field'
            placeholder='Student/junior developer'
            title='Input title'
            name='position'
            type='text'
            id='position_field'
            value={formValue.position}
            onChange={handleChange}
            required
          />
        </div>
        <div className='input_container'>
          <label className='input_label' htmlFor='experience_field'>Experience</label>
          <input
            className='input_field'
            placeholder='Experience'
            title='Input title'
            name='experience'
            type='text'
            id='experience_field'
            value={formValue.experience}
            onChange={handleChange}
            required
          />
        </div>
        <div className='input_container'>
          <label className='input_label' htmlFor='state_field'>State</label>
          <input
            className='input_field'
            placeholder='State'
            title='Input title'
            name='state'
            type='text'
            id='state_field'
            value={formValue.state}
            onChange={handleChange}
            required
          />
        </div>

        <div className='input_container'>
          <label className='input_label' htmlFor='studentID_field'>Student ID</label>
          <input
            className='input_field'
            placeholder='User Photo'
            title='Input title'
            name='studentID'
            type='file'
            id='studentID_field'
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </div>
        <div className='input_container'>
          <label className='input_label' htmlFor='userPhoto_field'>Profile Photo</label>
          <input
            className='input_field'
            placeholder='User Photo'
            title='Input title'
            name='userPhoto'
            type='file'
            id='userPhoto_field'
            accept="image/*"
            onChange={handleFileChange}
          // required
          />
        </div>
        <div className='input_container'>
          <label className='input_label' htmlFor='coverPhoto_field'>Cover Photo</label>
          <input
            className='input_field'
            placeholder='coverPhoto'
            title='Input title'
            name='coverPhoto'
            type='file'
            id='coverPhoto_field'
            accept="image/*"
            onChange={handleFileChange}
          // required
          />
        </div>
        <div className='input_container'>
          <label className='input_label' htmlFor='resume_field'>Resume</label>
          <input
            className='input_field'
            // placeholder=''
            title='Input title'
            name='resume'
            type='file'
            id='resume_field'
            accept=".pdf"
            onChange={handleFileChange}
          // required
          />
        </div>

        {/* Dynamic input fields */}
        {/* {['skills', 'hobbies', 'references', 'languages', 'socialMedia'].map((field) => (
          <div key={field}>
            <input
              type={field === 'socialMedia' ? 'url' : 'text'}
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)} // Capitalize first letter
              value={formData[field]}
              onChange={(e) => handleChange(e, field)}
            /> */}
        {/* Display added items */}
        {/* {formData[field].map((item, index) => (
              <div key={`${field}-${index}`}>
                {item}
                <button type="button" onClick={() => handleRemoveItem(index, field)}>Delete</button>
              </div>
            ))}
            <button type="button" onClick={() => handleAddItem(field)}>Add {field.slice(0, -1)}</button>
          </div>
        ))} */}

        <button type="submit">Update</button>
      </form>

      {/* flash component */}
      {flashMessage &&
        <FlashMessage type={flashMessage.type} message={flashMessage.message} />}
    </div>
  );
};

export default UserProfileSettings;
