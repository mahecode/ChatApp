const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

const port = process.env.PORT || 3000;
//app init
const app = express();
var server = http.createServer(app);
var io = socketIO(server);
//static folder
app.use(express.static(path.join(__dirname, '../public')));

//server connection using io
io.on('connection', (socket)=>{
  console.log('New user Connected');

  socket.on('createMessage',(message)=>{
    console.log("New message:",message);
    io.emit('newMessage',{
      from: message.from,
      message: message.message,
      createdAt: new Date().getTime()
    });
  });
  socket.on('disconnect', () =>{
    console.log('User Disconnected');
  })
})

//listen to port
server.listen(port, () =>{
  console.log(`Server started at ${port}`);
})
