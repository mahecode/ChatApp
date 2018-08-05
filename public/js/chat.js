var socket = io();

function scrollbottom(){
  var messages = $('.message');
  var newMessage = messages.children('li:last-child');
  //Heights
  var clientHeight = messages.prop('clientHeight');
  var scrollHeight = messages.prop('scrollHeight');
  var scrollTop = messages.prop('scrollTop');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight>= scrollHeight){
    messages.scrollTop('scrollHeight');
  }
  // return newMessageHeight, lastMessageHeight;
}

socket.on('connect', ()=>{
  console.log('Connected to server');
});

socket.on('newMessage', (message)=>{
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = $('#message-template').html();
  var html = Mustache.render(template, {
    from: message.from,
    message: message.message,
    createdAt: formattedTime
  });
  $('.messages').append(html);
  scrollbottom();
})
socket.on('newLocationMessage', (message) =>{
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = $('#location-message-template').html();
  var html = Mustache.render(template, {
    url: message.url,
    from: message.from,
    createdAt: formattedTime
  })
  $('.messages').append(html);
  scrollbottom();
});

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
