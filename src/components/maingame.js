import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

const MainGamePage = () => {
    const location = useLocation();
    const { categories } = useParams(); // Extract categories from URL parameters
    const { name } = useParams(); // Access name from URL params

    const [categoryInputs, setCategoryInputs] = useState({});
    const [showCard, setShowCard] = useState(false);
    const [showResultCard, setShowResultCard] = useState(false);
    const [timer, setTimer] = useState();

    const [randomLetter, setRandomLetter] = useState('');

    const [misspelledWords, setMisspelledWords] = useState([]);

    const [result, setResult] = useState(null); // State for fetched data

    const [selectedCategories, setSelectedCategories] = useState([]);

    const handleSubmitResponse = async () => {
        let totalScore = 0;
        const alphabetLowerCase = randomLetter.toLowerCase();
        const alphabetUpperCase = randomLetter.toUpperCase();
        const updatedCategories = []; // Array to hold updated category objects

        for (let i = 0; i < selectedCategories.length; i++) {
            const category = selectedCategories[i];
            const userInput = categoryInputs[category] || '';

    
            if (userInput !== '') {
                let score = 0;

                // Check if the first letter matches the alphabet
                const isCorrect = (
                    userInput[0].toLowerCase() === alphabetLowerCase ||
                    userInput[0].toUpperCase() === alphabetUpperCase
                );
                // Call `run` function to check if the word matches the dictionary
                const correctedValue = await run(userInput);

                if (isCorrect && correctedValue === userInput) {
                    score += 10;
                } else if (!isCorrect && correctedValue === userInput) {
                    score += 5;
                } else if (!correctedValue && isCorrect) {
                    score += 5;
                } else {
                    // Handle misspelled word
                    console.log('Misspelled word:', userInput);
                    setMisspelledWords(prevMisspelledWords => [
                        ...prevMisspelledWords,
                        { word: userInput }
                    ]);
                }

                totalScore += score
    
                updatedCategories.push({ word: category, correct: score === 10 }); // Push object with word and correctness
            }
        }
    
        // Update state with the updated categories and total score
        setSelectedCategories(updatedCategories);
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

    const calculateScoreForCategory = (category) => {
        const categoryObj = selectedCategories.find(cat => cat.word === category); // Find the corresponding object
        if (categoryObj) {
            return categoryObj.correct ? 10 : 5; // Return score based on correctness
        }
        return 0; // Default score if category not found
    };

    const handleInputChange = async (event) => {
        const { id, value } = event.target;
        // const correctedValue = await run(value);
        setCategoryInputs((prevInputs) => ({
            ...prevInputs,
            [id]: value.trim(),
        }));
    };

    const generateRandomLetter = () => {
        const alphabet = 'ABCDEFGHIJKLMNOPRSTUVWXYZ';
        const randomIndex = Math.floor(Math.random() * alphabet.length);
        return alphabet[randomIndex];
    };

    console.log("here to stay", categories, name); // Corrected: `name` instead of `names`

    return (
        <div className='p fixed top-0 right-0 left-0 w-full h-full'>
        <div className="w-full bg-white h-full" style={{ overflowY: "auto" }}>


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
    );
};

export default MainGamePage;
