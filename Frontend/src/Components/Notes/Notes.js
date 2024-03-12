import React, { useState } from 'react';
import './Notes.scss'; // Import your SCSS file

import Header from '../Header/Header';

const Notes = () => {
    const [selectedBranch, setSelectedBranch] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('');
    const branches = ['Computer Science', 'Electrical', 'Mechanical','Artificial Intelligence & Data Science'];
    const subjects = {
        'Computer Science': ['Mathematics', 'Physics', 'Computer Networks'],
        'Electrical': ['Circuit Theory', 'Electronics', 'Power Systems'],
        'Mechanical': ['Thermodynamics', 'Fluid Mechanics', 'Machine Design'],
        'Artificial Intelligence & Data Science': ['Machine Learning', 'Big Data Analytics', 'Blockchain Technology']
    };
    const notes = {
        'Mathematics': ['Calculus', 'Algebra'],
        'Physics': ['Mechanics', 'Electromagnetism'],
        'Computer Networks': ['Routing', 'Switching'],
        'Circuit Theory': ['Ohm\'s Law', 'Kirchhoff\'s Laws'],
        'Electronics': ['Diodes', 'Transistors','Generation', 'Transmission','Laws of Thermodynamics', 'Heat Transfer','Hydrostatics', 'Hydraulics','Materials', 'Manufacturing Processes',],
        'Power Systems': ['Generation', 'Transmission'],
        'Thermodynamics': ['Laws of Thermodynamics', 'Heat Transfer'],
        'Fluid Mechanics': ['Hydrostatics', 'Hydraulics'],
        'Machine Design': ['Materials', 'Manufacturing Processes'],
        'Machine Learning': ['Support Vector Machin', 'Bias-Variance trade-off', 'Types of regression']
    };

    const handleBranchChange = (e) => {
        setSelectedBranch(e.target.value);
        setSelectedSubject('');
    };

    const handleSubjectChange = (e) => {
        setSelectedSubject(e.target.value);
    };

    return (
        <div className="notes-content-container">
            <div className="notes-container">
                <h1>Notes of B.Tech Subjects</h1>
                <div className="dropdowns">
                    <select onChange={handleBranchChange} value={selectedBranch} className="branch-dropdown">
                        <option value="">Select Branch</option>
                        {branches.map(branch => (
                            <option key={branch} value={branch}>{branch}</option>
                        ))}
                    </select>
                    {selectedBranch && (
                        <select onChange={handleSubjectChange} value={selectedSubject} className="subject-dropdown">
                            <option value="">Select Subject</option>
                            {subjects[selectedBranch].map(subject => (
                                <option key={subject} value={subject}>{subject}</option>
                            ))}
                        </select>
                    )}
                </div>
                {selectedSubject && (
                    <div className="notes-list">
                        <h2>Notes of {selectedSubject}</h2>
                        <ul className="topics-content">
                            {notes[selectedSubject].map(note => (
                                <li key={note}>
                                    <a href="#" className="note-link">{note}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
                            

        </div>

    );
};

export default Notes;
