const app = require('express')();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, {cors: {origins: ['*']}});

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);
    socket.broadcast.emit('msg', {user: socket.id, text: 'ha entrado en el chat!'});

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
        socket.broadcast.emit('msg', {user: socket.id, text: 'ha salido del chat.'});
    });

    socket.on('msg', (message) => {
        console.log('Message received:', message);
        io.emit('msg', message);
    })
});

httpServer.listen(3001);