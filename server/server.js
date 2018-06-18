const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io'); 

const {generateMessage,generateLocationMessage} = require('./utils/message')
const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server); //io now is a websockets server.


io.on('connection',(socket) => {
 console.log('New user connected');
    socket.emit('newMessage',
    generateMessage('Admin','Welcome to Chat App'));

    socket.broadcast.emit('newMessage',
    generateMessage('Admin','New User Joined'));  



 socket.on('createMessage', (message, callback) =>{
    console.log('CreateMessage from a user', message);
    io.emit('newMessage',
    generateMessage(message.from ,message.text));
    callback('');
 });

 socket.on('createLocationMessage', (coords) =>{
     io.emit('newLocationMessage', 
     generateLocationMessage('Admin', coords.latitude,coords.longitude));

 }); 

 socket.on('disconnect', ()=> {
    console.log('Client disconnected');
    });

});


app.use(express.static(publicPath));

server.listen(port, () => {
    console.log(`Server is runnning on port ${port}`);    
});