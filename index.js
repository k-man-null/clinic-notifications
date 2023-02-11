const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const { PubSub } = require('@google-cloud/pubsub');

const pubsub = new PubSub();

const subscription =  pubsub.createSubscription("appointment-subscription")

subscription.on('message', message => {
  console.log('Received message:', message.data.toString());
  process.exit(0);
});


subscription.on('error', error => {
  console.error('Received error:', error);
  process.exit(1);
});



app.get('/', (req, res) => {
  res.status(200).send("I am  here");
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

server.listen(8000, () => {
  console.log('listening on 8000');
});