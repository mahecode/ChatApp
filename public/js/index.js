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
socket.on('newLocationMessage', (message) =>{
  var li = $('<li></li>');
  var a = $('<a target="_blank">My current location</a>');

  li.text(`${message.from}: `);
  a.attr('href', message.url);
  li.append(a);
  $('.messages').append(li);
})
$('.message-form').on('submit', (e) =>{
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'User',
    message: $('[name=message]').val()
  },()=>{
    $('[name=message]').val("");
  });
});

var locationButton = $('.send-location');
locationButton.on('click', function () {
  if(!navigator.geolocation){
    return alert('Geolocation not supported by your browser');
  }
  locationButton.attr('disabled','disabled').text('Sending location...');
  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
  }, function() {
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location');
  });
});
