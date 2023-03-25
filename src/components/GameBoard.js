import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import NeonButton from './NeonButton';
import { getGame, updateGame } from '../utils/api';
import { calculateWinner } from '../utils/gameLogic';

const GameBoard = () => {
  const { gameId } = useParams();
  const history = useHistory();
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(null);

  const handleClick = (i) => {
    if (winner || squares[i]) {
      return;
    }

    const squaresCopy = [...squares];
    squaresCopy[i] = xIsNext ? 'X' : 'O';

    setSquares(squaresCopy);
    setXIsNext(!xIsNext);

    const newWinner = calculateWinner(squaresCopy);
    if (newWinner) {
      setWinner(newWinner);
      updateGame(gameId, squaresCopy, xIsNext, newWinner)
        .catch((error) => setError(error));
    } else {
      updateGame(gameId, squaresCopy, xIsNext)
        .catch((error) => setError(error));
    }
  };

  React.useEffect(() => {
    const fetchGame = async () => {
      try {
        const game = await getGame(gameId);
        setSquares(game.squares);
        setXIsNext(game.xIsNext);
        setWinner(game.winner);
        setIsFetching(false);
      } catch (error) {
        setError(error);
        setIsFetching(false);
      }
    };

    fetchGame();
  }, [gameId]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (!gameId) {
    history.push('/');
  }

  const renderSquare = (i) => {
    const isWinningSquare = winner && winner.line.includes(i);
    const squareClassNames = `square ${isWinningSquare ? 'winning-square' : ''}`;
    return (
      <button className={squareClassNames} onClick={() => handleClick(i)}>
        {squares[i]}
      </button>
    );
  };

  const renderStatus = () => {
    if (winner) {
      return `Winner: ${winner.player}`;
    } else if (squares.every((square) => square !== null)) {
      return 'Draw';
    } else {
      return `Next player: ${xIsNext ? 'X' : 'O'}`;
    }
  };

  return (
    <div className="game-board">
      <div className="status">{renderStatus()}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <NeonButton onClick={() => history.push('/')}>Back to Home</NeonButton>
    </div>
  );
};

export default GameBoard;
