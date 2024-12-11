const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);

let cilent_user =  0;

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
    cilent_user ++;
    console.log( cilent_user , 'user connected');
    // socket.on('hello', (arg) => {
    //     console.log(arg); // 'world'
    // });
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
    socket.on('disconnect', () => {
        cilent_user --;
        console.log(cilent_user , 'user disconnect');
    });
});

server.listen(3000, () => {
    console.log('server running at http://localhost:3000');
});