import React, { useState } from 'react';
import axios from 'axios';
import FlashMessage from '../../FlashMessage/FlashMessage';
import './UserProfileSettings.scss';

const UserProfileSettings = () => {

  const [flashMessage, setFlashMessage] = useState(false);

  const [formValue, setformValue] = useState({
    name: '',
    gender: '',
    branch: '',
    position: '',
    state: '',
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
    formData.append('gender', formValue.gender)
    formData.append('branch', formValue.branch);
    formData.append('position', formValue.position);
    formData.append('state', formValue.state);
    formData.append('studentID', formValue.studentID);

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
      {/* <h2>User Settings</h2> */}
      <form onSubmit={handleFormSubmit}>
        <div className='input_container'>
          <label className='input_label' htmlFor='user_field'>Name*</label>
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
          <label className='input_label '>Gender*</label><br />
          <div className="radio-button">
            <div className="radio">
              <input
                type='radio'
                id='male'
                name='gender'
                value='Male'
                checked={formValue.gender === 'Male'}
                onChange={handleChange}
                required
              />
              <label htmlFor='male'>Male</label>
            </div>
            <div className="radio">
              <input
                type='radio'
                id='female'
                name='gender'
                value='Female'
                checked={formValue.gender === 'Female'}
                onChange={handleChange}
                required
              />
              <label htmlFor='female'>Female</label>
            </div>
          </div>
        </div>

        <div className='input_container'>
          <label className='input_label' htmlFor='branch_field'>Branch*</label>
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
          <label className='input_label' htmlFor='position_field'>Position*</label>
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
          <label className='input_label' htmlFor='state_field'>State*</label>
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
          <label className='input_label' htmlFor='studentID_field'>Student ID*</label>
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

        <button type="submit">Save</button>
      </form>

      {/* flash component */}
      {flashMessage &&
        <FlashMessage type={flashMessage.type} message={flashMessage.message} />}
    </div>
  );
};

export default UserProfileSettings;
