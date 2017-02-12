export function touchScreen({client, device, sleep}, x, y){
  if (!!device){
    return client.shell(device.id, `input tap ${x} ${y}`)
            .then(() => sleep(2000))
            .then(() => true)
            .catch( err => {
              console.error('Something went wrong:', err.stack);
              throw new Error(`Something went wrong: ${err}`)
            });
  } else {
    return Promise.reject(new Error('Cannot touch screen: device not connected'));
  }
};

export default function touchScreenFactory(deps){
  return touchScreen.bind(null, deps);
};
