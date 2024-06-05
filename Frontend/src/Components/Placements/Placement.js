import React, { useState } from 'react';
import fetchData from '../../FetchData/FetchData';
import baseURL from '../../api/api';
import './Placement.scss';
import Header from '../Header/Header';

const Placement = () => {
    const placementsData = [
        {
            year: 2023,
            branch: 'Computer Science',
            placements: [
                { company: 'Google', applied: 100, placed: 80 },
                { company: 'Microsoft', applied: 120, placed: 90 },
                { company: 'Amazon', applied: 80, placed: 60 },
                { company: 'Tesla', applied: 50, placed: 40 },
            ]
        },
        {
            year: 2022,
            branch: 'Electrical Engineering',
            placements: [
                { company: 'Amazon', applied: 80, placed: 60 },
                { company: 'Tesla', applied: 50, placed: 40 },
                { company: 'Apple', applied: 100, placed: 80 },
                { company: 'IBM', applied: 120, placed: 90 },
            ]
        },
        {
            year: 2023,
            branch: 'Electrical Engineering',
            placements: [
                { company: 'Google', applied: 100, placed: 80 },
                { company: 'Microsoft', applied: 120, placed: 90 },
                { company: 'Amazon', applied: 80, placed: 60 },
                { company: 'Tesla', applied: 50, placed: 40 },
            ]
        },

        {
            year: 2019,
            branch: 'Computer Science',
            placements: [
                { company: 'Google', applied: 100, placed: 80 },
                { company: 'Microsoft', applied: 120, placed: 90 },
                { company: 'Amazon', applied: 80, placed: 60 },
                { company: 'Tesla', applied: 50, placed: 40 },
            ]
        },
        {
            year: 2018,
            branch: 'Electrical Engineering',
            placements: [
                { company: 'Amazon', applied: 80, placed: 60 },
                { company: 'Tesla', applied: 50, placed: 40 },
                { company: 'Apple', applied: 100, placed: 80 },
                { company: 'IBM', applied: 120, placed: 90 },
            ]
        },
        {
            year: 2019,
            branch: 'Electrical Engineering',
            placements: [
                { company: 'Google', applied: 100, placed: 80 },
                { company: 'Microsoft', applied: 120, placed: 90 },
                { company: 'Amazon', applied: 80, placed: 60 },
                { company: 'Tesla', applied: 50, placed: 40 },
            ]
        },
    ];

    // // fetching data from server
    // const [placementsData, setPlacementsData] =useState([]);
    // useState(() =>{
    //     fetchData(`${baseURL}/placement`, setPlacementsData);
    // },[]);

    const [selectedYear, setSelectedYear] = useState(null);
    const [selectedBranch, setSelectedBranch] = useState(null);

    const handleChangeYear = (event) => {
        setSelectedYear(event.target.value);
    };

    const handleChangeBranch = (event) => {
        setSelectedBranch(event.target.value);
    };

    // Filter placements based on selected year and branch
    const filteredData = placementsData.filter(data => {
        if (selectedYear && selectedBranch) {
            return data.year === (+selectedYear) && data.branch === selectedBranch;
        } else if (selectedYear) {
            // console.log(selectedYear);                      
            return data.year === (+selectedYear);              //(+selectedYear) is used to convert string to number type because year is int type for comparing
        } else if (selectedBranch) {
            // console.log(selectedBranch)      
            return data.branch === selectedBranch;
        }
        return true;                                            // If no filtering criteria selected, return all data
    });

    return (
        <>
            <div className="placements-page">
                <h1>College Placements</h1>
                <div className="dropdown-container">
                    <div className="dropdown">
                        <label htmlFor="year">Select Year:</label>
                        <select className="year-select" id="year" value={selectedYear || ''} onChange={handleChangeYear} >
                            <option value="">All Years</option>
                            {[...new Set(placementsData.map(data => data.year))]
                                .sort((a, b) => b - a)
                                .map(year => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                        </select>
                    </div>
                    <div className="dropdown">
                        <label htmlFor="branch">Select Branch:</label>
                        <select className="branch-select" id="branch" value={selectedBranch || ''} onChange={handleChangeBranch} >
                            <option value="">All Branches</option>
                            {[...new Set(placementsData.map(data => data.branch))].map(branch => (
                                <option key={branch} value={branch}>{branch}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <h2 className="placement-heading">
                    Placements
                    {selectedYear && !selectedBranch && ` for ${selectedYear}`}
                    {!selectedYear && selectedBranch && ` for ${selectedBranch}`}
                    {selectedYear && selectedBranch && ` for ${selectedBranch} - ${selectedYear}`}
                </h2>
                <div className='table-container'>
                    <table className="placements-table">
                        <thead>
                            <tr>
                                <th>Year</th>
                                <th>Branch</th>
                                <th>Company</th>
                                <th>Number of Students Applied</th>
                                <th>Number of Students Placed</th>
                            </tr>
                        </thead>
                        <tbody className='bg-white cursor-pointer'>
                            {filteredData.map(item => (
                                item.placements.map(placement => (
                                    <tr key={placement.company}>
                                        <td>{item.year}</td>
                                        <td>{item.branch}</td>
                                        <td>{placement.company}</td>
                                        <td>{placement.applied}</td>
                                        <td>{placement.placed}</td>
                                    </tr>
                                ))
                            ))}
                        </tbody>
                    </table>
                </div>
            </div></>
    );
};

export default Placement;
