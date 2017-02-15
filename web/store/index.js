import Vue from 'vue';
import Vuex from 'vuex';
import config from '../../config.js';
import * as types from './mutation-types.js';

Vue.use(Vuex);

const store = new Vuex.Store({
  actions: {
    selectCard ({}, number){
      socket.emit('card', {value: number});
    },
    executeSequence ({}, tape){
      if (tape.sequence){
        socket.emit('execute', tape);
      } else {
        console.log('TODO', tape.name);
      }
    }
  },
  state: {
    cards: config.cards,
    status: {
      arduino: null,
      famoco: null,
      server: null
    },
    tapes: []
  },
  mutations: {
    [types.INIT_STATUS] (state, status) {
      state.status = status;
    },
    [types.INIT_TAPES] (state, tapes) {
      state.tapes = tapes
    },
    [types.UPDATE_STATUS] (state, status) {
      state.status = Object.assign({}, state.status, status);
    }
  }
});

import socket from '../socket.js';
socket.on('init', function(data){
  store.commit(types.INIT_STATUS, data.status);
  store.commit(types.INIT_TAPES, data.tapes);
});
socket.on('disconnect', function(){
  store.commit(types.UPDATE_STATUS, { server: false });
})

export default store;
