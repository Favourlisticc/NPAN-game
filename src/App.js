import React, { useState, useEffect } from 'react';
import './App.css';
import { Link } from "react-router-dom";


function App() {
  const letters = Array.from({ length: 26 }, (_, index) => String.fromCharCode(65 + index));
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [timer, setTimer] = useState(0);
  const [timerFinished, setTimerFinished] = useState(false);

  const handleLetterClick = (letter) => {
    setSelectedLetter(letter);
    setTimer(30);
    setTimerFinished(false);
  };

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    } else {
      setTimerFinished(true);
    }
    return () => clearInterval(interval);
  }, [timer]);

  return (
    <div className="table-container">
      {/* <table>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Place</th>
            <th>Animal</th>
            <th>Thing</th>
            <th className='ml-10 bg-white'>{timer > 0 ? `00:${timer.toString().padStart(2, '0')}` : '00:00'}</th>
          </tr>
        </thead>
        <tbody>
          {letters.map(letter => (
            <tr key={letter}>
              <td onClick={() => handleLetterClick(letter)} className='active:bg-yellow-600'>{letter}</td>
              <td className={selectedLetter !== letter || timerFinished ? 'disabled' : ''} contentEditable={selectedLetter === letter}></td>
              <td className={selectedLetter !== letter || timerFinished ? 'disabled' : ''} contentEditable={selectedLetter === letter}></td>
              <td className={selectedLetter !== letter || timerFinished ? 'disabled' : ''} contentEditable={selectedLetter === letter}></td>
              <td className={selectedLetter !== letter || timerFinished ? 'disabled' : ''} contentEditable={selectedLetter === letter}></td>
              <td className={selectedLetter !== letter || timerFinished ? 'disabled' : ''} contentEditable={selectedLetter === letter}>
                <button className='bg-black text-white ml-2 px-5 py-1 rounded-md' disabled={timerFinished}>Submit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}

      <h1 className='text-center text-5xl mt-32'>Enter your Name</h1>
      <div className='flex justify-center'>
        <input type='text'placeholder='Name' className='border-2 mt-6 h-8 px-2 w-52'/>
      </div>

      <div className='text text-center mt-28'>
          <h1 className='te text-4xl mb-10'>Start Playing</h1>

          <div className='mb-10'>
          <a href="/" className='bg-blue-300 px-5 py-3 mb-52 rounded-sm text-white'>Create Room</a>

          </div>

          <div>
          <a href="/" className='bg-blue-300 px-5 py-3 mb-52 rounded-sm text-white'>Join a Friend</a>

          </div>
      </div>

    </div>
  );
}

export default App;
