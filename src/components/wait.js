import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';


let ws;

const MultiplayerEnterName = () => {
    const navigate = useNavigate();
    const { link, name } = useParams();
    const [players, setPlayers] = useState([]);
    const [username, setUsername] = useState('');
    const [isCreatorr, setIsCreatorr] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);
    const [showJoinButtonForOthers, setShowJoinButtonForOthers] = useState(false);

    const handleStartGame = () => {
        setGameStarted(true);
        setShowJoinButtonForOthers(true);
        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({ type: 'game_started' }));
        }
        navigate(`/game/${name}/${link}`);

        if (!isCreatorr ) {

            console.log("done")
        }

    };

    const handleJoinGame = () => {
        navigate(`/game/${name}/${link}`);
    };

    const handleWebSocketMessage = (message) => {
        if (typeof message.data === 'string') {
          const data = JSON.parse(message.data);
          if (data.type === 'show_join_button') {
            setShowJoinButtonForOthers(true);
            console.log('Join button should be shown now');
          }
        }
      };

    // Function to establish WebSocket connection
    // Function to establish WebSocket connection
const connectWebSocket = useCallback(() => {
    ws = new WebSocket('ws:napn-game-api.onrender.com:5000');

    ws.onopen = () => {
        console.log('Connected to signaling server');
    };

    ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        setTimeout(connectWebSocket, 2000); // Retry after 2 seconds
    };

    ws.onmessage = function(event) {
        console.log(event);

        const data = JSON.parse(event.data);

        // if (typeof message.data === 'string') {
            // Handle JSON messages

            if (data.type === 'game_started') {
                setShowJoinButtonForOthers(true);
                console.log('Join button should be shown now');
            }
            console.log('Received JSON message from signaling server:', data);
        // } else if (message.data instanceof ArrayBuffer) {
        //     // Handle ArrayBuffer messages
        //     const reader = new FileReader();
        //     reader.onload = () => {
        //         const bufferText = reader.result;
        //         const bufferJson = JSON.parse(bufferText);
        //         // Here you can handle the bufferJson data and update your state accordingly
        //         console.log('Received ArrayBuffer message from signaling server:', bufferJson);
        //     };
            // reader.readAsText(message.data);
        // }

        handleWebSocketMessage(event);
    };

    ws.onclose = (event) => {
        console.log('WebSocket connection closed:', event);
        setTimeout(connectWebSocket, 2000);
    };
}, []);


    useEffect(() => {
        connectWebSocket();

        // ws.onmessage = handleWebSocketMessage; // Add event listener

        return () => {
            if (ws) {
                ws.close();
            }
        };
    }, [connectWebSocket]);

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const response = await axios.get(`https://napn-game-api.onrender.com/api/players/${link}`);
                setPlayers(response.data.players);
                setUsername(response.data.username);
                setIsCreatorr(response.data.username === name);
                setGameStarted(response.data.gameStarted);
            } catch (error) {
                console.error('Error fetching players:', error);
            }
        };

        fetchPlayers();
    }, [link, name]);

    // Function to handle incoming WebSocket messages





    return (
        <div className='mt-20'>
            <div className='text-center'>
                <p>Your Game Code is:</p>
                <p className='text-red-500'>{link}</p>
                <p>Send it to your friends to start the game!</p>
                <p className='mt-10 text-2xl text-red-500'>Who's Playing?</p>
                <ul>
                    <li className='flex justify-center ml-20'>{username} <p className='ml-5 underline'> is the creator</p></li>
                    {players.map((player, index) => (
                        <li key={index}>{player}</li>
                    ))}
                </ul>

                {/* Conditionally render the Start Game button for the creator */}
                {isCreatorr && !gameStarted && (
                    <div className=''>
                        <button onClick={handleStartGame} className='mt-5 bg-green-500 text-white w-64 h-16 text-xl'>
                            Start Game
                        </button>
                        <br />
                    </div>
                )}

                {/* Conditionally render the Join Game button for other players */}
                {/* Conditionally render the Join Game button */}
  {showJoinButtonForOthers && !isCreatorr && ( /* Add !gameStarted condition */
    <button onClick={handleJoinGame} className='mt-5 bg-blue-500 text-white w-64 h-16 text-xl'>
      Join Game
    </button>
  )}

                <button className='mt-5 bg-gray-900 text-white w-64 h-16 text-xl'>Cancel</button>
            </div>
        </div>
    );
};

export default MultiplayerEnterName;