const io = require('socket.io')();

io.on('connection', socket => {
    socket.broadcast.emit('user connected');
    socket.on('new-msg', data => {
        console.log(data);
        io.emit('send-notification', {name: 'notification'});
    });
});



module.exports = io;