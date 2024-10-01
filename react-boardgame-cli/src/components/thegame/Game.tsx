import React, { useState,  useEffect } from 'react';
import { toast } from 'react-toastify';
import socket from '../../socket/socket';

interface Move {
  player: string;
  position: number;
}
const Game: React.FC = () => {
  const [moves, setMoves] = useState<Move[]>([]);

  useEffect(() => {
    socket.on('move', (move: Move) => {
      setMoves((prevMoves) => [...prevMoves, move]);
    });

    return () => {
      socket.off('move');
    }
  }, []);

  const handleMove = (position: number) => {
    const move: Move = { player: 'Player1', position };
    socket.emit('move', move);
    setMoves((prevMoves) => [...prevMoves, move]);
  };

  return (
    <div>
      <h1>Game Board</h1>
      <div>
          {moves.map((move, index) => (
              <div key={index}>{`${move.player} moved to ${move.position}`}</div>
          ))}
      </div>
      <button onClick={() => handleMove(1)}>Move to Position 1</button>
      <button onClick={() => handleMove(2)}>Move to Position 2</button>
  </div>
  )
}
export default Game;