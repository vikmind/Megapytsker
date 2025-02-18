import * as types from './mutation-types.js';

export default {
  [types.INIT_STATUS] (state, status) {
    state.status = status;
  },
  [types.INIT_TAPES] (state, tapes) {
    state.tapes = tapes;
  },
  [types.INIT_RUNS] (state, runs) {
    state.runs = runs;
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
  },
  [types.REMOVE_TAPE] (state, tapeId) {
    const tapeIndx = state.tapes.findIndex(item => item.id === tapeId);
    state.tapes = [...state.tapes.slice(0, tapeIndx), ...state.tapes.slice(tapeIndx + 1)];
  },
  [types.RUN_TAPE] (state){
    state.openedMode = 'executing';
  },
  [types.END_RUN_TAPE] (state){
    state.openedMode = 'view';
  },
  [types.RUN_OPERATION] (state, operationId){
    state.currentOperationId = operationId;
  },
  [types.REMOVE_RUN] (state, runId){
    const runIndx = state.runs.findIndex(item => item.id === runId);
    state.runs = [...state.runs.slice(0, runIndx), ...state.runs.slice(runIndx + 1)];
  },
  [types.FAV_RUN] (state, runId){
    const run = {
      ...state.runs.find(item => item.id === runId),
      isCanon: true,
    };
    const tapeRuns = state.runs
      .filter(item => (item.TapeId === run.TapeId)&&(item.id !== runId))
      .map(item => ({...item, isCanon: false}));
    const otherRuns = state.runs.filter(item => item.TapeId !== run.TapeId);
    state.runs = [...tapeRuns, run, ...otherRuns].sort((a,b) => (a.id > b.id) ? 1 : -1)
  }
};
