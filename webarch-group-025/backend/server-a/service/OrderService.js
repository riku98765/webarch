'use strict';


/**
 * Add an order for an sandwich
 *
 * order Order place an order for a sandwich
 * returns Order
 **/
var rabbit = require('./../rabbit-utils/sendTask');
var mongo = require('./../db');

exports.addOrder = function(order) {
  
  if(typeof(order) != "object"){
    var myobj = { };
    //console.log("WAS NOT OBJECT");
  }else{
    var myobj = order;
    //console.log("WAS OBJECT");
  }
  
  var obj_str = JSON.stringify(myobj);
  
  mongo.saveOrder(obj_str);
  rabbit.addTask('rapid-runner-rabbit', 'queueA', myobj);
  return new Promise(function(resolve, reject) {
    
    
   if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Find an order by its ID
 * IDs must be positive integers
 *
 * orderId Long ID of sandwich that needs to be fetched
 * returns Order
 **/
exports.getOrderById = function(orderId) {
return new Promise(function(resolve, reject) {
var obj; 
mongo.findID(orderId)
.then(function (response) {
      
      var examples = {};
      examples['application/json'] = response;
      if (Object.keys(examples).length > 0) {
        resolve(examples[Object.keys(examples)[0]]);
      } else {
        resolve();
      }
  
});
});
}


/**
 * Get a list of all orders. Empty array if no orders are found.
 *
 * returns ArrayOfOrders
 **/
exports.getOrders = function() {
return new Promise(function(resolve, reject) {
var obj; 
mongo.findAll()
.then(function (response) {
      
      var examples = {};
      examples['application/json'] = response;
      if (Object.keys(examples).length > 0) {
        resolve(examples[Object.keys(examples)[0]]);
      } else {
        resolve();
      }
  
});
});

}
