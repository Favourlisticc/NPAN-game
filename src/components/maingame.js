import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';

const MainGamePage = () => {
    const location = useLocation();
    const { name, link } = useParams(); // Extract categories and name from URL parameters

    const [categoryInputs, setCategoryInputs] = useState({});
    const [showCard, setShowCard] = useState(false);
    const [timer, setTimer] = useState(60); // Set initial timer value to 60 seconds
    const [randomLetter, setRandomLetter] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [totalScore, setTotalScore] = useState(0);

    const [sessions, setSessions] = useState([]);

    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:3001/api/selected-categories/${link}`)
            .then(response => {
                const { selectedCategories, randomLetter } = response.data;
                setSelectedCategories(selectedCategories);
                setRandomLetter(randomLetter)
                console.log(selectedCategories, randomLetter)
            })
            .catch(error => {
                console.error('Error fetching selected categories:', error);
            });
    }, [link]);




    // Function to generate a random alphabet


    // Function to handle input change
    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setCategoryInputs((prevInputs) => ({
            ...prevInputs,
            [id]: value.trim(),
        }));
    };

    // Function to handle form submission
    const handleSubmitResponse = () => {
        // Implement your submission logic here
    };

    // Effect to update the timer
    useEffect(() => {
        let intervalId;
        if (showCard && timer > 0) {
            intervalId = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        }
        return () => clearInterval(intervalId);
    }, [showCard, timer]);



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
