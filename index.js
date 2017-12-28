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
    socket.on('CLIENT_SIGN_IN', username => {
        const isExisted = users.some(u => u.username === username);
        if (isExisted) return socket.emit('REJECT_SIGN_IN');
        const user = new User(username, socket.id);
        users.push(user);
        socket.emit('ACCEPT_SIGN_IN');
    });

    socket.on('CLIENT_SEND_MESSAGE', message => {
        console.log(message);
        io.emit('SERVER_SEND_MESSAGE', message);
    });
});

class User {
    constructor(username, socketId) {
        this.username = username;
        this.socketId = socketId;
    }
}
