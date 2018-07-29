var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message.js');

describe('generateMessage', () =>{
  it('should generate correct message object' , ()=>{
    var from = 'mahem';
    var message = 'Some message';
    var messages = generateMessage(from, message);

    expect(messages.createdAt).toBeA('number');
    expect(messages).toInclude({from , message});
  });
});

describe('generateLocationMessage', () =>{
  it('should generate correct location', () =>{
    var from = 'Admin';
    var latitude = 15;
    var longitude = 12;
    var url = 'https://www.google.com/maps?q=15,12';
    var messages = generateLocationMessage(from, latitude, longitude);

    expect(messages.createdAt).toBeA('number');
    expect(messages).toInclude({from, url});

  })
})
