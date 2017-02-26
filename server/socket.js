function stepReporterFactory(socket, current){
  socket.emit('executing', current.name);
}

export default function socketConnectionCallback({operationsExecutor, port, device, selectCard, db}, socket){
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

  // Execution
  socket.on('execute', function(data){
    console.log(`emit exection`);
    operationsExecutor(
      data.Operations,
      stepReporter
    ).then(()=> socket.emit('complete'));
  });

  // Saving
  socket.on('save_tape', function(tape){
    console.log(`Saving tape`);
    const operations = tape.Operations.map(item => {return {...item, id: undefined, TapeId: tape.id}});
    db.Tape.upsert(tape)
        .then(isCreated => {
          db.Operation.destroy({where: {tapeId: tape.id}}).then(()=>{
            db.Operation.bulkCreate(operations).then(
              (items) => {
                db.Tape.findAll({
                  where: {id: tape.id},
                  include: [db.Operation],
                  order: [[db.Operation, 'id']]
                }).then((tapes) => { socket.emit('save_tape', {tape: tapes[0], timestamp: tapes[0].id}) });
              }
            )
          })
        });
  });
  socket.on('add_tape', function({tape, timestamp}){
    console.log(`Adding tape`);
    db.Tape.create(tape).then(
      (inserted) => {
        const operations = tape.Operations.map(item => {return {...item, TapeId: inserted.id}});
        db.Operation.bulkCreate(operations).then(
          (items) => {
            db.Tape.findAll({
              where: {id: inserted.id},
              include: [db.Operation],
              order: [[db.Operation, 'id']]
            }).then((tapes) => { socket.emit('save_tape', {tape: tapes[0], timestamp}) });
          }
        );
    });
  });

  // Init
  const initEmitter = (tapes) => {
    socket.emit('init', {
      status: {
        arduino: port.isOpen(),
        famoco: !!device,
        server: true
      },
      tapes
    });
  };
  db.Tape.findAll({
    include: [db.Operation],
    order: [[db.Operation, 'id' ]]
  }).then(initEmitter);
};
