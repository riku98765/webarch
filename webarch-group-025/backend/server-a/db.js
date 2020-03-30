'use strict';
//{useNewUrlParser: true, useUnifiedTopology: true}

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://192.168.99.100:27017/mydb";

exports.startDB = function() {
MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}, function(err, db) {
  if (err) throw err;
   var dbo = db.db("mydb");
  dbo.createCollection("sandwiches", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
});
};


exports.saveOrder = function(myobj) {
MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  console.log("mongo str->" + myobj);
  if(typeof(myobj) != "object"){
    var myobje = JSON.parse(myobj);
    console.log("MONGO WAS NOT OBJECT");
  }else{
    var myobje = myobj;
    console.log("MONGO WAS OBJECT");
  }
  dbo.collection("sandwiches").insertOne(myobje, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
});
};

exports.findAll = function(){
return new Promise(function(resolve,reject){
 MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  var str = dbo.collection("sandwiches").find({id: {$exists: true}}, { projection: { _id: 0 } }).toArray(function(err, result) {
    if (err) throw err;
    var r = JSON.stringify(result);
    console.log("FIND ALL" + r);
    
    db.close();
    
    resolve(r);
  });
  
 }); 
});
};


exports.findID = function(ID){
return new Promise(function(resolve,reject){
 MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  dbo.collection("sandwiches").find({id: ID}, { projection: { _id: 0 } }).toArray(function(err, result) {
    if (err) throw err;
    var r = JSON.stringify(result[0]);
    console.log("FIND ID" + r);
    
    db.close();
    
    resolve(r);
  });
  
 }); 
});
};

exports.ack = function(ID){
console.log("ACK ID" + ID);
 MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  dbo.collection("sandwiches").findOneAndUpdate({id: ID}, {$set:{status: "ready"}},  function(err, object) {
      if (err){
          console.warn(err.message);  // returns error if no matching object found
      }else{
          console.dir(object);
      }
  });
 
  
}); 

};

exports.drop = function(){

 MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  dbo.collection("sandwiches").drop(function(err, delOK) {
    if (err) throw err;
    if (delOK) console.log("Collection deleted");
    db.close();
  });
}); 

};