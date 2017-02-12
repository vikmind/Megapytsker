import Vue from 'vue';
import App from './components/App.vue';
import store from './store/';

import socket from './socket.js';

socket.on('hello', function(data){
  console.log(data);
})

new Vue({
  el: '#app',
  store,
  render: h => h(App)
});
