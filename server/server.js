const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server); //io now is a websockets server.


io.on('connection',(socket) => {
 console.log('New user connected');


  socket.emit('newMessage', {
    from:'John',
    text:'msg from server',
    createAt: 12 
  });


 socket.on('createMessage', (message) =>{
    console.log('Create msg from a user', message);
 });



 socket.on('createEmail', (newEmail) => {
    console.log('createEmail', newEmail);
 });

 socket.on('disconnect', ()=> {
    console.log('Client disconnected');
    });

});


app.use(express.static(publicPath));

server.listen(port, () => {
    console.log(`Server is runnning on port ${port}`);    
});