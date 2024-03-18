import React from 'react';
import { useLocation } from 'react-router-dom';


function CreateGamePage() {
  const location = useLocation();
  const userName = new URLSearchParams(location.search).get('name');

  return (
    <div>
      <h1 className='text-4xl mt-16'>Hello, {userName}! Ready</h1>
      <div className='flex-col justify-center'>
          <button>Name</button>
          <button>Place</button>
          <button>Things</button>
          <button>Things</button>
          <button>Things</button>
          <button>Movies</button>
          <button className='diff'>Continue</button>



      </div>

    </div>
  );
}

export default CreateGamePage;
