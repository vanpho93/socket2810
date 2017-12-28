const socket = io();

let receiverSocketId;

$('#divChat').hide();

$('#btnSignIn').click(() => {
    const username = $('#txtUsername').val();
    $('#txtUsername').val('');
    socket.emit('CLIENT_SIGN_IN', username);
});

$('#btnSend').click(() => {
    const message = $('#txtMessage').val();
    $('#txtMessage').val('');
    socket.emit('CLIENT_SEND_MESSAGE', message);
});

$('#btnSendPrivate').click(() => {
    if (!receiverSocketId) return alert('Choose a person to chat.');
    const message = $('#txtMessage').val();
    $('#txtMessage').val('');
    socket.emit('CLIENT_SEND_PRIVATE_MESSAGE', { message, receiverSocketId });
});

socket.on('SERVER_SEND_MESSAGE', message => {
    $('#ulMessages').append(`<li>${message}</li>`);
});

socket.on('REJECT_SIGN_IN', () => alert('Username duplicated'));

socket.on('ACCEPT_SIGN_IN', users => {
    $('#divChat').show();
    $('#divSignIn').hide();
    const ulUsers = $('#ulUsers');
    users.forEach(user => {
        ulUsers.append(`<li id="sid-${user.socketId}">${user.username}</li>`);
    });
    socket.on('NEW_USER', user => {
        ulUsers.append(`<li id="sid-${user.socketId}">${user.username}</li>`);
    });
});

socket.on('USER_LEAVE', socketId => {
    $(`#sid-${socketId}`).remove();
});

$('#ulUsers').on('click', 'li', function() {
    receiverSocketId = $(this).attr('id').substring(4);
    $('#ulUsers li').removeClass('active');
    $(this).addClass('active');
});
