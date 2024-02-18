import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

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

    const checkSpelling = async () => {
        try {
            const response = await fetch(`https://api.datamuse.com/words?sp=${word}&max=5`);
            const data = await response.json();
            // Check if suggestions are available
            if (Array.isArray(data) && data.length > 0) {
                // Extract suggestions from the response
                const suggestionList = data.map((item) => item.word);
                setSuggestions(suggestionList);
            } else {
                // If no suggestions are available, clear the suggestions array
                setSuggestions([]);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    

    useEffect(() => {
        if (word.trim() !== '') {
            checkSpelling();
        }
    }, [word]);

    console.log("hello",suggestions)

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setCategoryInputs((prevInputs) => ({
            ...prevInputs,
            [id]: value.trim(),
        }));
    };

    const handleSubmitResponse = () => {
        let totalScore = 0;
        const alphabetLowerCase = randomLetter.toLowerCase();
        const alphabetUpperCase = randomLetter.toUpperCase();
    
        selectedCategories.forEach((category) => {
            const userInput = categoryInputs[category] || '';
            if (userInput === '') {
                totalScore += 0;
            } else if (userInput[0] === alphabetLowerCase || userInput[0] === alphabetUpperCase) {
                totalScore += 10;
            } else {
                totalScore += 5;
                // If the first letter of the input doesn't match the random letter, check if it's a misspelled word
                if (suggestions.length > 0 && suggestions.includes(userInput)) {
                    // If the input word is found in suggestions, deduct points and show suggestions
                    totalScore -= 5;
                }
            }
        });
    
        setTotalScore(totalScore);
        setShowResultCard(true);
    };


    useEffect(() => {
        let timerId;
        if (showCard) {
            setTimer(60);
            timerId = setInterval(() => {
                setTimer((prevTimer) => {
                    if (prevTimer === 1) {
                        setShowCard(false);
                        clearInterval(timerId);
                    }
                    return prevTimer - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timerId);
    }, [showCard]);

    const generateRandomLetter = () => {
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const randomIndex = Math.floor(Math.random() * alphabet.length);
        return alphabet[randomIndex];
    };

    const calculateScoreForCategory = (category) => {
        let score = 0;
        const userInput = categoryInputs[category] || '';
        if (userInput === '') {
            score = 0;
        } else if (
            userInput[0].toLowerCase() === randomLetter.toLowerCase() ||
            userInput[0].toUpperCase() === randomLetter.toUpperCase()
        ) {
            score = 10;
        } else {
            score = 5;
        }
        return score;
    };

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        if (checked) {
            setSelectedCategories((prevSelectedCategories) => [...prevSelectedCategories, name]);
        } else {
            setSelectedCategories((prevSelectedCategories) =>
                prevSelectedCategories.filter((category) => category !== name)
            );
        }
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

    return (
        <div className='mt-20'>
            <div className='text-center'>
                <h2 className='text-3xl font-semi-bold'>Welcome, {name}!</h2>
                <div className='mt-5 flex flex-wrap justify-center text-center items-center ml-96 mr-96 max-sm:ml-5 max-sm:mr-5 '>
                    {/* Checkbox inputs */}
                    <div className='marr'>
                <input onChange={handleCheckboxChange} type='checkbox' name='Names'/>

                    <label for="name" className='text-lg'>Name</label>
                </div>

                <div className='marr'>
                    <input onChange={handleCheckboxChange} type='checkbox' name='Place'/>
                    <label for="place" className='text-lg'>Place</label>
                </div>

                <div className='marr'>
                    <input onChange={handleCheckboxChange} type='checkbox' name='Animal'/>
                    <label for="animal" className='text-lg'>Animal</label>
                </div>

                <div className='marr'>
                    <input onChange={handleCheckboxChange} type='checkbox' name='Thing'/>
                    <label for="thing" className='text-lg'>Thing</label>
                </div>

                <div className='marr'>
                    <input onChange={handleCheckboxChange} type='checkbox' name='Song'/>
                    <label for="song" className='text-lg'>Song</label>
                </div>

                <div className='marr'>
                    <input onChange={handleCheckboxChange} type='checkbox' name='Fruits'/>
                    <label for="fruits" className='text-lg'>Fruits</label>
                </div>

                <div className='marr'>
                    <input onChange={handleCheckboxChange} type='checkbox' name='Subject'/>
                    <label for="subject">Subject</label>
                </div>

                <div className='marr'>
                    <input onChange={handleCheckboxChange} type='checkbox' name='Celebrities'/>
                    <label for="celebrities"  className='text-lg'>Celebrities</label>
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
        <div className="w-full bg-white h-full " style={{ overflowY: "auto" }}>
            <span className="text-5xl float-right pr-7 pt-3" onClick={showhandleModalClose}>&times;</span>

            <h2 className='text-2xl font-semi-bold text-center pt-32'>{name}!</h2>
            <div className='text-3xl flex justify-center mt-8'>
                <p className='text-blue-300'> Your- </p> Result
            </div>

            <div className='mt-5'>
                {selectedCategories.map((category, index) => (
                    <div key={index} className='flex justify-center'>
                        <span className='text-xl mr-20 mt-2 flex'>
                            {category} : 
                            <p className='text-blue-500'>
                                {categoryInputs[category]}
                            </p> 
                            =
                        </span>
                        {calculateScoreForCategory(category) === 0 ? (
                            <span className='text-xl mt-2 ml-3 underline'>
                                Misspelled. Suggestions: {suggestions.join(', ')}
                            </span>
                        ) : (
                            <span className='text-xl mt-2 ml-3 underline'>
                                Score: {calculateScoreForCategory(category)}
                            </span>
                        )}
                    </div>
                ))}
                <div className='text-center mr-20 text-2xl mt-5'>
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
