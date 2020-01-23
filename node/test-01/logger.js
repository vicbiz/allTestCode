const EventEmitter = require('events');

class Logger extends EventEmitter {
    log(message){
        // Send and HTTP request
        // console.log(message);

        // Raise an event
        this.emit("messageLogged", {id:101123, url:'http://someurl.com', message: message});
    }
}

module.exports = Logger;