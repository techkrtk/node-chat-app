const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io'); 

const {generateMessage} = require('./utils/message')
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



 socket.on('createMessage', (message) =>{
    console.log('CreateMessage from a user', message);
    io.emit('newMessage',
    generateMessage(message.from ,message.text));

    /* socket.broadcast.emit('newMessage',{
        from: message.from,
        text: message.text,
        createdAt : new Date().getTime()
    }); */
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