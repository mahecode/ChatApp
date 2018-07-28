var expect = require('expect');
var {generateMessage} = require('./message.js');

describe('generateMessage', () =>{
  it('should generate correct message object' , ()=>{
    var from = 'mahem';
    var message = 'Some message';
    var messages = generateMessage(from, message);

    expect(messages.createdAt).toBeA('number');
    expect(messages).toInclude({from , message});
  });
});
