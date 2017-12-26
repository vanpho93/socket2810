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

io.on('connection', socket => {
    console.log(socket.id);
});
