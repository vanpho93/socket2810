const socket = io();
 
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

socket.on('SERVER_SEND_MESSAGE', message => {
    $('#ulMessages').append(`<li>${message}</li>`);
});

socket.on('REJECT_SIGN_IN', () => alert('Username duplicated'));
socket.on('ACCEPT_SIGN_IN', () => {
    $('#divChat').show();
    $('#divSignIn').hide();
});
