export function wait({sleep}, ms){
  return sleep(parseInt(ms, 10))
          .then(result => true);
};

export default function waitFactory(deps){
  return wait.bind(null, deps);
};
