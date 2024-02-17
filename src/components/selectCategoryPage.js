import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const SelectCategoryPage = () => {
    const { name } = useParams(); // Destructure name from useParams()

    const [selectedCategories, setSelectedCategories] = useState([]);
    const [showCard, setShowCard] = useState(false);

    const [timer, setTimer] = useState(30); // Initial timer value in seconds
    const [timerId, setTimerId] = useState(null);

    const [randomLetter, setRandomLetter] = useState('');

    useEffect(() => {
        let timerId;
        if (showCard) {
            timerId = setInterval(() => {
                setTimer((prevTimer) => {
                    if (prevTimer === 1) {
                        clearInterval(timerId); // Clear interval when timer reaches 0
                        setShowCard(false); // Hide the card
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

  console.log('Selected Categories:', selectedCategories, name); // Log selected categories to see if they are being updated correctly

  return (
    <div className='mt-20'>

      <div className='text-center'>
          <h2 className='text-3xl font-semi-bold'>Welcome, {name}!</h2>
            {/* Other content of the page */}
            <div className='mt-5 flex flex-wrap justify-center text-center items-center ml-96 mr-96 max-sm:ml-5 max-sm:mr-5 '>
                <div className='marr'>
                <input onChange={handleCheckboxChange} type='checkbox' name='Names'/>

                    <label for="name" className='text-lg'>Name</label>
                </div>

                <div className='marr'>
                    <input onChange={handleCheckboxChange} type='checkbox' name='place'/>
                    <label for="place" className='text-lg'>Place</label>
                </div>

                <div className='marr'>
                    <input onChange={handleCheckboxChange} type='checkbox' name='animal'/>
                    <label for="animal" className='text-lg'>Animal</label>
                </div>

                <div className='marr'>
                    <input onChange={handleCheckboxChange} type='checkbox' name='thing'/>
                    <label for="thing" className='text-lg'>Thing</label>
                </div>

                <div className='marr'>
                    <input onChange={handleCheckboxChange} type='checkbox' name='song'/>
                    <label for="song" className='text-lg'>Song</label>
                </div>

                <div className='marr'>
                    <input onChange={handleCheckboxChange} type='checkbox' name='fruits'/>
                    <label for="fruits" className='text-lg'>Fruits</label>
                </div>

                <div className='marr'>
                    <input onChange={handleCheckboxChange} type='checkbox' name='subject'/>
                    <label for="subject">Subject</label>
                </div>

                <div className='marr'>
                    <input onChange={handleCheckboxChange} type='checkbox' name='celebrities'/>
                    <label for="celebrities"  className='text-lg'>Celebrities</label>
                </div>


            </div>

                <button className='mt-5 bg-blue-900 text-white w-64 h-16 text-xl' onClick={handleCreateRoomClick}>Create Room</button>

                <br />
                <button className='mt-5 bg-gray-900 text-white w-64 h-16 text-xl'>Cancel</button>
        </div>

      {showCard && (
               <div className="p fixed top-0 right-0 left-0 w-full h-full">
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

                                <input type='text' className='border-2 p-3 m-3' 
 placeholder={category}/>


                            </div>
                            ))}
                            </div>
                            <div className='flex justify-center mt-5'>
                             <button className='mt-5 bg-blue-900 text-white w-64 h-16 text-xl'>Submit response</button>

                            </div>
                   </div>


                </div>
                </div>
            )}

    </div>
  );
};

export default SelectCategoryPage