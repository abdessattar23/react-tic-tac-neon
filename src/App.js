import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import GameBoard from './components/GameBoard';
import NeonButton from './components/NeonButton';
import { createGame } from './utils/api';

const App = () => {
  const handleNewGame = async () => {
    const gameId = await createGame();
    window.location.href = `/game/${gameId}`;
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>My Tic-Tac-Toe Game</h1>
        <NeonButton onClick={handleNewGame}>New Game</NeonButton>
      </header>
      <Router>
        <Switch>
          <Route path="/game/:gameId">
            <GameBoard />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
