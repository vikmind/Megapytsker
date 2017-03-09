export function inputText({client, device, sleep}, text){
  const isStringAllowed = /^[A-z0-9]+$/.test(text);
  if (!isStringAllowed) return Promise.reject(new Error('String unpermitted'));
  return client
          .shell(device.id, `input text ${text}`)
          .then(() => sleep(300))
          .then( result => true )
          .catch( err => {
            console.error('Something went wrong:', err.stack);
            throw new Error(`Something went wrong: ${err}`)
          });
};

export default function inputTextFactory(deps){
  return inputText.bind(null, deps);
};
