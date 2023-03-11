const tutorial = require('./tutorial/tutorial');
const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

eventEmitter.on('tutorial', (num1, num2) => {
  console.log('tutorial event occured :', num1 + num2);
});
eventEmitter.emit('tutorial', 1, 2);

let pedro = new Person('Pedro');
let christina = new Person('Christina');
christina.on('name', () => {
  console.log('my name is ' + christina.name);
});
pedro.on('name', () => {
  console.log('my name is ' + pedro.name);
});

pedro.emit('name');
christina.emit('name');
