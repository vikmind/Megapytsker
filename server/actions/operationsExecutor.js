// Execute sequence of steps
export function operationsExecutor({operations}, sequence, stepCallback){
  return sequence.reduce(
      function(prev, cur){
        return prev.then(result => {
          if (typeof(stepCallback) == "function"){
            stepCallback(cur);
          }
          return operations[cur.type](...cur.args);
        })
      },
      Promise.resolve()
  );
};

export default function operationsExecutorFactory(deps){
  return operationsExecutor.bind(null, deps);
}
