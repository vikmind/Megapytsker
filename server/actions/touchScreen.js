export function touchScreen({client, device, sleep}, x, y, time){
  if (!!device){
    const sleepTime = parseInt(time, 10) || 200;
    if (global.stopExecutingSequence){
      global.stopExecutingSequence = false;
      return Promise.reject(new Error('Interruption from client'));
    } else {
      return client.shell(device.id, `input tap ${x} ${y}`)
              .then(() => sleep(sleepTime))
              .then(() => true)
              .catch( err => {
                console.error('Something went wrong:', err.stack);
                throw new Error(`Something went wrong: ${err}`)
              });
    }
  } else {
    return Promise.reject(new Error('Cannot touch screen: device not connected'));
  }
};

export default function touchScreenFactory(deps){
  return touchScreen.bind(null, deps);
};
