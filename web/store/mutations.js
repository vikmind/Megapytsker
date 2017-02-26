import * as types from './mutation-types.js';

export default {
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
    state.openedMode = 'view';
  },
  [types.EDIT_TAPE] (state, tapeId){
    state.openedTapeId = tapeId;
    state.openedMode = 'edit';
  },
  [types.SAVE_TAPE] (state, tape){
    state.openedMode = 'view';
    const tapeIndx = state.tapes.findIndex(item => item.id === tape.id);
    state.tapes = [...state.tapes.slice(0, tapeIndx), tape, ...state.tapes.slice(tapeIndx + 1)];
  },
  [types.ADD_TAPE] (state, tape){
    state.openedMode = 'view';
    state.tapes.push(tape);
  },
  [types.UPDATE_TAPE] (state, {tape, timestamp}){
    const tapeIndx = state.tapes.findIndex(item => item.id === timestamp);
    state.tapes = [...state.tapes.slice(0, tapeIndx), tape, ...state.tapes.slice(tapeIndx + 1)];
    if (state.openedTapeId === 'NEW'){
      state.openedTapeId = tape.id;
    }
  },
  [types.CLOSE_TAPE] (state) {
    state.openedTapeId = null;
  }
};
