import React, { useEffect, useState } from 'react';
import './QuestionsDetails.scss';
import { fetchData } from '../../../FetchData/FetchData';
import axios from 'axios';
import baseURL from '../../../api/api';

// const questions = [
//     { questionNo: 1, branch: 'Computer Science', description: 'Given an array of size n, write a program to check if the given array is sorted in (ascending / Increasing / Non-decreasing) order or not. If the array is sorted then return True, Else return False.', link: 'https://leetcode.com/problems/check-if-array-is-sorted-and-rotated/', difficulty: 'Medium', company: 'App Perfect', year: 2023 },
//     { questionNo: 2, branch: 'Computer Science', description: 'Given an integer n, return true if it is a power of two. Otherwise, return false, An integer n is a power of two, if there exists an integer x such that n == 2x.', link: 'https://www.geeksforgeeks.org/problems/minimum-number-of-jumps-1587115620/1?page=1&sortBy=submissions', difficulty: 'Hard', company: 'Wipro', year: 2022 },
//     { questionNo: 3, branch: 'Computer Science', description: 'You are given an array of ‘N’ integers. You need to find the length of the longest sequence which contains the consecutive elements.', link: 'https://leetcode.com/problems/subarray-sum-equals-k/', difficulty: 'Medium', company: 'KanSoftware', year: 2021 },
//     { questionNo: 4, branch: 'Computer Science', description: 'Sample question 2', link: '', difficulty: 'Hard', company: 'XYZ Inc', year: 2022 },
//     { questionNo: 5, branch: 'Computer Science', description: 'Sample question 1', link: '', difficulty: 'Medium', company: 'ABC Corp', year: 2022 },
//     { questionNo: 6, branch: 'Computer Science', description: 'Sample question 2', link: '', difficulty: 'Hard', company: 'XYZ Inc', year: 2020 },
//     { questionNo: 7, branch: 'Computer Science', description: 'Sample question 1', link: '', difficulty: 'Medium', company: 'ABC Corp', year: 2021 },
//     { questionNo: 8, branch: 'Electrical Engineering', description: 'Sample question 2', link: '', difficulty: 'Hard', company: 'XYZ Inc', year: 2020 },
//     { questionNo: 9, branch: 'Electrical Engineering', description: 'Sample question 1', link: '', difficulty: 'Medium', company: 'ABC Corp', year: 2021 },
//     { questionNo: 10, branch: 'Electrical Engineering', description: 'Sample question 2', link: '', difficulty: 'Hard', company: 'XYZ Inc', year: 2021 },
//     { questionNo: 11, branch: 'Electrical Engineering', description: 'Sample question 1', link: '', difficulty: 'Medium', company: 'ABC Corp', year: 2022 },
//     { questionNo: 12, branch: 'Electrical Engineering', description: 'Sample question 2', link: '', difficulty: 'Hard', company: 'XYZ Inc', year: 2022 },
// ];

function QuestionDetails() {

    const [selectedBranch, setSelectedBranch] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState([]);

    // fetching data
    const [questions, setQuestions] = useState([]);
    useState(() => {
        fetchData(`${baseURL}/questions`, setQuestions);
    }, []);


    console.log("questions", questions);

    const MAX_WORDS = 10;               // Maximum words before truncation

    const [expandedQuestion, setExpandedQuestion] = useState(null);


    const toggleQuestionExpansion = (index) => {
        setExpandedQuestion(expandedQuestion === index ? null : index);
    };

    const truncateString = (str) => {
        return str.split(' ').slice(0, MAX_WORDS).join(' ');
    };

    return (
        <div className="question-table-container pb-4">
            <table className="question-table">
                <thead>
                    <tr>
                        {/* <th>Question No.</th> */}
                        <th>Question Description</th>
                        <th>Link</th>
                        <th>Difficulty Level</th>
                        <th>Branch</th>
                        <th>Company</th>
                        <th>Year</th>
                    </tr>
                </thead>
                <tbody>
                    {questions?.question && questions.question.map((question, index) => (
                        <React.Fragment key={index}>
                            <tr>
                                {/* <td className='text-center'>{index + 1}</td> */}

                                <td className='question-description font-sans max-w-36 md:max-w-96' onClick={() => toggleQuestionExpansion(index)}>
                                    {index + 1 + ". "}{expandedQuestion === index ? question.questionTitle : truncateString(question.questionTitle)}
                                </td>

                                <td className='text-center'><a href={question.questionLink} target='_blank'>{"View"} <i class="fa-solid fa-arrow-up-right-from-square" /></a></td>
                                <td className={`flex items-center justify-center w-full" `}>
                                    <div className={`  rounded-full  px-3 py-1 outline-0 ${question.difficulty === "Medium" ? " bg-yellow-200 text-yellow-700" : question.difficulty === "Hard" ? "bg-red-200 text-red-600" : "bg-green-300 text-green-800"}`}>
                                        {question.difficulty}
                                    </div>
                                </td>
                                <td>{question.branch}</td>
                                <td className=''>{question.company}</td>
                                <td className={`text-center`}>{question.year}</td>
                            </tr>
                            {expandedQuestion === index && (
                                <tr >
                                    <td colSpan="7" >
                                        <div className="expanded-description ">
                                            <div className='overflow-hidden' dangerouslySetInnerHTML={{ __html: question.questionDescription }} />
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}

                </tbody>
            </table>
        </div>
    );
};

export default QuestionDetails;