const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const { PubSub } = require('@google-cloud/pubsub');

const pubsub = new PubSub({
  projectId: 'zendeta',
  keyFilename: './keyfile.json'
});


const subscriptionName = 'appointment-subscription';
const subscription = pubsub.subscription(subscriptionName);

const messageHandler = message => {
  console.log(`Received message: ${message.id}:`);
  console.log(`\tData: ${message.data}`);
  console.log(`\tAttributes: ${message.attributes}`);

  // Acknowledge the message
  message.ack();
};

subscription.on('message', messageHandler);

app.get('/', (req, res) => {
  res.status(200).send("I am  here");
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

server.listen(8000, () => {
  console.log('listening on 8000');
});