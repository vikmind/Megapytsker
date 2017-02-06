import waitFactory from './wait';

const sleep = function(ms){
  console.log(`SLEEP FOR ${ms}ms`)
  return Promise.resolve(ms);
};

waitFactory({sleep})(2000)
  .then(value => console.log(`Resolved with ${value}`));
