'use strict';

var Rabbit = require('./rabbit-utils/receiveTask');


function receive(){
Rabbit.getTask('192.168.99.100', 'queueB');
}
  


exports.listen = function(){

setInterval(receive, 3000);

}