import inputTextFactory from './inputText';
const client = {
  shell: function(id, str){
    console.log(`EXECUTE '${str}' ON DEVICE ${id}`);
    return Promise.resolve();
  }
}
const device = {id: 1};
const sleep = function(ms){
  console.log(`SLEEP FOR ${ms}ms`)
  return Promise.resolve(ms);
};

const inputText = inputTextFactory({client, device, sleep});
inputText("HELLO")
  .then(value => console.log(`resolved with ${value}`));
