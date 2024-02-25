import React, { useState, useHistory } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';




const SelectCategoryPage = () => {
    const { name } = useParams();

    const history = useHistory();

    const [word, setWord] = useState('');


    const [totalScore, setTotalScore] = useState(0);

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

    const handleSubmitCategories = async () => {
        try {
            const response = await axios.post('http://localhost:3001/api/submit-categories', {
                username: name,
                selectedCategories: checkedCategories
            });
            console.log('Categories submitted successfully:', response.data);
            // Redirect to the main game page after successful submission
            history.push('/main-game');
        } catch (error) {
            console.error('Error submitting categories:', error);
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





{showResultCard && (
    <div className='fixed top-0 right-0 left-0 w-full h-full'>
        <div className="w-full bg-white h-full" style={{ overflowY: "auto" }}>
            <span className="text-5xl float-right pr-7 pt-3" onClick={showhandleModalClose}>&times;</span>

            <h2 className='text-2xl font-semi-bold text-center pt-32'>{name}!</h2>
            <div className='text-3xl flex justify-center mt-8'>
                <p className='text-blue-300'> Your- </p> Result
            </div>
            <div className='mt-5'>
                {selectedCategories.map((category, index) => (
                    <div key={index} className='flex-col justify-center container ml-20'>
                        <div className='flex'>
                            <span className='text-xl mr-20 mt-2 flex'>
                                {category.word} : {categoryInputs[category.word]}  = {/* Display category name and user input */}
                            </span>
                            <span className='text-xl mt-2 ml-3 underline'>
                                {calculateScoreForCategory(category.word)} {/* Display score */}
                            </span>
                        </div>
                        <div>
                            <p className='text-blue-500'>
                                {category.correct ? "Correct" : "Incorrect"} {/* Display correctness */}

                            </p>
                        </div>


                    </div>

                ))}
                 <div className='text-center text-2xl mt-5'>
                            Total Score: {totalScore}
                </div>
            </div>
        </div>
    </div>
)}





        </div>
    );
};

export default SelectCategoryPage;
