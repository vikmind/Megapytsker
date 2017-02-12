import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
});

import socket from '../socket.js';
socket.on('hi', function(data){
  console.log('hi');
})

export default store;
