import tapesSocket from './socket/tapes';
import runsSocket from './socket/runs';

export function stepReporterFactory({socket}, current){
  socket.emit('executing', current.name);
  if (current.id){
    socket.emit('operation_id', current.id);
  }
}

export default function socketConnectionCallback({operationsExecutor, port, device, client, selectCard, db}, socket){

  // Servo slider
  socket.on('servo', function(data){
    if (port.isOpen()){
      port.write(data.value + 'T');
    }
  });

  // Card buttons
  socket.on('card', function(data){
    selectCard(data.value)
    .then(()=>socket.emit('servo_success'))
    .catch(()=>socket.emit('servo_failed'));
  });

  // Screenshots
  socket.on('get_screen', function(timestamp){
    client.screencap(device.id)
    .then(stream => {
      stream.pipe(require('fs').createWriteStream('./public/screenshot.png'));
      stream.on('end', streamEnd => socket.emit('screenshot', {timestamp, path: './screenshot.png'}));
    })
    .catch( err => {
      console.error('Something went wrong:', err.stack);
      throw new Error(`Something went wrong: ${err}`)
    });
  });

  // Execution
  socket.on('execute', function(data){
    db.Run.create({
      TapeId: data.id,
      tapeName: data.name,
      info: JSON.stringify(data.Operations, null, 2)
    }).then(run => {
      return operationsExecutor(
        data.Operations,
        stepReporterFactory.bind(null, {socket}),
        run.id
      )
    })
    .then(()=> {
      socket.emit('complete', {done: true});
    }, (err) => {
      socket.emit('complete', {error: 'Interrupted'});
    })
    .catch(err => {
      socket.emit('complete', {error: '¯\_(ツ)_/¯'});
    });
  });
  socket.on('stop_execution', function(data){
    global.stopExecutingSequence = true;
  });

  // Tapes
  tapesSocket({ operationsExecutor, port, device, client, selectCard, db }, socket);

  // Runs
  runsSocket({ db }, socket);

  // Init
  selectCard('INIT');
  let tapes = [];
  db.Tape.findAll({
    include: [db.Operation],
    order: [['id'], [db.Operation, 'id' ]]
  })
  .then(foundTapes => {
    tapes = foundTapes;
    return db.Run.findAll({
      order: ['id']
    });
  })
  .then(foundRuns => {
    socket.emit('init', {
      status: {
        arduino: port.isOpen(),
        famoco: !!device,
        server: true
      },
      tapes,
      runs: foundRuns
    });
  })
};
