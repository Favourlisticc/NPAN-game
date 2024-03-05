import React from "react";
import Homepage from "./components/game-homepage"
import CreateGame from "./components/create-game-page"
import { Routes, Route } from "react-router-dom";
import "./App.css";
import SelectCategoryPage from "./components/selectCategoryPage";
import MainGamePage from "./components/maingame"
import MultiplayerEnterName from "./components/wait";
import Result from "./components/result";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />

        <Route path="/select-category/:name/:link" element={<SelectCategoryPage />} />

        <Route path="/game/:name/:link" element={<MainGamePage />} />

        <Route path="/wait/:link/:name" element={<MultiplayerEnterName />} />

        <Route path="/result" element={<Result/>} />




        {/* Add more routes as needed */}
      </Routes>
    </div>
  );
}

export default App;
