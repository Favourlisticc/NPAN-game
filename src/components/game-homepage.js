import React, { useState } from 'react';
import '../App.css';
import { Link } from "react-router-dom";

function App() {
  const [userName, setUserName] = useState('');

  const handleInputChange = (event) => {
    setUserName(event.target.value);
  };

  return (
    <div className="table-container">
      <h1 className='text-center text-5xl mt-32 max-sm:text-4xl'>Enter your Name</h1>
      <div className='flex justify-center'>
        <input
          type='text'
          placeholder='Name'
          className='border-2 mt-6 h-12 px-2 w-52'
          value={userName}
          onChange={handleInputChange}
        />
      </div>

      <div className='text text-center mt-28'>
        <h1 className='te text-4xl mb-10'>Start Playing</h1>
        <div className='mb-10'>
          <Link to={`/create-game-page?name=${userName}`} className='bg-blue-300 text-2xl px-5 py-3 mb-52 rounded-sm text-white'>Create Room</Link>
        </div>
        <div>
          <Link to={`/join-friend?name=${userName}`} className='bg-blue-300 px-5 text-2xl py-3 mb-52 rounded-sm text-white'>Join a Friend</Link>
        </div>
      </div>
    </div>
  );
}

export default App;
