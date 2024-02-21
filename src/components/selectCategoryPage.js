import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import spellchecker from 'spellchecker';



const SelectCategoryPage = () => {
    const { name } = useParams();
    const [word, setWord] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [showCard, setShowCard] = useState(false);
    const [timer, setTimer] = useState();
    const [randomLetter, setRandomLetter] = useState('');
    const [totalScore, setTotalScore] = useState(0);
    const [showResultCard, setShowResultCard] = useState(false);
    const [categoryInputs, setCategoryInputs] = useState({});
    const [misspelledWords, setMisspelledWords] = useState([]);
    const [result, setResult] = useState(null); // State for fetched data


    async function run(text) {
        try {
            const response = await axios.post(
                'https://api.sapling.ai/api/v1/statistics',
                {
                    "key": 'DXY4N588FKUPFTI8NHFY34C4XM25IEHF',
                    text,
                },
            );
            const {status, data} = response;
            console.log({status});
            console.log(JSON.stringify(data, null, 4));
            return data;
        } catch (err) {
            const { msg } = err.response.data;
            console.log({err: msg});
            throw new Error(msg);
        }
    }


    const handleSubmitResponse = async () => {
        let totalScore = 0;
        const alphabetLowerCase = randomLetter.toLowerCase();
        const alphabetUpperCase = randomLetter.toUpperCase();
        const updatedCategories = [...selectedCategories]; // Create a copy of selected categories

        for (let i = 0; i < selectedCategories.length; i++) {
            const category = selectedCategories[i];
            const userInput = categoryInputs[category] || '';

            if (userInput !== '') {
                if (
                    userInput[0].toLowerCase() === alphabetLowerCase ||
                    userInput[0].toUpperCase() === alphabetUpperCase
                ) {
                    totalScore += 10;
                } else {
                    // Use Sapling API for spell checking
                    try {
                        await run(userInput);
                        // No errors means spelling is correct
                        totalScore += 10;
                    } catch (error) {
                        // Handle misspelled word
                        console.error('Misspelled word:', userInput);
                        setMisspelledWords(prevMisspelledWords => [
                            ...prevMisspelledWords,
                            { word: userInput }
                        ]);
                    }
                }
            }
        }

        // Update state with the updated categories and total score
        setSelectedCategories(updatedCategories);
        setTotalScore(totalScore);
        setShowResultCard(true);
    };

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setCategoryInputs((prevInputs) => ({
            ...prevInputs,
            [id]: value.trim(),
        }));
    };

    const handleCreateRoomClick = () => {
        setShowCard(true);
        setRandomLetter(generateRandomLetter());
    };

    const playhandleModalClose = () => {
        setShowCard(false);
    };

    const showhandleModalClose = () => {
        setShowResultCard(false);
        setShowCard(false);
    };

    const generateRandomLetter = () => {
        const alphabet = 'J';
        const randomIndex = Math.floor(Math.random() * alphabet.length);
        return alphabet[randomIndex];
    };





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
                <button className='mt-5 bg-blue-900 text-white w-64 h-16 text-xl' onClick={handleCreateRoomClick}>
                    Create Room
                </button>
                <br />
                <button className='mt-5 bg-gray-900 text-white w-64 h-16 text-xl'>Cancel</button>
            </div>

            {showCard && (
                <div className='p fixed top-0 right-0 left-0 w-full h-full'>
                    <div className="w-full bg-white h-full" style={{ overflowY: "auto" }}>
                        <span className="text-5xl float-right pr-7 pt-3" onClick={playhandleModalClose}>&times;</span>

                        <div className='pt-20' >
                            <h3 className='text-center text-3xl'>{name}</h3>
                            <div className='flex justify-between mt-16' >
                                <div className=' ml-28 text-4xl flex max-sm:text-base max-sm:ml-3'>Selected Alphabet: <p className='text-blue-600 max-sm:text-xl'>{randomLetter}</p></div>
                                <div className=' mr-52 text-4xl flex max-sm:text-xl max-sm:mr-2'><p className='text-blue-600'>{timer} </p> seconds</div>
                            </div>
                            <div className='flex mt-10 justify-center flex-wrap ml-52 mr-52 max-sm:ml-0 max-sm:mr-0'>
                                {selectedCategories.map((category, index) => (
                                    <div key={index} className=''>
                                        <input type='text' id={category} className='border-2 p-3 m-3' placeholder={category} onChange={handleInputChange} />
                                    </div>
                                ))}
                            </div>
                            <div className='flex justify-center mt-5'>
                                <button onClick={handleSubmitResponse} className='mt-5 bg-blue-900 text-white w-64 h-16 text-xl'>Submit response</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

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
                            {category.word} :

                            =
                        </span>
                        <span className='text-xl mt-2 ml-3 underline'>
                            {/* Calculate score for the category here */}
                            {/* Assuming you have a function for calculating score */}
                            {calculateScoreForCategory(category.word)}
                        </span>
                        </div>

                        <div>
                        <p className='text-blue-500'>
                                {/* Display "Correct" or "Incorrect" based on the comparison */}
                {category.correct ? "Correct" : "Incorrect"}
                            </p>
                        </div>
                    </div>


                ))}
            </div>
        </div>
    </div>
)}


        </div>
    );
};

export default SelectCategoryPage;
