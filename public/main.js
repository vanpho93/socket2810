const socket = io();
 
$('#divSignIn').hide();

$('#btnSend').click(() => {
    const message = $('#txtMessage').val();
    $('#txtMessage').val('');
    socket.emit('CLIENT_SEND_MESSAGE', message);
});

socket.on('SERVER_SEND_MESSAGE', message => {
    $('#ulMessages').append(`<li>${message}</li>`);
});
