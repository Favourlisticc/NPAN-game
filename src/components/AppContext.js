// AppContext.js
import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [players, setPlayers] = useState([]);
  const [username, setUsername] = useState('');
  const [isCreator, setIsCreator] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  return (
    <AppContext.Provider value={{ players, setPlayers, username, setUsername, isCreator, setIsCreator, gameStarted, setGameStarted }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
