import io from 'socket.io-client';

const socket = io();

socket.on('connect', function(data) {
  console.log('open', data);
});
socket.on('init', function(data){
  console.log(data);
});

export default socket;
