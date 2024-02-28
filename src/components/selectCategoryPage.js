import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';




const SelectCategoryPage = () => {
    const { name, link } = useParams();

    const navigate = useNavigate();

    const [word, setWord] = useState('');




    const [categoryInputs, setCategoryInputs] = useState({});


    const [checkedCategories, setCheckedCategories] = useState([]);

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        if (checked) {
            setCheckedCategories((prevCheckedCategories) => [...prevCheckedCategories, name]);
        } else {
            setCheckedCategories((prevCheckedCategories) =>
                prevCheckedCategories.filter((category) => category !== name)
            );
        }


    };

    console.log(checkedCategories)

    const handleSubmitCategories = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/submit-categories/${link}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ categories: checkedCategories }), // Convert array to JSON string
            });
            const data = await response.json();
            console.log(data);
            // Handle success here (e.g., show a success message)
            navigate(`/game/${name}/${link}`); // Redirect to the main game page
        } catch (error) {
            console.log('Error submitting categories:', error);
            // Handle error here (e.g., show an error message)
        }
    };
    





    // run('lionn');








    // const calculateScoreForCategory = (category) => {
    //     let score = 0;
    //     const userInput = document.getElementById(category)?.value.trim();
    //     if (userInput === '') {
    //         score = 0;
    //     } else if (
    //         userInput[0].toLowerCase() === randomLetter.toLowerCase() ||
    //         userInput[0].toUpperCase() === randomLetter.toUpperCase()
    //     ) {
    //         score = 10;
    //     } else {
    //         score = 5;
    //     }
    //     return score;
    // };










    return (
        <div className='mt-20'>
            <div className='text-center'>
                <h2 className='text-3xl font-semi-bold'>Welcome, {name}!</h2>
                <div className='mt-5 flex flex-wrap justify-center text-center items-center ml-96 mr-96 max-sm:ml-5 max-sm:mr-5 '>
                    {/*
                        Checkbox inputs
                        Adjusted the layout for better readability
                    */}
                    <div className='marr'>
                        <input onChange={handleCheckboxChange} type='checkbox' name='Names' />
                        <label htmlFor="name" className='text-lg'>Name</label>
                    </div>
                    <div className='marr'>
                        <input onChange={handleCheckboxChange} type='checkbox' name='Place' />
                        <label htmlFor="place" className='text-lg'>Place</label>
                    </div>
                    <div className='marr'>
                        <input onChange={handleCheckboxChange} type='checkbox' name='Animal' />
                        <label htmlFor="animal" className='text-lg'>Animal</label>
                    </div>
                    <div className='marr'>
                        <input onChange={handleCheckboxChange} type='checkbox' name='Thing' />
                        <label htmlFor="thing" className='text-lg'>Thing</label>
                    </div>
                    <div className='marr'>
                        <input onChange={handleCheckboxChange} type='checkbox' name='Song' />
                        <label htmlFor="song" className='text-lg'>Song</label>
                    </div>
                    <div className='marr'>
                        <input onChange={handleCheckboxChange} type='checkbox' name='Fruits' />
                        <label htmlFor="fruits" className='text-lg'>Fruits</label>
                    </div>
                    <div className='marr'>
                        <input onChange={handleCheckboxChange} type='checkbox' name='Subject' />
                        <label htmlFor="subject">Subject</label>
                    </div>
                    <div className='marr'>
                        <input onChange={handleCheckboxChange} type='checkbox' name='Celebrities' />
                        <label htmlFor="celebrities" className='text-lg'>Celebrities</label>
                    </div>
                </div>
                <button className='mt-5 bg-blue-900 text-white w-64 h-16 text-xl' onClick={handleSubmitCategories}>
                   Submit Categories
                </button>
                <br />
                <button className='mt-5 bg-gray-900 text-white w-64 h-16 text-xl'>Cancel</button>
            </div>






        </div>
    );
};

export default SelectCategoryPage;
