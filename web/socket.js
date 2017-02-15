import io from 'socket.io-client';

const socket = io();

socket.on('init', function(data){
  console.log('init data', data);
});

export default socket;
