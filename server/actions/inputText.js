export function inputText({client, device, sleep}, text){
  const isStringAllowed = /^[A-z0-9\_]+$/.test(text);
  // if (!isStringAllowed) return Promise.reject(new Error('String unpermitted'));
  let input = '';
  console.log(text, /^KEYCODE_/.test(text));
  if (/^KEYCODE_/.test(text)){
    input = `input keyevent ${text}`
  } else {
    input = `input text ${text}`;
  }
  return client
          .shell(device.id, input)
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
