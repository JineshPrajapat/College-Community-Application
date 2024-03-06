import React from 'react';
import './CoverPage.scss';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {images} from '../../constants';

import { Link } from 'react-router-dom';



function CoverPage() {
    const handleSignIn = () => {
        window.location.href = "http://localhost:3000/Login";
    }

    return (

        <div className='home-page'>
            <div className=' home-page-container h-100 min-vh-100 d-flex align-items-center text-light'>


                <div className='container d-flex flex-column align-items-center'>
                    <div className=' mb-5'>
                        <img src={images.logo12}></img>
                    </div>
                    <h2>Welcome To</h2>
                    <h1 className='text-center fw-semibold'>CareerPrepHub</h1>
                    <p>" Bridge to Brighter Futures "</p>
                    <p>Connect with your <strong>Seniors</strong> and <strong>Collegemates</strong> for unparalleled opportunities!</p>
                    <div className='d-flex flex-column flex-sm-row align-items-center'>
                        {/* <button type='button' onClick={handleSignIn} className='btn btn-danger btn-lg mx-0 mx-sm-2 my-2 my-sm-0'>login</button> */}
                        <Link to="Login">
                            <button type='button' className='btn btn-danger btn-lg mx-0 mx-sm-2 my-2 my-sm-0'>login</button>
                        </Link>
                        <Link to="Signup">
                            <button type='button' className='btn btn-outline-light btn-lg mx-0 mx-sm-2 my-2 my-sm-0'>SignUp</button>
                        </Link>
                    </div>
                </div>
            </div>


        </div>


    )
}

export default CoverPage;
