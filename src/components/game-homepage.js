import React, { useState } from 'react';
import '../App.css';
import { Link } from "react-router-dom";
import Navbar from './navbar';

function App() {
  const [playuserName, playsetUserName] = useState('');
  const [playshowInputModal, playsetShowInputModal] = useState(false);
  const [playshowConfirmationCard, playsetShowConfirmationCard] = useState(false);

  const [joinuserName, joinsetUserName] = useState('');
  const [joinshowInputModal, joinsetShowInputModal] = useState(false);
  const [joinshowConfirmationCard, joinsetShowConfirmationCard] = useState(false);


  const playhandleInputChange = (event) => {
    playsetUserName(event.target.value);
  };

  const playhandlePlayOnlineClick = () => {
    playsetShowInputModal(true);
  };

  const playhandleModalClose = () => {
    playsetShowInputModal(false);
  };

  const playhandleContinueClick = () => {
    // Handle continue action here
    playsetShowInputModal(false);
    playsetShowConfirmationCard(true);
  };

  const playhandleModalconfirmation =()=>{
    playsetShowConfirmationCard(false);
  }

  const playhandleCopyLinkClick = () => {
    // Handle copy link action here
    // For example, you can use the Clipboard API to copy the link to the clipboard
    console.log('Link copied!');
  };


  const joinhandleInputChange = (event) => {
    joinsetUserName(event.target.value);
  };

  const joinhandlePlayOnlineClick = () => {
    joinsetShowInputModal(true);
  };

  const joinhandleModalClose = () => {
    joinsetShowInputModal(false);
  };

  const joinhandleContinueClick = () => {
    // Handle continue action here
    joinsetShowInputModal(false);
    joinsetShowConfirmationCard(true);
  };

  // const joinhandleModalconfirmation =()=>{
  //   joinsetShowConfirmationCard(false);
  // }

  const joinhandleCopyLinkClick = () => {
    // Handle copy link action here
    // For example, you can use the Clipboard API to copy the link to the clipboard
    console.log('Link copied!');
  };

  return (
    <div>
      <Navbar />
       <div className="table-container">
      <h1 className='text-center text-5xl mt-20 max-sm:text-4xl'>NAPT</h1>
      <div className='mt-5'>
          <button className='bg-gray-300 font-medium w-52 rounded-md py-2 mb-4 active:bg-gray-500 ' >Play Online</button><br />
          <button className='bg-gray-300 font-medium w-52 rounded-md py-2 mb-4 active:bg-gray-500 ' onClick={playhandlePlayOnlineClick}>Play with a friend(s)</button><br />
          <button className='bg-gray-300 font-medium w-52 rounded-md py-2 mb-4 active:bg-gray-500' onClick={joinhandlePlayOnlineClick}>Join a friend(s)</button><br />

          <button className='bg-gray-300 font-medium w-52 rounded-md py-2 mb-4 active:bg-gray-500'>How to play?</button><br />

      </div>

      {playshowInputModal && (
          <div className="modal-wrapper">
            <div className="modal">
              <span className="close" onClick={playhandleModalClose}>&times;</span>
              <h2>Enter Your Name</h2>
              <input
                type='text'
                placeholder='Name'
                className='border-2 mt-6 h-8 px-2 w-52 rounded'
                value={playuserName}
                onChange={playhandleInputChange}
              /><br/>
              <button onClick={playhandleContinueClick} className='mt-5 bg-black text-white w-52 h-8 rounded'>Continue</button>
            </div>
          </div>
        )}


        {/* Confirmation card */}
        {playshowConfirmationCard && (
          <div className="modal-wrapper">
           <div className="modal">
           <span className="close" onClick={playhandleModalconfirmation}>&times;</span>
            <h2 className='text-xl font-medium mb-7'>Hello, {playuserName}!</h2>
            <Link to={`/game?name=${playuserName}`} className='border-2 py-3 px-1 rounded text-sky-600 underline'>{window.location.origin}/game?name={playuserName}</Link><br/>
            <button className='mt-8 bg-black text-white w-72 h-10 rounded' onClick={playhandleCopyLinkClick}>Copy Link</button>
           </div>
          </div>
        )}

{/* joingame */}
        {joinshowInputModal && (
                  <div className="modal-wrapper">
                    <div className="modal">
                      <span className="close" onClick={joinhandleModalClose}>&times;</span>

                      <input
                        type='text'
                        placeholder='Name'
                        className='border-2 mt-6 h-8 px-2 w-52 rounded'
                        value={joinuserName}
                        onChange={joinhandleInputChange}
                      /><br/>

                      <input
                        type="url"
                        placeholder='Paste Link'
                        className='border-2 mt-2 h-8 px-2 w-52 rounded'
                        value={joinuserName}
                        onChange={joinhandleInputChange}
                      /><br/>
                      <button onClick={joinhandleContinueClick} className='mt-5 bg-black text-white w-52 h-8 rounded'>Continue</button>
                    </div>
                  </div>
                )}

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
