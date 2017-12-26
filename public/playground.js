/*
*/

// 1. Set su kien cho button
$('#btnAdd').click(() => {
    const str = $('h3').text();
    $('h3').text(str + '!');
    // console.log(text);
    // $('h3').append('!');
});

// $('#btnSend').click(() => {
    //     const message = $('#txtMessage').val();
    //     alert(message);
    //     $('#txtMessage').val('');
// });

$('#btnSend').click(() => {
    // 2. Lay gia tri cua input
    const message = $('#txtMessage').val();
    // 3. Set html cho cac DOM
    $('#ulMessages').append(`<li>${message}</li>`);
    // $('#ulMessages').html(`<li>${message}</li>`);
});

// $('#ulMessages li').click(function() {
//     $('#ulMessages li').removeClass('active');
//     $(this).addClass('active');
// });

$('#ulMessages').on('click', 'li', function() {
//  4. Gan class cho DOM
    $('#ulMessages li').removeClass('active');
    $(this).addClass('active');
});
