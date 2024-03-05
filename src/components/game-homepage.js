import React, { useState, useEffect } from 'react';
import '../App.css';
import { Link, useNavigate } from "react-router-dom";
import Navbar from './navbar';

import axios from 'axios';


function App() {

  const [username, setUsername] = useState('');

  const [playshowInputModal, playsetShowInputModal] = useState(false);
  const [playshowConfirmationCard, playsetShowConfirmationCard] = useState(false);
  const [uniqueLink, setUniqueLink] = useState('');

  const [joinuserName, joinsetUserName] = useState('');
  const [joinshowInputModal, joinsetShowInputModal] = useState(false);
  const [joinshowConfirmationCard, joinsetShowConfirmationCard] = useState(false);
  const [copyButtonText, setCopyButtonText] = useState('Copy Link');

  const [joinLink, setJoinLink] = useState('');

  const navigate = useNavigate();

  const [link, setLink] = useState('');
  const [userName, setUserName] = useState('');


  useEffect(() => {
    if (copyButtonText === 'Link copied') {
      const timeout = setTimeout(() => {
        setCopyButtonText('Copy Link');
      }, 3000); // Change back to 'Copy Link' after 3 seconds
      return () => clearTimeout(timeout);
    }
  }, [copyButtonText]);

  const handleStartGame = async (userName) => {
    try {
      const response = await fetch(
        // 'http://localhost:3001/api/store-user-name',
        'https://napn-game-api.onrender.com/api/store-user-name',
        {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName }),
      });

      if (response.ok) {
        const data = await response.json(); // Parse the response JSON
      console.log(data); // Log the response data
      setUsername(data.userName); // Set the username
      setUniqueLink(data.uniqueLink); // Set the unique link
      playsetShowConfirmationCard(true); // Show the confirmation card
      } else {
        console.error('Failed to store the username');
      }
    } catch (error) {
      console.error('Error storing the username:', error);
    }
  };

  const handleJoinGame = async () => {
    try {
      // Send a POST request to the backend with the name and link in the request body
      const response = await axios.post(
        // 'http://localhost:3001/api/check-link-and-save-name',
        'https://napn-game-api.onrender.com/api/check-link-and-save-name',
        { name: joinuserName, link: joinLink });
      if (response.data.available) {
        // If the link is available, navigate the user to the wait page
        navigate(`/wait/${joinLink}/${joinuserName}`);
      } else {
        // If the link is not available, show an error message
        alert('The link is not available. Please try again.');
      }
    } catch (error) {
      console.log('Error checking link availability and saving name:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  const handleCopyLinkClick = () => {
    navigator.clipboard.writeText(uniqueLink)
      .then(() => {
        setCopyButtonText('Link copied');
      })
      .catch((error) => {
        console.error('Error copying link:', error);
      });
  };










  const [openHowtoPlay, setOpenHowtoPlay] = useState(false);



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
    handleStartGame(username);

  };

  const playhandleModalconfirmation =()=>{
    playsetShowConfirmationCard(false);
  }

  const playhandleCopyLinkClick = () => {
    handleCopyLinkClick();
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
    alert('Link copied!!!!')
  };


  const hanglesetOpenHowtoPlay = () => {
    setOpenHowtoPlay(true);
  };

  const handleclosesetOpenHowtoPlay = () => {
    setOpenHowtoPlay(false);
  };

  return (
    <div>
      <Navbar />
       <div className="table-container">
      <h1 className='text-center text-5xl mt-20 max-sm:text-4xl'>NAPT</h1>
      <div className='mt-5 text-center'>
          <button className='bg-gray-300 font-medium w-52 rounded-md py-2 mb-4 active:bg-gray-500 ' >Play Online</button><br />
          <button className='bg-gray-300 font-medium w-52 rounded-md py-2 mb-4 active:bg-gray-500 ' onClick={playhandlePlayOnlineClick}>Play with a friend(s)</button><br />
          <button className='bg-gray-300 font-medium w-52 rounded-md py-2 mb-4 active:bg-gray-500' onClick={joinhandlePlayOnlineClick}>Join a friend(s)</button><br />

          <button className='bg-gray-300 font-medium w-52 rounded-md py-2 mb-4 active:bg-gray-500' onClick={hanglesetOpenHowtoPlay}>How to play?</button><br />

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
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
            <h2 className='text-xl font-medium mb-7'>Hello, {username}!</h2>

            <div className='border-2 rounded flex justify-center h-10 pt-2.5 '>
                <Link to={`/game?name=${username}&link=${uniqueLink}`} className='text-xs  text-sky-600 underline'>{uniqueLink}</Link><br />
            </div>

            <button className='mt-8 bg-black text-white w-72 h-10 rounded' onClick={playhandleCopyLinkClick}>{copyButtonText}</button><br/>
            <button className='mt-3 bg-black text-white w-72 h-10 rounded'>
              <Link to={`/select-category/${username}/${uniqueLink}`}>Start Game</Link>
            </button>

           </div>
          </div>
        )}

{/* joingame */}
{joinshowInputModal && (
        <div className="modal-wrapper">
          <div className="modal max-sm:w-80">
            <span className="close" onClick={joinhandleModalClose}>&times;</span>
            <div>
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
                value={joinLink}
                onChange={(e) => setJoinLink(e.target.value)}
              /><br/>
            </div>
            <button onClick={handleJoinGame} className='mt-5 bg-black text-white w-52 h-8 rounded'>Continue</button>
          </div>
        </div>
      )}

        {openHowtoPlay && (
                          <div className="modal-wrapper" >
                            <div className="bg-gray-200 w-full h-full pb-10" style={{ overflowY: "auto" }}>
                              <span className="text-3xl float-right" onClick={handleclosesetOpenHowtoPlay}>&times;</span>

                              <h1 className='mt-12 flex text-blue-900 text-4xl pl-10'>How To Play</h1>

                              <p className='font-bold text-left pl-10 pr-10 leading-10'>The game is simple. The game creator chooses the word categories.
The game is played over a couple of rounds. At the beginning of every round, players get a new alphabet. Your job is to think of words that begin with that letter and fit the categories in the game.
Each game round is timed at 60 seconds, but the game also end as soon as the first person submits their response. Think fast!</p>

                              <h1 className='mt-12 flex text-blue-900 text-4xl pl-10 max-sm:pl-6'>Creating A Game and Game Setup</h1>

                              <p className='font-bold text-left pl-10 pr-10 leading-10'>Head on over to the "Create New Game" section on the previous page to create a new game.
You can also define "scoring mechanics". Select "Score Yourself" if you want people to score themselves, or select "Score Each Other" to score your friends.
Once you have created the game, you will get a "Game Code". Create the room and send the Game Code to your friends who will be able to use it join the room. Once your friends have joined, the creator will be able to start the game!</p>

                              <h1 className='flex mt-12 text-blue-900 text-4xl pl-10'>Scoring Rules</h1>
                              <p className='flex  font-bold text-left pl-10 pr-10 mt-5'>Scoring Rules are simple:</p>
                              <ol className='flex-col text-left  font-bold pl-10 pr-10 mt-5 leading-7'>
                                <li>+10 points for each unique correct answers</li>
                                <li>+5 points for each non-unique correct answer</li>
                                <li>+0 points for no answer and uncorrect spellings</li>
                              </ol>

                              <button onClick={handleclosesetOpenHowtoPlay} className='mt-5 bg-blue-900 text-white w-64 h-16 text-xl'>Now i understand, Let go</button>
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
