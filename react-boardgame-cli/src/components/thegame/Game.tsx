import React, { useEffect, useState } from 'react';
import socket from '../../socket/socket';
import { toast } from 'react-toastify';
import { Room } from './types';

const Game: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [roomId, setRoomId] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [socketId, setSocketId] = useState('');

  useEffect(() => {
    socket.on('init', (socketId) => {
      console.log(`socketId ${socketId}`);
      setSocketId(socketId);
    })
    // サーバーに接続した際に部屋一覧を受け取る
    socket.on('updateRoomList', (updatedRooms) => {
      console.log('updateRoomlist:', JSON.stringify(updatedRooms, null, 2))
      setRooms(updatedRooms);
    });

    // サーバーからエラーメッセージを受け取る
    socket.on('errorMessage', (message) => {
      console.log('エラー発生：', message)
      toast.error(`エラー発生： ${JSON.stringify(message)}`);
    });
    return () => {
      socket.off('updateRoomList');
      socket.off('errorMessage');
    };

  }, []);

  const createRoom = () => {
    if (!roomId) {
      toast.error('plaease enter roomId')
    }
    if (!playerName) {
      toast.error('plaease enter playerName')
    }
    // ルーム作成済みかチェック
    if (rooms.find(room => room.ownerSoketid === socketId)) {
      console.log('you already create room!!')
      toast.error('you already create room!!')
      return
    }
    console.log('★createRoom:\n', JSON.stringify(rooms, null, 2))

    if (roomId && playerName) {
      socket.emit('createRoom', roomId, playerName);
      setRoomId('');
    }
  };

  const joinRoom = (roomId: string) => {
    if (playerName) {
      socket.emit('joinRoom', { roomId, playerName });
    } else {
      toast.error('Please enter your name before joining a room.');
    }
  };

  const exitRoom = (roomId: string) => {
    console.log(`■extiRoom: ${roomId}`);
    socket.emit('exitRoom', roomId);
  }

  const closeRoom = (roomId: string) => {
    console.log(`■extiRoom: ${roomId}`);
    socket.emit('closeRoom', roomId);
  }
  return (
    <div>
      <h1>Room List</h1>
      <input 
        type="text" 
        value={roomId} 
        onChange={(e) => setRoomId(e.target.value)} 
        placeholder="Enter room ID" 
      />
      <input 
        type="text" 
        value={playerName} 
        onChange={(e) => setPlayerName(e.target.value)} 
        placeholder="Enter your name" 
      />
      <button onClick={createRoom}>Create Room</button>
      <h3>Your SocketId: {socketId}</h3>
      <h2>Available Rooms:</h2>
      <ul>
        {rooms.map(room => (
          <li key={room.id}>
            {room.id} - Players: {room.players ? room.players.length : 0}
            <button onClick={() => joinRoom(room.id)}>Join</button>
            <button
              onClick={() => exitRoom(room.id)}
              disabled={!(room.ownerSoketid !== socketId && 
                (room.players.find(player => player.id === socketId) ? true : false))}
            >Exit</button>
            <button
              onClick={() => closeRoom(room.id)}
              disabled={room.ownerSoketid !== socketId}
            >Close</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Game;
