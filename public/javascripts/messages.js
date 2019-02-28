const socket = io();

let button = document.getElementById('submitbtn');
let notification = document.getElementById('notification');
let bigger = document.getElementsByTagName('i')[0];


socket.on('send-notification', data => {
    makeVisible(notification);
});
//instead you will display some message using js!
//for a few seconds !! 

button.addEventListener('click', function(e) {
    socket.emit('new-msg', {
        message: 'the message has been sent'
    });
})
function makeVisible(el) {
    el.style.visibility = 'visible';
    setTimeout(() => {
        el.style.visibility = 'hidden';
    }, 4000);
}

bigger.addEventListener('click', function(evt) {
    document.getElementsByClassName('content-bottom')[0].firstElementChild.classList.add('full');
    bigger.style.display = 'none';
});