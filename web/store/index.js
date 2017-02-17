import Vue from 'vue';
import Vuex from 'vuex';
import config from '../../config.js';
import * as types from './mutation-types.js';

Vue.use(Vuex);

const store = new Vuex.Store({
  getters: {
    openedTape: store => {
      return store.tapes.find(item => item.id === store.openedTapeId)
    }
  },
  actions: {
    selectCard ({}, number){
      socket.emit('card', {value: number});
    },
    executeSequence ({}, tape){
      if (tape.sequence){
        socket.emit('execute', tape);
      } else {
        console.log('TODO:', tape.name);
      }
    },
    openTape ({commit, state}, tapeId){
      commit(types.OPEN_TAPE, tapeId);
    },
    closeTape ({commit, state}, tapeId){
      commit(types.CLOSE_TAPE);
    },
  },
  state: {
    cards: config.cards,
    status: {
      arduino: null,
      famoco: null,
      server: null
    },
    tapes: [],
    openedTapeId: null
  },
  mutations: {
    [types.INIT_STATUS] (state, status) {
      state.status = status;
    },
    [types.INIT_TAPES] (state, tapes) {
      state.tapes = tapes
    },
    [types.UPDATE_STATUS] (state, status) {
      state.status = {...state.status, status};
    },
    [types.OPEN_TAPE] (state, tapeId) {
      state.openedTapeId = tapeId;
    },
    [types.CLOSE_TAPE] (state) {
      state.openedTapeId = null;
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
