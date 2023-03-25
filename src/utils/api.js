const API_URL = 'https://my-tic-tac-toe-api.com';

export const createGame = async () => {
  const response = await fetch(`${API_URL}/game`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({}),
  });
  const data = await response.json();
  return data.gameId;
};

export const getGame = async (gameId) => {
  const response = await fetch(`${API_URL}/game/${gameId}`);
  const data = await response.json();
  return data;
};

export const updateGame = async (gameId, squares, xIsNext, winner = null) => {
  const response = await fetch(`${API_URL}/game/${gameId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ squares, xIsNext, winner }),
  });
  const data = await response.json();
  return data;
};
