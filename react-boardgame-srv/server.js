const express = require('express');
const http = require('http');
const { Server } = require('socket.io')

const app = express();

// ルートエンドポイントを追加
app.get('/', (req, res) => {
  res.send('Server is running');
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // フロントエンドのURLを指定
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  }
});

io.on('connection', (socket) => {
  console.log('a server connected');

  socket.on('move', (data) => {
    socket.broadcast.emit('move', data);
  });

  socket.on('dissconect', () => {
    console.log('user disconnected');
  });
});




server.listen(3001, () => {
  console.log('listening on *:3001');
});

