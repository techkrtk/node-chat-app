var socket = io();

    socket.on('connect',function ()  {
               console.log('Connected to server');
     
        socket.emit('createMessage', {
            to:'karclient@abc.com',
            text:'msg from broswer',
        });
      
    });

    socket.on('disconnect',function ()  {
               console.log('Connection disconnected from server');
    });
    
      
    socket.on('newMessage', function (message) {
        console.log('newMessage', message);
    });