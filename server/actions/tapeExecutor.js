// Get tape from db, then execute it given number of times
import { operationsExecutor } from './operationsExecutor.js';
export function tapeExecutor({operations, db}, tapeId, numberOfTimes){
  return db.Tape.findById(
    parseInt(tapeId, 10),
    {
      include: [db.Operation],
      order: [[db.Operation, 'id' ]]
    }
    ).then(tape => {
      const array = new Array(parseInt(numberOfTimes, 10) || 1);
      return array.fill(0).reduce((prev, cur) => {
        return prev.then(result => {
          return operationsExecutor({operations}, tape.Operations);
        });
      },
      Promise.resolve());
    })
    .catch( err => {
      console.error('Something went wrong:', err.stack);
      throw new Error(`Operation "${cur.type}" failed with ${err}`)
    });
};

export default function tapeExecutorFactory(deps){
  return tapeExecutor.bind(null, deps);
};
