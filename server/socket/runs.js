export default function runsSocket({ db }, socket){
  socket.on('remove_run', function(runId){
    db.Run.destroy({
      where: { id: runId },
      individualHooks: true,
    })
    .then(count => {
      socket.emit('removed_run', `count: ${count}`)
    });
  });
  socket.on('get_runs', function(data){
    db.Run.findAll({
      order: ['id']
    })
    .then(foundRuns => {
      socket.emit('new_runs', {
        runs: foundRuns
      });
    });
  });
  socket.on('canon_run', function(runId){
    db.Run.findById(runId).then(run => {
      return run.makeCanon();
    })
    .then(() => {
      socket.emit('canonized', {run: runId});
    })
  });
}
