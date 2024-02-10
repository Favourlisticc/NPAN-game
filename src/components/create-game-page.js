import React from 'react';
import { useLocation } from 'react-router-dom';

function CreateGamePage() {
  const location = useLocation();
  const userName = new URLSearchParams(location.search).get('name');

  return (
    <div>
      <h1>Welcome, {userName}!</h1>
      {/* Other content of the create game page */}
    </div>
  );
}

export default CreateGamePage;
