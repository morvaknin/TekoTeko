var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var db;

function connect() {
    return new Promise((resolve, reject) => {
        var url = 'mongodb://localhost:27017/';
        mongodb.MongoClient.connect(url, { useNewUrlParser: true }, (err, my_db) => {
            if (err) {
                reject(err);
            }
            db = my_db.db("TekoTeko");
            db.createCollection("users", (err, res) => {
                if (err) {
                    reject(err);
                }
                resolve("Connection Established");
            });
        });
    });
}


function insert(data) {
    return new Promise((resolve, reject) => {
        db.collection("users").insertOne(data, (err, res) => {
            if (err) {
                reject(err);
            }
            else
                resolve(res);
        });
    });
}

function find(user) {
    /*var proj = pro || {};
     Object.assign(proj, { _id: 0 });*/
     //db.dropDatabase();
    return new Promise((resolve, reject) => {
        db.collection("users").find({}).toArray((err, res) => {
            if (err) {
                reject(err);
            }
            console.log(res);
            resolve(res);
        });
    });

}




module.exports = {
    connect,
    insert,
    find
};