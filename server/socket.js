export function stepReporterFactory(socket, current){
  socket.emit('executing', current.name);
  if (current.id){
    socket.emit('operation_id', current.id);
  }
}

export default function socketConnectionCallback({operationsExecutor, port, device, client, selectCard, db}, socket){
  console.log(socket.id, 'connected!');
  const stepReporter = stepReporterFactory.bind(null, socket);

  // Servo slider
  socket.on('servo', function(data){
    console.log(`emit servo with ${data.value}`);
    if (port.isOpen()){
      port.write(data.value + 'T');
    }
  });

  // Card buttons
  socket.on('card', function(data){
    console.log(`emit card with ${data.value}`);
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
    console.log(`emit exection`);
    operationsExecutor(
      data.Operations,
      stepReporter
    )
    .then(()=> {
      socket.emit('complete');
    });
  });

  // Saving
  socket.on('save_tape', function(tape){
    console.log(`Saving tape`);
    const operations = tape.Operations.map(item => {return {...item, id: undefined, TapeId: tape.id}});
    db.Tape.upsert(tape)
    .then(isCreated => {
      return db.Operation.destroy({where: {tapeId: tape.id}});
    })
    .then(()=>{
      return db.Operation.bulkCreate(operations);
    })
    .then(items => {
      return db.Tape.findAll({
        where: {id: tape.id},
        include: [db.Operation],
        order: [[db.Operation, 'id']]
      });
    })
    .then(tapes => {
      socket.emit('save_tape', {tape: tapes[0], timestamp: tapes[0].id})
    });
  });
  socket.on('add_tape', function({tape, timestamp}){
    console.log(`Adding tape`);
    let insertedId = null;
    db.Tape.create(tape)
    .then(inserted => {
      insertedId = inserted.id;
      const operations = tape.Operations.map(item => {return {...item, TapeId: insertedId}});
      return db.Operation.bulkCreate(operations);
    })
    .then(items => {
      return db.Tape.findAll({
        where: {id: insertedId},
        include: [db.Operation],
        order: [[db.Operation, 'id']]
      });
    })
    .then(tapes => {
      socket.emit('save_tape', {tape: tapes[0], timestamp})
    });
  });
  socket.on('remove_tape', function(tapeId){
    console.log(`Removing tape`);
    db.Tape.destroy({
      where: { id: tapeId }
    })
    .then(count => {
      socket.emit('removed_tape', `count: ${count}`)
    });
  });

  // Init
  selectCard('INIT');
  db.Tape.findAll({
    include: [db.Operation],
    order: [['id'], [db.Operation, 'id' ]]
  })
  .then(tapes => {
    socket.emit('init', {
      status: {
        arduino: port.isOpen(),
        famoco: !!device,
        server: true
      },
      tapes
    });
  });
};
