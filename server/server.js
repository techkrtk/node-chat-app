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
    socket.emit('newMessage',{
        from: 'Admin',
        text: 'Welcome to Chat App',
        createdAt : new Date().getTime()
    });

    socket.broadcast.emit('newMessage',{
        from: 'Admin',
        text: 'New User Joined',
        createdAt : new Date().getTime()
    }); 



 socket.on('createMessage', (message) =>{
    console.log('CreateMessage from a user', message);
    io.emit('newMessage',{
        from: message.from,
        text: message.text,
        createdAt : new Date().getTime()
    });

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