import React, { useState } from 'react';
import axios from 'axios';
import FlashMessage from '../../FlashMessage/FlashMessage';
import { images } from '../../../constants';
import './Contact.scss';

const Contact = () => {

  const [flashMessage, setFlashMessage] = useState(null);
  const [formValue, setformValue] =useState({
    name:'',
    email:"",
    phone_number:"",
    message:""

  });

  const handleChange = (event) => {
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value
    })
  }

  const handleFormSubmit = async (event) =>{
    event.preventDefault();

    axios.post("http://localhost:4000/api/v1/userProfile/contact",{
        name: formValue.name,
        phone_number: formValue.phone_number,
        email: formValue.email,
        message: formValue.message,
    })
        .then(response => {
            console.log("Response: ", response);

            if(response.status === 200){
                //  successful registration flash message
                setFlashMessage({type: 'success', message:'Mailed Successfull'});
            }
        })
        .catch(error =>{
            if(error.response){
                if(error.response.status === 400){
                    // handle already registered
                    console.error('Already registered');
                    setFlashMessage({type:'error', message:'failed, try again'});
                    // window.location.href = 'http://localhost:3001/Login';
                }
                else {
                    //handle other error
                    console.error('Error:', error);
                   
                }
            } else{
                // handle network or request error
                console.error('Network or request error:', error);
            }
        })
}

  return (

      <div className="tab-pane">
        <div className="row-division">
          <div className="left-side">
            <img src={images.background} alt='contact'/>
          </div>

          <form className="right-side" onSubmit={handleFormSubmit} >
            <div className=" row row-name-email">
              <div className="name">
                <input
                  type='text'
                  placeholder='Enter Full Name'
                  name='name'
                  id='name'
                  value={formValue.name}
                  onChange={handleChange}
                />
              </div>
              <div className="email">
                <input 
                  type="email"
                  placeholder='Enter Email Address' 
                  name="email" 
                  id="email" 
                  value={formValue.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="phnum">
                <input
                  type="tel"
                  placeholder='Enter Mobile Number'
                  name="phone_number"
                  id="phone_number"
                  value={formValue.phone_number}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="message">
                <textarea
                  placeholder='Enter your Message'
                  id='message'
                  name='message'
                  value={formValue.message}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="btn-sub">
                <button>Send Message</button>
              </div>
            </div>
          </form>
        </div>

        {/* flash component */}
      {flashMessage &&
        <FlashMessage type={flashMessage.type} message={flashMessage.message} />}
      </div>
  );
}

export default Contact;
