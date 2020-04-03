'use strict';

var Rabbit = require('./rabbit-utils/receiveTask');


function receive(){
Rabbit.getTask('rapid-runner-rabbit', 'queueA');
}
  
setInterval(receive, 3000);
