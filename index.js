const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const cors = require('cors')
const io = new Server(server, {
  cors: true
});

app.use(express.json())


//below code is for pull subscription
// // const { PubSub } = require('@google-cloud/pubsub');

// // const pubsub = new PubSub({
// //   projectId: 'zendeta',
// //   keyFilename: './keyfile.json'
// // });


// // const subscriptionName = 'appointment-subscription';


// // function listenForMessages() {
// //   // References an existing subscription
// //   const subscription = pubsub.subscription(subscriptionName);

// //   // Create an event handler to handle messages

// //   const messageHandler = message => {
// //     console.log(`Received message ${message.id}:`);
// //     console.log(`\tData: ${message.data}`);
// //     console.log(`\tAttributes: ${message.attributes}`);


// //     // "Ack" (acknowledge receipt of) the message
// //     message.ack();
// //   };

// //   // Listen for new messages until timeout is hit
// //   subscription.on('message', messageHandler);


// // }

// // listenForMessages();

//push subscription

app.post('/pub-sub-messages', (req, res) => {
  if (!req.body) {
    const msg = 'no Pub/Sub message received';
    console.error(`error: ${msg}`);
    res.status(400).send(`Bad Request: ${msg}`);
    return;
  }
  if (!req.body.message) {
    const msg = 'invalid Pub/Sub message format';
    console.error(`error: ${msg}`);
    res.status(400).send(`Bad Request: ${msg}`);
    return;
  }

  const pubSubMessage = req.body.message;
  const name = pubSubMessage.data
    ? Buffer.from(pubSubMessage.data, 'base64').toString().trim()
    : 'World';


  console.log(pubSubMessage);
  res.status(204).send();
});

app.get('/', (req, res) => {
  res.status(200).send("I am  here");
});

io.on('connection', (socket) => {
  console.log('a user connected');

  const numClients = Object.keys(io.sockets.connected).length;

  socket.on('client to server event', () => {
    console.log('client to server event');

    io.emit('server to client event', numClients);

  });

});

server.listen(8000, () => {
  console.log('listening on 8000');
});