var socket = io();
socket.on('connect', ()=>{
  console.log('Connected to server');
});

socket.on('newMessage', (message)=>{
  // console.log('New message: ', message);
  // $('.message-list').append(`${message.from} : ${message.message}`);
  var li = $('<li></li>');
  li.text(`${message.from} : ${message.message}`);
  $('.messages').append(li);
})

$('.message-form').on('submit', (e) =>{
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'User',
    message: $('[name=message]').val()
  },()=>{

  });
});
socket.on('disconnect', ()=>{
  console.log('Disconnected from server');
});
