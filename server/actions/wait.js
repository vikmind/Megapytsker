export function wait({sleep}, ms){
  return sleep(ms)
          .then(result => true);
};

export default function waitFactory(deps){
  return wait.bind(null, deps);
};
