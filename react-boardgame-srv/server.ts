import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { Room } from './types';

const app = express();
app.use((err:any, req:any, res:any, next:any) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

const rooms: Room[] = []; // 部屋の配列

io.on('connection', (socket) => {
  console.log('ooo   connected:  ', socket.id);
  // 接続時にsocketIdを返却
  socket.emit('init', socket.id);
  // 接続時に部屋一覧を返す
  socket.emit('updateRoomList', rooms);

  // 部屋作成
  socket.on('createRoom', (roomId: string, playerName: string) => {
    try {
      console.log(`-----------------------------------`)
      console.log(`■createRoom roomId: ${roomId} playerName: ${playerName}`)
      // 部屋重複チェック
      if (rooms.find(room => room.id === roomId)) {
        console.log('部屋名が重複しています。');
        sendError('部屋名が重複しています。')
        return
      }
      // // 部屋作成済みチェック
      // for (const room of rooms) {
      //   if (room.players.find(player => player.id === socket.id)) {
      //     console.log('既に部屋を作成しています。');
      //     socket.emit('errorMessage', 'あなたはすでに部屋を作成しています。');
      //     return
      //   }
      // }
      // 新規部屋作成
      const newRoom: Room = { 
        ownerSoketid: socket.id,
        id: roomId,
        players: [{id: socket.id, name: playerName}]
      };
      rooms.push(newRoom);
      io.emit('updateRoomList', rooms, socket.id);
      console.log(`Room ${roomId} created.`);
    } catch (error) {
      console.error(`Error closing room ${roomId}:`, error)
      socket.emit('errorMessage', error);
    }
  });

  // 部屋に参加
  interface joinRoomParam {
    roomId: string;
    playerName: string
  }
  socket.on('joinRoom', ({ roomId, playerName }: joinRoomParam) => {
    try {
      console.log(`-----------------------------------`)
      console.log(`■■■■■■joinRoom roomId: ${roomId} playerName: ${playerName}`)
      const room = rooms.find(r => r.id === roomId);

      // 参加済みであればなんもしない
      if (room?.players.find(player => player.id === socket.id)) {
        sendError('部屋に参加済みです')
        return
      }
      if (room) {
        room.players.push({ id: socket.id, name: playerName });
        socket.join(roomId);
        
        // プレイヤー名の配列を送信
        io.to(roomId).emit('updatePlayers', room.players.map(p => p.name)); 
        io.emit('updateRoomList', rooms, null); // 部屋の人数のみを送信
        
        console.log(`User ${playerName} joined room ${roomId}.`);
      }
      } catch (error) {
        console.error(`Error closing room ${roomId}:`, error)
        socket.emit('errorMessage', error);
      }
  });

  // 退出処理
  socket.on('exitRoom', (roomId: string) => {
    console.log(`■■■■■■exit room roomId: ${roomId}`);
    try {
      console.log('★処理前')
      console.log(JSON.stringify(rooms))
      const index = rooms.findIndex(room => room.id === roomId)
      const playerIndex = rooms[index].players.findIndex(player => player.id === socket.id)
      rooms[index].players.splice(playerIndex, 1)
      console.log('★処理後')
      console.log(JSON.stringify(rooms))
      io.emit('updateRoomList', rooms, null); // 部屋の人数のみを送信
    } catch(error) {
      console.error('Error exit room');
      socket.emit('errorMessage', error);
    }
  })

  // 部屋を閉じる処理
  socket.on('closeRoom', (roomId: string) => {
    console.log(`■■■■■■close room roomId: ${roomId}`);
    try {
      console.log('★処理前')
      console.log(JSON.stringify(rooms))
      const index = rooms.findIndex(room => room.id === roomId)
      rooms.splice(index, 1)
      console.log('★処理後')
      console.log(JSON.stringify(rooms))
      io.emit('updateRoomList', rooms, null); // 部屋の人数のみを送信
    } catch(error) {
      console.error('Error close room');
      socket.emit('errorMessage', error);
    }
  })

  // 切断時の処理
  socket.on('disconnect', () => {
    rooms.forEach(room => {
      const index = room.players.findIndex(player => player.id === socket.id);
      if (index !== -1) {
        const playerName = room.players[index].name;
        room.players.splice(index, 1);
        io.to(room.id).emit('updatePlayers', room.players);
        console.log(`User ${playerName} disconnected from room ${room.id}.`);
      }
    });
    console.log('  xxx  user disconnected: ',socket.id);
  });
  function sendError(message: string) {
    socket.emit('errorMessage', message);
  }
});


server.listen(3001, () => {
  console.log('listening on *:3001');
});
