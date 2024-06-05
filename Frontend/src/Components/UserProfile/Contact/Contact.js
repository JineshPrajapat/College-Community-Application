import React, { useState, useRef, useEffect } from 'react';
import { images } from '../../../constants';
import '@fortawesome/fontawesome-free/css/all.css';
import baseURL from "../../../../src/api/api";
import axios from 'axios';

const Contact = ({ userData }) => {
  const userName = userData.Data.username;
  const [processing, setProcessing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    email: '',
    message: '',
    phoneNumber: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const form = useRef();
  useEffect(() => {
    setTimeout(() => {
    }, 3000)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    setProcessing(true);

    const token = localStorage.getItem("token");
    console.log(formData);
    axios.post(`${baseURL}/contact/${userName}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`            // Include token in Authorization header
      }
    })
      .then((response) => {
        console.log("Response:", response);

        if (response.status === 200) {
          alert("Message sent successfully");
        }
      })
      .catch((error) => {
        if (error.response) {
          console.error("Error:", error);
          alert("Failed to sent messsage, try again");
        } else {
          console.error("Network or request error");
        }
      })
      .finally (()=>{
        setProcessing(false);
        setFormData({
          name: '',
          subject: '',
          email: '',
          message: '',
          phoneNumber: ''
        });
      })
  };

  return (
    <div className='bg-white py-16'>
      <div className='flex flex-col lg:flex-row gap-5 justify-center items-center mx-4 md:mx-16 mb-16'>
        <div className=' text-left'>
          {/* <h1 className='text-3xl font-bold'>Reach out, let's build something incredible together.</h1> */}
          {/* <p className='text-sm font-medium mb-10 whitespace-normal mt-1 md:w-[40vw]'>Would love to hear your thoughts! I've crafted a contact form for you to share your feedback. Your insights are invaluable.</p> */}
          <div className=' w-[80vw] md:w-[40vw] mb-10'>
            <img src={images.undrawcontact} alt="" />
          </div>
        </div>

        <form ref={form} onSubmit={handleSubmit} className=' min-w-[340px] sm:min-w-[450px] text-[18px] text-left font-normal text-[#495057]  px-3'>
          <div className="flex flex-col">
            <input
              className=' border-none bg-[#f3f3f3] rounded-sm  h-[50px] mb-2 md:mb-5 py-[6px] px-3'
              type="text"
              id="name"
              name="name"
              placeholder='Your Name'
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col">
            <input
              className=' border-none bg-[#f3f3f3] rounded-sm  h-[50px]  mb-2 md:mb-5 py-[6px] px-3'
              type="email"
              id="email"
              name="email"
              placeholder='Email'
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col">
            <input
              className=' border-none bg-[#f3f3f3] rounded-sm  h-[50px]  mb-2 md:mb-5 py-[6px] px-3'
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              placeholder='Phone Number'
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col">
            <input
              className=' border-none bg-[#f3f3f3] rounded-sm  h-[50px]  mb-2 md:mb-5 py-[6px] px-3'
              type="text"
              id="subject"
              name="subject"
              placeholder='Subject'
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col">
            <textarea
              className='border-[1px] border-none bg-[#f3f3f3] rounded-sm  h-[200px]  mb-2 md:mb-5 py-[6px] px-3 '
              type="text"
              id="message"
              name="message"
              placeholder='Write your Message'
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>

          <button
            className={`bg-black text-white text-xl rounded-md px-5 py-2 mt-14 md:mt-2 float-left ${processing && "bg-gray-800"}`}
            type="submit"
            disabled={processing}>
            {processing ? <>Sending Message... &nbsp; </> : <>Send Message &nbsp; <i class="fa-solid fa-paper-plane"></i></>}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Contact;