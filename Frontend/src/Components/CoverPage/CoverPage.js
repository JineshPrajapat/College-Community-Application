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
                    <div className='mt-0 mb-5 w-40 h-40'>
                        <img src={images.mainLogo1}></img>
                    </div>
                    <h2 className='text-2xl '>Welcome To</h2>
                    <h1 className='text-center text-4xl pb-4'>Let's Chat</h1>
                    <p className=' text-xl pb-5'>" Bridge to Brighter Futures "</p>
                    <p className=' pb-5'>Connect with your <strong>Seniors</strong> and <strong>Collegemates</strong> for unparalleled opportunities!</p>
                    <div className='d-flex flex-sm-column flex-md-row align-items-center gap-8'>
                        {/* <button type='button' onClick={handleSignIn} className='btn btn-danger btn-lg mx-0 mx-sm-2 my-2 my-sm-0'>login</button> */}
                        <Link to="Login">
                            <button type='button' className='btn btn-danger bg-danger btn-lg mx-0 mx-sm-2 my-2 my-sm-0'>Login</button>
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
