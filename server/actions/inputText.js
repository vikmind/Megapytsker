export function inputText({client, device, sleep}, text){
  const isStringAllowed = /^[A-z0-9]+$/.test(text);
  if (!isStringAllowed) return Promise.reject(new Error('String unpermitted'));
  const createPromise = function(char){
    return client
            .shell(device.id, `input keyevent "KEYCODE_${char}"`)
            .then(() => sleep(200))
            .catch( err => {
              console.error('Something went wrong:', err.stack);
            });
  };

  return text.split("").reduce((prev, cur) => {
    return prev.then(result => createPromise(cur));
  }, Promise.resolve())
    .then( result => true )
    .catch( err => {
      console.error('Something went wrong:', err.stack);
      throw new Error(`Something went wrong: ${err}`)
    });
};

export default function inputTextFactory(deps){
  return inputText.bind(null, deps);
};
