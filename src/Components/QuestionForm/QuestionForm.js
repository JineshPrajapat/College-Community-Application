// import React, { useState } from 'react';
// import './QuestionForm.scss';

// const QuestionForm = () => {
//   const [formData, setFormData] = useState({
//     branch: '',
//     description: '',
//     link: '',
//     difficulty: 'easy',
//     company: '',
//     year: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Submit formData to backend
//     console.log(formData);
//     // You can send this formData to your backend API for processing
//   };

//   return (
//     <form className="question-form" onSubmit={handleSubmit}>
//       <label>
//         Branch:
//         <select name="branch" value={formData.branch} onChange={handleChange}>
//           <option value="cse">Computer Science Engineering</option>
//           <option value="ai&Da">Artificial Intelligence and Data Science</option>
//           <option value="ece">Electronics and Communication Engineering</option>
//           <option value="ee">Electrical Engineering</option>
//           <option value="me">Mechanical Engineering</option>
//           <option value="ag">Agriculture Engineering</option>
//           <option value="ce">Civil Engineering</option>
//           <option value="mge">MiningEngineering</option>
//           <option value="other">Other</option>
//         </select>
//       </label>
//       <label>
//         Question Description:
//         <textarea name="description" value={formData.description} onChange={handleChange} />
//       </label>
//       <label>
//         Link:
//         <input type="text" name="link" value={formData.link} onChange={handleChange} />
//       </label>
//       <label>
//         Difficulty Level:
//         <select name="difficulty" value={formData.difficulty} onChange={handleChange}>
//           <option value="easy">Easy</option>
//           <option value="medium">Medium</option>
//           <option value="hard">Hard</option>
//         </select>
//       </label>
//       <label>
//         Company:
//         <input type="text" name="company" value={formData.company} onChange={handleChange} />
//       </label>
//       <label>
//         Year:
//         <input type="text" name="year" value={formData.year} onChange={handleChange} />
//       </label>
//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default QuestionForm;



import React, { useState } from "react";
import axios from "axios";
import { images } from '../../constants';
import './QuestionForm.scss';
import ConfirmationDialog from "../ConfirmationDialog/ConfirmationDialog";
import FlashMessage from "../FlashMessage/FlashMessage";


function Reservation() {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [flashMessage, setFlashMessage] = useState(false);

    const [formValue, setformValue] = useState({
        company: '',
        branch: '',
        link: '',
        year: '',
        difficulty: '',
        questionDescription: ''
    });

    const handleChange = (event) => {
        setformValue({
            ...formValue,
            [event.target.name]: event.target.value
        });
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        setShowConfirmation(true);
    }

    const handleConfirmation = (isConfirmed) => {
        if (isConfirmed) {

            axios.post("http://localhost:3000/Questions", {
                company: formValue.company,
                branch: formValue.branch,
                link: formValue.link,
                year: formValue.year,
                difficulty: formValue.difficulty,
                questionDescription: formValue.questionDescription
            })
                .then(response => {
                    console.log("Response:", response);

                    if (response.status === 200) {
                        setFlashMessage({ type: 'success', message: 'We recieved your branch reservation request, Happy to see you soon!' });
                    }
                })
                .catch(error => {
                    if (error.response) {
                        console.error('Error:', error);
                        setFlashMessage({ type: 'error', message: 'Reservation failed, try again!' });
                    } else {
                        console.error('Network or request error')
                    }
                })
        }
        setShowConfirmation(false);
    }

    return (
        <div className={`question-body ${showConfirmation ? 'show-confirmation' : ''}`}>
            <div className="question-heading">
                <h2>Add questions</h2>
                <p>
"Questions asked in interviews are like stepping stones to success; each one offers an opportunity to refine your understanding and sharpen your skills. Embrace them as valuable lessons, for they not only prepare you for the interview but also for the journey ahead."</p>
            </div>
            <div className="question-form-container">
                {/* <img src={images.garima} alt="Dal-makhani" /> */}
                <form id="question-form" onSubmit={handleFormSubmit}>
                    <label htmlFor="company" aria-required="true">Company:
                        <input
                            type="text"
                            placeholder="Enter company name"
                            id="company"
                            name="company"
                            value={formValue.company}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label htmlFor="Branch:">Branch
                        <select
                            id="branch"
                            name="branch"
                            value={formValue.branch}
                            onChange={handleChange}
                        >
                            <option value="cse">Computer Science Engineering</option>
                            <option value="ai&Da">Artificial Intelligence and Data Science</option>
                            <option value="ece">Electronics and Communication Engineering</option>
                            <option value="ee">Electrical Engineering</option>
                            <option value="me">Mechanical Engineering</option>
                            <option value="ag">Agriculture Engineering</option>
                            <option value="ce">Civil Engineering</option>
                            <option value="mge">MiningEngineering</option>
                            <option value="other">Other</option>
                        </select>
                    </label>
                    <label htmlFor="questionDescription">Question Description:
                        <textarea
                            type="text"
                            placeholder="Write questions here"
                            id="questionDescription"
                            name="questionDescription"
                            value={formValue.questionDescription}
                            onChange={handleChange}
                        />
                    </label>
                    <label htmlFor="link">Question Link:
                        <input
                            type="text"
                            placeholder="Any link if availabel for this question"
                            id="link"
                            name="link"
                            value={formValue.phone_number}
                            onChange={handleChange}
                        />
                    </label>
                    <label htmlFor="year">Year:
                        <input
                            type="date"
                            id="year"
                            name="year"
                            aria-hidden="true"
                            value={formValue.Year}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label htmlFor="difficulty">Difficulty:
                        <select
                            id="difficulty"
                            name="difficulty"
                            value={formValue.difficulty}
                            onChange={handleChange}
                        >
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                    </label>
                    <button className='question-btn' type="submit">Submit Question</button>
                </form>


                {/* confirmation component */}
                {showConfirmation && (
                    <ConfirmationDialog
                        message={"Are you sure you want to submit this form?"}
                        onConfirm={handleConfirmation}
                    />
                )
                }

                {/* flash component */}
                {flashMessage &&
                    <FlashMessage type={flashMessage.type} message={flashMessage.message} />}

            </div>
        </div>
    )
}

export default Reservation;