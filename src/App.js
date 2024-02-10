import React from "react";
import Homepage from "./components/game-homepage"
import CreateGame from "./components/create-game-page"
import { Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/create-game-page" element={<CreateGame />} />
        {/* Add more routes as needed */}
      </Routes>
    </div>
  );
}

export default App;
