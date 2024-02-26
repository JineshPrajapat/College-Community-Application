import React from 'react';
import './CoverPage.scss';
import 'bootstrap/dist/css/bootstrap.css';

import { Link } from 'react-router-dom';



function CoverPage() {
  return (
    <div className='home-page'>
        <div className=' home-page-container h-100 min-vh-100 d-flex align-items-center text-light'>
            <div className='container d-flex flex-column align-items-center'>
                <h2>Welcome To</h2>
                <h1 className='text-center fw-semibold'>CareerPrepHub</h1>
                <p>" Bridge to Brighter Futures "</p>
                <p>Connect with your <strong>Seniors</strong> and <strong>Collegemates</strong> for unparalleled opportunities!</p>
                <div className='d-flex flex-column flex-sm-row align-items-center'>
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
