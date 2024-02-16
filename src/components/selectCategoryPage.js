import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const SelectCategoryPage = () => {
    const { name } = useParams(); // Destructure name from useParams()

    const [selectedCategories, setSelectedCategories] = useState([]);
    const [showCard, setShowCard] = useState(false);

    const [timer, setTimer] = useState(60); // Initial timer value in seconds
    const [timerId, setTimerId] = useState(null);

    const [randomLetter, setRandomLetter] = useState('');

    useEffect(() => {
        // Start the timer when the component mounts
        const id = setInterval(() => {
            setTimer((prevTimer) => prevTimer - 1);
        }, 1000);
        setTimerId(id);

        // Clean up timer on component unmount
        return () => clearInterval(id);
    }, []);

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
            setSelectedCategories((prevSelectedCategories) => prevSelectedCategories.filter((category) => category !== name));
        }
    };

    const handleCreateRoomClick = () => {
        setShowCard(true);
        setRandomLetter(generateRandomLetter());
    };

    const playhandleModalClose = () => {
        setShowCard(false);
      };

      c
  console.log('Selected Categories:', selectedCategories, name); // Log selected categories to see if they are being updated correctly

  return (
    <div className='mt-20'>
      <h2 className='text-3xl font-semi-bold'>Welcome, {name}!</h2>
      {/* Other content of the page */}
      <div className='mt-5 flex flex-wrap justify-center text-center items-center ml-96 mr-96 max-sm:ml-5 max-sm:mr-5 '>
          <div className='marr'>
          <input onChange={handleCheckboxChange} type='checkbox' name='categoryName'/>

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

      {showCard && (
               <div className="modal-wrapper w-full">
               <div className="w-full bg-white h-full">
              <span className="close" onClick={playhandleModalClose}>&times;</span>
              <div>Random Letter: {randomLetter}</div>

                    <h3>{name}</h3>
                    <div>Timer: {timer} seconds</div>

                        {selectedCategories.map((category, index) => (
                            <div key={index}>
                            <label>{category}:</label>
                            <input type='text' value="" placeholder={category}/>
                        </div>
                        ))}


                </div>
                </div>
            )}

    </div>
  );
};

export default SelectCategoryPage