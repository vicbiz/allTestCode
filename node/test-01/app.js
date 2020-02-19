// npm i clear
const cls = require("clear");
cls();



console.log("OS : os ---------------------------------------");
const os = require("os");

console.log(os.arch()); // system CPU architecture
console.log(os.cpus()); // cup info
console.log("os.freemem() : "+os.freemem());
console.log("os.homedir() : "+os.homedir());
console.log("os.hostname() : "+os.hostname());
console.log("os.networkInterfaces() : ");
console.log(os.networkInterfaces());
console.log("os.platform() : "+os.platform());
console.log("os.release() : "+os.release());
console.log("os.tmpdir() : "+os.tmpdir());
console.log("os.totalmem() : "+os.totalmem());
console.log("os.type() : "+os.type());
console.log("os.uptime() -- seconds : "+os.uptime());
console.log("Signal Constants : ");
console.log(os.constants.signals);




console.log("\n"+"File System : fs ---------------------------------------");
const fs = require("fs");

// fs.unlink('hello', (err) => {
//     if (err) throw err;
//     console.log('successfully deleted /tmp/hello');
//   });

// Synchronous ... blocking process .. wait for finishing process
const files = fs.readdirSync("./");
console.log("\nfiles from Synchronous : ",files);

// Asynchronous .. no wait for finish.. call back
fs.readdir('./', function(err, files){
    if(err) console.log('Error : ', err);
    else console.log("\nfiles from Asynchronous : ",files);
});




console.log("\n"+"Events : events ---------------------------------------");
// const EventEmitter = require('events'); // Logger class alreay included all EventEmitter...
const Logger = require('./logger.js');
const logger = new Logger();

// Register a listener
logger.on('messageLogged', function(arg){
    console.log('Listener Called \n', arg);
})

logger.log("Message....for Looger..... !!!");





/*
console.log("\n"+"HTTP Server : http ---------------------------------------");

  const http = require('http');

  const hostname = '127.0.0.1';
  const port = 3000;
  
  const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
  });
  
  server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
*/













