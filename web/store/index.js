import Vue from 'vue';
import Vuex from 'vuex';
import config from '../../config.js';
import * as types from './mutation-types.js';
import createActions from './actions.js';
import getters from './getters.js';
import mutations from './mutations.js';

import socket from './socket';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    cards: config.cards.map(item => item.number),
    operationTypes: config.operationTypes,
    status: {
      arduino: null,
      famoco: null,
      server: null
    },
    tapes: [],
    openedTapeId: null,
    currentOperationId: null,
    openedMode: 'view'
  },
  getters,
  mutations,
  actions: createActions(socket),
});

socket.on('init', function(data){
  store.commit(types.INIT_STATUS, data.status);
  store.commit(types.INIT_TAPES, data.tapes);
});
socket.on('disconnect', function(){
  store.commit(types.UPDATE_STATUS, { server: false });
});
socket.on('save_tape', function(data){
  store.commit(types.UPDATE_TAPE, data);
});
socket.on('operation_id', function(operation){
  store.commit(types.RUN_OPERATION, operation);
});
socket.on('complete', function(data){
  console.log('complete', data);
  store.commit(types.RUN_OPERATION, null);
  store.commit(types.END_RUN_TAPE);
});

export default store;
