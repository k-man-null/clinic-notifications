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


function listenForMessages() {
  // References an existing subscription
  const subscription = pubsub.subscription(subscriptionName);

  // Create an event handler to handle messages
  
  const messageHandler = message => {
    console.log(`Received message ${message.id}:`);
    console.log(`\tData: ${message.data}`);
    console.log(`\tAttributes: ${message.attributes}`);
    messageCount += 1;

    // "Ack" (acknowledge receipt of) the message
    message.ack();
  };

  // Listen for new messages until timeout is hit
  subscription.on('message', messageHandler);

 
}

listenForMessages();

app.get('/', (req, res) => {
  res.status(200).send("I am  here");
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

server.listen(8000, () => {
  console.log('listening on 8000');
});