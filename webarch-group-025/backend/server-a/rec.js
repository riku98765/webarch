'use strict';

var Rabbit = require('./rabbit-utils/receiveTask');


function receive(){
Rabbit.getTask('rapid-runner-rabbit', 'queueB');
}
  


exports.listen = function(){

setInterval(receive, 3000);

}
