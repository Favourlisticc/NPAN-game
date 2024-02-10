import React, { useState } from 'react';
import '../App.css';
import { Link } from "react-router-dom";
import Navbar from './navbar';

function App() {
  const [userName, setUserName] = useState('');

  const handleInputChange = (event) => {
    setUserName(event.target.value);
  };

  return (
    <div>
      <Navbar />
       <div className="table-container">
      <h1 className='text-center text-5xl mt-20 max-sm:text-4xl'>NAPT</h1>
      <div className='mt-5'>
          <button className='bg-gray-300 font-medium w-52 rounded-md py-2 mb-4'>Play Online</button><br />
          <button className='bg-gray-300 font-medium w-52 rounded-md py-2 mb-4'>Play with a friend(s)</button><br />
          <button className='bg-gray-300 font-medium w-52 rounded-md py-2 mb-4'>Join a friend</button><br />
          <button className='bg-gray-300 font-medium w-52 rounded-md py-2 mb-4'>How to play</button>

      </div>

      <div>
      <div className="table-container mt-10">
    <table>
      <thead>
        <tr>
          <th></th>
          <th>Leader Board </th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>

           <tr>
              <td></td>
              <td></td>
              <td></td>
            </tr>

        {/* Add more rows as needed */}
      </tbody>
    </table>
  </div>
      </div>
    </div>
    </div>

  );
}

export default App;
