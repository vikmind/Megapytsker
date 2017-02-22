// Execute sequence of steps
export function operationsExecutor({operations}, sequence, stepCallback){
  return sequence.reduce(
      function(prev, cur){
        return prev.then(result => {
          if (typeof(stepCallback) == "function"){
            stepCallback(cur);
          }
          return operations[cur.type](...cur.args).catch( err => {
            console.error('Something went wrong:', err.stack);
            throw new Error(`Operation "${cur.type}" failed with ${err}`)
          });
        })
      },
      Promise.resolve()
  );
};

export default function operationsExecutorFactory(deps){
  return operationsExecutor.bind(null, deps);
}
