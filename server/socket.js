function stepReporterFactory(socket, current){
  socket.emit('executing', current.name);
}

export default function socketConnectionCallback({operationsExecutor, port, device, selectCard}, socket){
  console.log(socket.id, 'connected!');
  const stepReporter = stepReporterFactory.bind(null, socket);

  // Echo
  socket.on('echo', function hello(data){
    console.log('echo', data);
    socket.emit('echooo', data);
  });

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
  socket.emit('init', {
    arduino: port.isOpen(),
    device: !!device,
    tapes: require('../tapes')
  });
};
