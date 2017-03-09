export function swipe({client, device, sleep}, x1, y1, x2, y2, time, delay){
  if (!!device){
    const sleepTime = parseInt(delay, 10) || 200;
    const swipeTime = parseInt(time, 10) || 300;
    return client.shell(device.id, `input swipe ${x1} ${y1} ${x2} ${y2} ${swipeTime}`)
            .then(() => sleep(swipeTime))
            .then(() => sleep(sleepTime))
            .then(() => true)
            .catch( err => {
              console.error('Something went wrong:', err.stack);
              throw new Error(`Something went wrong: ${err}`)
            });
  } else {
    return Promise.reject(new Error('Cannot touch screen: device not connected'));
  }
};

export default function swipeFactory(deps){
  return swipe.bind(null, deps);
};
