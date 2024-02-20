import React, { useState } from 'react';
import './SearchingForm.scss';
const SearchingForm =() =>{
    const [selectedBranch, setSelectedBranch] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState([]);

    return(
        <form className='reset-form'>
                <div>
                    <select value={selectedBranch} onChange={e => setSelectedBranch(e.target.value)}>
                        <option value="">Choose Branch</option>
                        {selectedBranch.map((branch) => (
                            <option key={branch} value={branch}>{branch}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <select value={selectedCompany} onChange={e => setSelectedCompany(e.target.value)}>
                        <option value="">Choose Company</option>
                        {selectedCompany.map((company) => (
                            <option key={company} value={company}>{company}</option>
                        ))}
                    </select>
                </div>
                <button type="submit">RESET</button>
            </form>
    );
}

export default SearchingForm;