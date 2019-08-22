const events = require('events');

const eventEmitter = new events.EventEmitter();
const sendEmail = require('../subscribers/handlers');

eventEmitter.on('user-signup', sendEmail);
module.exports = eventEmitter;
