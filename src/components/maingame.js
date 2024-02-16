import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

const MainGamePage = () => {
    const location = useLocation();
    const { categories } = useParams(); // Extract categories from URL parameters
    const { name } = useParams(); // Access name from URL params
    const selectedCategories = categories ? categories.split(',') : [];
    const [categoryInputs, setCategoryInputs] = useState({});
    const [timer, setTimer] = useState(60); // Initial timer value in seconds
    const [timerId, setTimerId] = useState(null);

    console.log("here to stay", categories, name); // Corrected: `name` instead of `names`

    return (
        <div className='mt-20'>
            <h2 className='text-3xl font-semi-bold'>Welcome, {name}!</h2>
            <h3>Selected Categories:</h3>
            {/* Render input fields for each selected category */}
            {selectedCategories.map((category, index) => (
                <div key={index}>
                    <label>{category}:</label>
                    <input
                        type='text'
                        value={categoryInputs[category] || ''}
                        onChange={(e) => setCategoryInputs(prevInputs => ({ ...prevInputs, [category]: e.target.value }))}
                    />
                </div>
            ))}
            {/* Display timer */}
            <div>Timer: {timer} seconds</div>
        </div>
    );
};

export default MainGamePage;
