import React from 'react';
import Game from './app/game';
import Topbar from './app/topbar';
import './App.css';

function App() {
  return (
    <div className="App">
      <Topbar />
      <Game />
    </div>
  );
}

export default App;
