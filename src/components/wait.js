import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';




const MultiplayerEnterName = () => {

    const { link } = useParams();
    const [players, setPlayers] = useState([]);
    const [username, setUsername] = useState('');

    useEffect(() => {
        // Fetch players using the unique link
        const fetchPlayers = async () => {
            try {
                const response = await axios.get(
                    // `http://localhost:3001/api/players/${link}`
                    `https://napn-game-api.onrender.com/api/players/${link}`
                    );
                setPlayers(response.data.players);
                setUsername(response.data.username);
            } catch (error) {
                console.error('Error fetching players:', error);
            }
        };

        fetchPlayers();
    }, [link]);

    return (
        <div className='mt-20'>
            <div className='text-center'>
                <p>Your Game Code is:</p>
                <p className='text-red-500'>{link}</p>
                <p>Send it to your friends to start the game!</p>
                <p className='mt-10 text-2xl text-red-500'>Who's Playing?</p>
               <ul>
                    <li>{username}</li>
                    {players.map((player, index) => (
                        <li key={index}>{player}</li>
                    ))}
                </ul>
                <button className='mt-5 bg-gray-900 text-white w-64 h-16 text-xl'>Cancel</button>
            </div>
        </div>
    );
};

export default MultiplayerEnterName;
