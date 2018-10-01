var express = require('express');
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

function find() {
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

function isExist(user){
    flag = db.collection("users").findOne({'username': user});
    if (flag){
        return true;
    }
    return false;
}






module.exports = {
    connect,
    insert,
    find,
    isExist
};