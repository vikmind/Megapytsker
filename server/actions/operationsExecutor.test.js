import operationsExecutorFactory from './operationsExecutor';
import sleep from 'then-sleep';

const operations = {
  sleep1s: function(a){
    console.log('sleep for 1s');
    return Promise.resolve(a);
  },
  sleep2s:function(a){
    console.log('sleep for 2s');
    return Promise.resolve(a);
  }
};

const sequence = [
  {
    name: 1,
    type: 'sleep1s',
    args: ['hello']
  },
  {
    name: 2,
    type: 'sleep2s',
    args: ['beautiful']
  },
  {
    name: 3,
    type: 'sleep1s',
    args: ['world']
  }
];
const stepCallback = step => console.log(`Executing ${step.name}`);
const operationsExecutor = operationsExecutorFactory({operations});
operationsExecutor(sequence, stepCallback).then(result => console.log(`complete with ${result}`));
