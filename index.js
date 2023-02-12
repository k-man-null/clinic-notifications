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

app.get('/loaderio-fe5eb697f4aec4c31ea57440ad085d40' , (req,res) => {
  res.status(200).send("loaderio-fe5eb697f4aec4c31ea57440ad085d40");
})

io.on('connection', (socket) => {
  console.log('a user connected');

  

  socket.on('client to server event', () => {
    console.log('client to server event');

    io.emit('server to client event');

  });

});

server.listen(8000, () => {
  console.log('listening on 8000');
});