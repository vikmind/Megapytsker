export default function tapesSocketInit({operationsExecutor, port, device, client, selectCard, db}, socket){
  socket.on('save_tape', function(tape){
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
    db.Tape.destroy({
      where: { id: tapeId }
    })
    .then(count => {
      socket.emit('removed_tape', `count: ${count}`)
    });
  });
};
