export function wait({sleep}, ms){
  if (global.stopExecutingSequence){
    global.stopExecutingSequence = false;
    return Promise.reject(new Error('Interruption from client'));
  } else {
    return sleep(parseInt(ms, 10))
            .then(result => true);
  }
};

export default function waitFactory(deps){
  return wait.bind(null, deps);
};
