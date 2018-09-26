var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
const mongo = require('./db').connect;



// routes will go here
app.use(express.json());
app.use(express.static(__dirname + "/Project/"));



const q_final_results = ["Uruguay","France","Brazil","Belgium",
"Russia","Croatia","Sweden","England"];
const s_final_results = ["France","Belgium","Croatia","England"];
const final_results = ["France","Croatia"];
const the_winner = ["France"];



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

    res.send("Your guess has been sent!");

    //TODO!!!
    
    /*insertToDB({user: data.user, score: score}).then(
        success => res.send(score),
        err => res.status(500).send("OOPS:(")
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



