
// Require Modules
const http = require("http");
const url = require("url");
const path = require("path");
const fs = require("fs");

// Mime Types
const mimeTypes = {
    "html"  :   "text/html",
    "jpeg"  :   "image/jpeg",
    "jpg"   :   "image/jpeg",
    "gif"   :   "image/gif",
    "png"   :   "image/png",
    "js"    :   "text/javascript",
    "css"   :   "text/css",
    "map"   :   "application/json"
};

// Create Server
http.createServer(function(req, res){
    var uri = url.parse(req.url).pathname;
    var fileName = path.join(process.cwd(), unescape(uri));
    console.log("Loading "+uri);
    var stats;

    try {
        stats = fs.lstatSync(fileName);
    } catch(e){
        res.writeHead(404, {'Content-Type':'text/plain'});
        res.write('404 Not Found \n');
        res.end();
        return;
    }

    console.log(stats);

    // Check if File/Directory
    if(stats.isFile()){
        var mimeType = mimeTypes[path.extname(fileName).split(".").reverse()[0]];
        // Success : 200
        res.writeHead(200, {"Content-Type" : mimeType});

        var fileStream = fs.createReadStream(fileName);
        fileStream.pipe(res);
    } else if(stats.isDirectory()) {
        // Redirect : 302
        res.writeHead(302, {'Location' : 'index.html'});
        res.end();
    } else {
        res.writeHead(500, {'Content-Type' : 'text/plain'});
        res.write('500 Internal Error\n');
        res.end();
    }
    
}).listen(3000);

