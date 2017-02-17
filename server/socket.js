function stepReporterFactory(socket, current){
  socket.emit('executing', current.name);
}

export default function socketConnectionCallback({operationsExecutor, port, device, selectCard}, socket){
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
      data.sequence,
      stepReporter
    ).then(()=> socket.emit('complete'));
  });

  // Init
  const tapes = require('../tapes');
  socket.emit('init', {
    status: {
      arduino: port.isOpen(),
      famoco: !!device,
      server: true
    },
    tapes: Object.keys(tapes).map((key,i) => Object.assign({}, tapes[key], {id: ++i}))
  });
};
