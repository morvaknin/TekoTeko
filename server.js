// var http = require("http");

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

const q_final_results = ["Uruguay","France","Brazil","Belgium",
"Russia","Croatia","Sweden","England"];
const s_final_results = ["France","Belgium","Croatia","England"];
const final_results = ["France","Croatia"];
const the_winner = ["France"];



var express = require('express');
var app = express();
var port = process.env.PORT || 8080;

// routes will go here
app.use(express.json());
app.use(express.static(__dirname + "/Project/"));

// start the server
app.get('/', function(req, res){
    res.sendfile('Html/Home.html', { root: __dirname + "/Project/" } );
});


function check(guess,res,points){
    var sum = 0;
    for(var i=0;i<guess.length;i++){
        if (guess[i] == res[i]){
            sum+=points;
        }
    }
    return sum;
}

app.post('/guess', function(req, res) {
    let data = req.body;
    let q = data.q;
    let s = data.s;
    let fin = data.fin;
    let win = data.win;
    let score = 0;
    
    console.log(req.body);
    //TODO!!!
    
    if (/*data.user in database*/ false) {
        res.status(409).send("this username exists already!");
        return;
    }



    // function to iterate over both arrays
    score += check(q,q_final_results,1);
    score += check(s,s_final_results,3);
    score += check(fin,final_results,5);
    score += check(win,the_winner,10);
    console.log(score);

    res.send("Your guess has been sent");

    //TODO!!!
    
    /*insertToDB({user: data.user, score: score}).then(
        success => res.send(score),
        err => res.status(500).send("OOPS:(")
    );
    */
});



app.listen(port);
console.log('Server started! At http://localhost:' + port);
