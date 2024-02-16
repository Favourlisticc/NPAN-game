import React from "react";
import Homepage from "./components/game-homepage"
import CreateGame from "./components/create-game-page"
import { Routes, Route } from "react-router-dom";
import "./App.css";
import SelectCategoryPage from "./components/selectCategoryPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/create-game-page" element={<CreateGame />} />
        <Route path="/select-category/:name" element={<SelectCategoryPage />} />
        {/* Add more routes as needed */}
      </Routes>
    </div>
  );
}

export default App;
