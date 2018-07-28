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

var location = $('.send-location');
location.on('click', () =>{
  if(!navigator.geolocation){
    return alert('Geolocation not supported by your browser');
  }
  navigator.geolocation.getCurrentPosition((position) =>{

  }, () =>{
    alert('Unable to fetch location');
  }
});

socket.on('disconnect', ()=>{
  console.log('Disconnected from server');
});
