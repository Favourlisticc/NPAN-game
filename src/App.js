import React from "react";
import Homepage from "./components/game-homepage"
import CreateGame from "./components/create-game-page"
import { Routes, Route } from "react-router-dom";
import "./App.css";
import SelectCategoryPage from "./components/selectCategoryPage";
import MainGamePage from "./components/maingame"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />

        <Route path="/select-category/:name/:link" element={<SelectCategoryPage />} />

        <Route path="/game/:name/:link" element={<MainGamePage />} />




        {/* Add more routes as needed */}
      </Routes>
    </div>
  );
}

export default App;
