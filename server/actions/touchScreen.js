export function touchScreen({client, device, sleep}, x, y){
  return client.shell(device.id, `input tap ${x} ${y}`)
          .then(() => sleep(2000))
          .then(() => true)
          .catch( err => {
            console.error('Something went wrong:', err.stack);
            return Promise.resolve(false);
          });
};

export default function touchScreenFactory(deps){
  return touchScreen.bind(null, deps);
};
