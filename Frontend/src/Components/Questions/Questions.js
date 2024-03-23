import React, { useState } from 'react';
import './Questions.scss';
import { Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import SearchingForm from '../SearchingForm/SearchingForm';
import QuestionDetails from './QuestionDetails/QuestionDetails';
import QuestionForm from './QuestionForm/QuestionForm';
import Header from '../Header/Header';

const Question = () => {

    return (
        <>
        < div className="question">
            <h1 className=' pb-2'>Placement Questions</h1>

            {/* <div className="head-tabs">
                <SearchingForm />
                <Link to="./AddQuestions" className='addquestions' >Add Questions</Link>
            </div> */}

            <Routes>
                <Route path="/" element={<QuestionDetails />} />
                <Route path="AddQuestions" element={<QuestionForm />} />
            </Routes>
        </div></>
    );
};

export default Question;
