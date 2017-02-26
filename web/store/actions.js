import * as types from './mutation-types.js';

export default function createActions(socket){
  return {
    selectCard ({}, number){
      socket.emit('card', {value: number});
    },
    executeSequence ({}, tape){
      if (tape.Operations){
        socket.emit('execute', tape);
      } else {
        console.log('TODO:', tape.name);
      }
    },
    openTape ({commit, state}, tapeId){
      commit(types.OPEN_TAPE, tapeId);
    },
    editTape ({commit, state}, tapeId){
      commit(types.EDIT_TAPE, tapeId);
    },
    saveTape ({commit, state}, tape){
      if (tape.id === 'NEW'){
        const timestamp = Date.now() / 1000 | 0;
        commit(types.ADD_TAPE, {...tape, id: timestamp});
        socket.emit('add_tape', {tape: {...tape, id: undefined}, timestamp});
      } else {
        commit(types.SAVE_TAPE, tape);
        socket.emit('save_tape', tape);
      }
    },
    closeTape ({commit, state}, tapeId){
      commit(types.CLOSE_TAPE);
    }
  }
}
