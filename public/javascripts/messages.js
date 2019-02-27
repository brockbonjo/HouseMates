const socket = io();

socket.on('send-notification', data => {
    console.log(data);
});
//instead you will display some message using js!
//for a few seconds !! 
let button = document.getElementById('submitbtn');

button.addEventListener('click', function(e) {
    socket.emit('new-msg', {
        message: 'the message has been sent'
    });
})