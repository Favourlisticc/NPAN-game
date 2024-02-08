import React, { useState } from 'react';
import './App.css';

function App() {
  const letters = Array.from({ length: 26 }, (_, index) => String.fromCharCode(65 + index));
  const [selectedLetter, setSelectedLetter] = useState(null);

  const handleLetterClick = (letter) => {
    setSelectedLetter(letter);
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Place</th>
            <th>Animal</th>
            <th>Thing</th>
            <th className='ml-10 bg-white'>00:00</th>
          </tr>
        </thead>
        <tbody>
          {letters.map(letter => (
            <tr key={letter}>
              <td onClick={() => handleLetterClick(letter)}>{letter}</td>
              <td className={selectedLetter !== letter ? 'disabled' : ''} contentEditable={selectedLetter === letter}></td>
              <td className={selectedLetter !== letter ? 'disabled' : ''} contentEditable={selectedLetter === letter}></td>
              <td className={selectedLetter !== letter ? 'disabled' : ''} contentEditable={selectedLetter === letter}></td>
              <td className={selectedLetter !== letter ? 'disabled' : ''} contentEditable={selectedLetter === letter}></td>
              <td className={selectedLetter !== letter ? 'disabled' : ''} contentEditable={selectedLetter === letter}>
                <button className='bg-black text-white ml-2 px-5 py-1 rounded-md' >Submit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
