import touchScreenFactory from './touchScreen';
const client = {
  shell: function(id, str){
    console.log(`EXECUTE '${str}' ON DEVICE ${id}`);
    return Promise.resolve();
  }
}
const device = {id: 1};
const sleep = function(ms){
  console.log(`SLEEP FOR ${ms}ms`)
  // return Promise.resolve(ms);
  return Promise.reject();
};

const touchScreen = touchScreenFactory({client, device, sleep});
touchScreen(100, 100)
  .then(value => console.log(`resolved with ${value}`));
