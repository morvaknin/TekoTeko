var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
const database = require('./db');
const mongo = database.connect;
app.use(express.json());
app.use(express.static(__dirname + "/Project/"));


//The right bet
const q_final_results = ["Uruguay","France","Brazil","Belgium",
"Russia","Croatia","Sweden","England"];
const s_final_results = ["France","Belgium","Croatia","England"];
const final_results = ["France","Croatia"];
const the_winner = ["France"];



// start the server
app.get('/', function(req, res){
    res.sendfile('Html/MakeAGuess.html', { root: __dirname + "/Project/" } );
});

// get score board
app.get('/get_data', function(req, res) {
    database.find().then(
        data => {
            if (data) {
                res.send(data);
                return;
            }
        },
        _ => res.status(500).send("error")
    );
});




// check amount of points
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
    let user = data.user;
    let score = 0;
    
    //TODO!!!    
    console.log("before isExist");
    if (database.isExist(user)) {
        console.log("inside isExist");
        res.status(409).send("This username exists already!");
        return;
    }



    // function to iterate over both arrays
    score += check(q,q_final_results,1);
    score += check(s,s_final_results,3);
    score += check(fin,final_results,5);
    score += check(win,the_winner,10);
    console.log(score);

    var row = {
        username : user,
        my_score : score    
    }

    database.insert(row);
    database.find();
    res.send("User has been added");
/*
    database.find(user).then(
        result => {
            console.log("HAAAAAAAAAAAAAAAAAAAAA");
            if (result) {
                res.status(409).send("Username already exists");
                return;
            }
            database.insert(row);
            res.send("User has been added");
        },
        () => res.status(500).send("Server Error")
    );
    */
});



app.listen(port,function(){
    console.log('Server started! At http://localhost:' + port);
    mongo().then(res =>{
    console.log(res)},
    res =>{
        console.error(res);
    }
);
});



