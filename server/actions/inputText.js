export function inputText({client, device, sleep}, text, time){
  const isStringAllowed = /^[A-z0-9\_]+$/.test(text);
  const sleepTime = parseInt(time, 10) || 1000;
  // if (!isStringAllowed) return Promise.reject(new Error('String unpermitted'));
  let input = '';
  if (/^KEYCODE_/.test(text)){
    input = `input keyevent ${text}`
  } else {
    input = `input text ${text}`;
  }
  if (global.stopExecutingSequence){
    global.stopExecutingSequence = false;
    return Promise.reject(new Error('Interruption from client'));
  } else {
    return client
            .shell(device.id, input)
            .then(() => sleep(sleepTime))
            .then( result => true )
            .catch( err => {
              console.error('Something went wrong:', err.stack);
              throw new Error(`Something went wrong: ${err}`)
            });
  }
};

export default function inputTextFactory(deps){
  return inputText.bind(null, deps);
};
