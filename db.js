var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var db;

function connect() {
    return new Promise( (resolve, reject) => {
        var url = 'mongodb://localhost:27017/';
        mongodb.MongoClient.connect(url, { useNewUrlParser: true }, (err, my_db) => {
            if (err) {
                reject(err);
            }
            db = my_db.db("TekoTeko");
            db.createCollection("users", (err, res) => {
                if (err){
                    reject(err);
                } 
                resolve("Connection Established");
            });
        });
    });
}


 function insert(user) {
    return new Promise( (resolve, reject) => {
        db.collection("users").insertOne(user, (err, res) => {
            if (err){
                reject(err);
            } 
            else 
                resolve(res);
        });
    });
}

function find(user, pro) {
    var proj = pro || {};
    Object.assign(proj, { _id: 0 });

    return new Promise((resolve, reject) => {
        db.collection("users").findOne(user, { pro: proj }, (err, res) => {
            if (err){
                reject(err);
            } 
            resolve(res);
        });
    });
}



module.exports = {
    connect,
    insert,
    find
};


router.get('/_list',function(req,res){
    var MongoClient = mongodb.MongoClient;
    var url =  'mongodb://localhost:27017/scores';

    MongoClient.connect(url,function(err,db){
        if (err){
            console.log("Unable to connect the server", err);
        }
        else{
            console.log("Connection Established");
            var collection = db.collection('scores');
            collection.find({}).toArray(function(err,result){
                if (err){
                        res.send(err);
                }
                else if(result.length){
                    res.render('scoreslist',{
                        "scoreslist":resule
                    });
                }
                else {
                    res.send('No documants found');
                }

                db.close();
            })
        }

    })
})


router.get('/newuser',function(req,res){
    res.render('newuser',)
})


