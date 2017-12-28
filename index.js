const express = require('express');
const reload = require('reload');

const app = express();

server = require('http').Server(app);
const io = require('socket.io')(server);

reload(app);

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('*', (req, res) => res.redirect('/'));

server.listen(3000, () => console.log('Server started!'));

const users = [];
io.on('connection', socket => {
    let name = '';
    socket.on('CLIENT_SIGN_IN', username => {
        const isExisted = users.some(u => u.username === username);
        if (isExisted) return socket.emit('REJECT_SIGN_IN');
        const user = new User(username, socket.id);
        users.push(user);
        socket.emit('ACCEPT_SIGN_IN', users);
        socket.broadcast.emit('NEW_USER', user);
        name = username;
    });

    socket.on('CLIENT_SEND_MESSAGE', message => {
        io.emit('SERVER_SEND_MESSAGE', `${name}: ${message}`);
    });

    socket.on('CLIENT_SEND_PRIVATE_MESSAGE', obj => {
        const { message, receiverSocketId } = obj;
        socket
        .to(receiverSocketId)
        .emit('SERVER_SEND_MESSAGE', `${name}: ${message}`);
        socket.emit('SERVER_SEND_MESSAGE', `${name}: ${message}`);
    });

    socket.on('disconnect', () => {
        const userIndex = users.findIndex(u => u.socketId === socket.id);
        if (userIndex === -1) return;
        users.splice(userIndex, 1);
        io.emit('USER_LEAVE', socket.id);
    });
});

class User {
    constructor(username, socketId) {
        this.username = username;
        this.socketId = socketId;
    }
}
