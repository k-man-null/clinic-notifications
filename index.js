const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.status(200).send("I am  here");
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

server.listen(8000, () => {
  console.log('listening on *:3000');
});