const io = require('socket.io')();

io.on('connection', socket => {
    socket.on('new-msg', data => {
        // io.emit('sends-notification', {name: 'notification'});
        socket.broadcast.emit('send-notification', {name: 'notification'});
    });
});



module.exports = io;