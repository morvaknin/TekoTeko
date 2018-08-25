var http = require("http");

// //This is the callback method, is called every time a user makes a request
// //Request object has info about their request, response object is what we send back to them
// function onRequest(request, response) {
//     console.log("A user made a request" + request.url);
//     response.writeHead(200, {"Content-Type": "text/plain"});
//     response.write("I am a simple Node server!");
//     response.end();
// }

// //Create a server and listen for requests on this port
// http.createServer(onRequest).listen(8888);
// console.log("Server is now running...");

// //Now open Chrome and go to http://localhost:8888
// //Saying that user made request twice because browser also makes a request for the favicon

// grab the packages we need
var express = require('express');
var app = express();
var port = process.env.PORT || 8080;

// routes will go here

// start the server
app.get('/', function(req, res){
    res.sendfile('Html/MakeAGuess.html', { root: __dirname + "/Project/" } );
});
app.listen(port);
console.log('Server started! At http://localhost:' + port);
