import React, { useState } from 'react';
import axios from 'axios';
import FlashMessage from '../../FlashMessage/FlashMessage';
import { useNavigate } from "react-router-dom";
import './UserProfileSettings.scss';

const UserProfileSettings = () => {

  const [flashMessage, setFlashMessage] = useState(false);

  const [formValue, setformValue] = useState({
    fullName: '',
    gender: '',
    branchName: '',
    enrollmentNumber: "",
    position: '',
    state: '',
    // studentId: null
  });

  const handleChange = (event) => {
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value
    });
  }

  // const handleFileChange = (e) => {
  //   const { name, files } = e.target;
  //   setformValue({
  //     ...formValue,
  //     [name]: files[0],
  //   });
  // };

  // posting data
  // const handleFormSubmit = async (event) => {
  //   event.preventDefault();

  //   // const formData = new FormData();
  //   // formData.append('fullName', formValue.fullName);
  //   // formData.append('gender', formValue.gender)
  //   // formData.append('branchName', formValue.branchName);
  //   // formData.append('position', formValue.position);
  //   // formData.append('state', formValue.state);
  //   // // formData.append('studentId', formValue.studentId);
  //   // formData.append('enrollmentNumber', formValue.enrollmentNumber);

  //   // try {
  //      axios.post("http://localhost:4000/api/v1/profile/updateProfile", {
  //       fullName: formValue.fullName,
  //       gender: formValue.gender,
  //       branchName: formValue.branchName,
  //       enrollmentNumber: formValue.enrollmentNumber,
  //       position: formValue.position,
  //       state: formValue.state

  //     })
  //       .then(response => {
  //         console.log("Response: ", response);

  //         if (response.status === 200) {
  //           console.log("Response in 200: ", response);
  //           //  successful registration flash message
  //           setFlashMessage({ type: 'success', message: 'Profile updated' });
  //           window.location.href = 'http://localhost:3000';
  //           // return <Navigate to="/UserProfileSetting" />;

  //         }
  //       })
  //       .catch(error => {
  //         if (error.response) {
  //           if (error.response.status === 400) {
  //             // handle already registered
  //             console.error('Already registered');
  //             setFlashMessage({ type: 'error', message: 'Profile not updated, try again' });
  //             window.location.href = 'http://localhost:3000/UserDetail';
  //           }
  //           else if (error.response.status === 403) {
  //             setFlashMessage({ type: 'error', message: 'All fields required' });
  //           }
  //           else {
  //             //handle other error
  //             console.error('Error:', error);

  //           }
  //         } else {
  //           // handle network or request error
  //           console.error('Network or request error:', error);
  //         }
  //       })
  // }
  
  const navigate = useNavigate();

  const handleFormSubmit = async (event) => {
    event.preventDefault();
  
    axios.put("http://localhost:4000/api/v1/profile/updateProfile", {
      fullName: formValue.fullName,
      gender: formValue.gender,
      branchName: formValue.branchName,
      enrollmentNumber: formValue.enrollmentNumber,
      position: formValue.position,
      state: formValue.state
    })
      .then(response => {
        console.log("Response: ", response);
  
        if (response.status === 200) {
          console.log("Response in 200: ", response);
          // successful registration flash message
          setFlashMessage({ type: 'success', message: 'Profile updated' });
          navigate("/careerprephub");
        }
      })
      .catch(error => {
        if (error.response) {
          if (error.response.status === 400) {
            // handle already registered
            console.error('Already registered');
            setFlashMessage({ type: 'error', message: 'Profile not updated, try again' });
            window.location.href = 'http://localhost:3000/UserDetail';
          }
          else if (error.response.status === 403) {
            setFlashMessage({ type: 'error', message: 'All fields required' });
          }
          else if (error.response.status === 404) {
            // handle Not Found error
            console.error('Resource not found');
            setFlashMessage({ type: 'error', message: 'Resource not found' });
          }
          else {
            // handle other errors
            console.error('Error:', error);
          }
        } else {
          // handle network or request error
          console.error('Network or request error:', error);
        }
      })
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
            name='fullName'
            type='text'
            id='user_field'
            value={formValue.fullName}
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
            name='branchName'
            type='text'
            id='branch_field'
            value={formValue.branchName}
            onChange={handleChange}
            required
          />
        </div>
        <div className='input_container'>
          <label className='input_label' htmlFor='enrollement_field'>Enrollement Number*</label>
          <input
            className='input_field'
            placeholder='Enrollement Number'
            title='Input title'
            name='enrollmentNumber'
            type='text'
            id='enrollement_field'
            value={formValue.enrollmentNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div className='input_container'>
          <label className='input_label' htmlFor='position_field'>College Name*</label>
          <input
            className='input_field'
            placeholder='College Name'
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

        {/* <div className='input_container'>
          <label className='input_label' htmlFor='studentId_field'>Student ID*</label>
          <input
            className='input_field'
            placeholder='User Photo'
            title='Input title'
            name='studentId'
            type='file'
            id='studentId_field'
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </div> */}

        <button type="submit">Save</button>
      </form>

      {/* flash component */}
      {flashMessage &&
        <FlashMessage type={flashMessage.type} message={flashMessage.message} />}
    </div>
  );
};

export default UserProfileSettings;
