export default {
  runsForTape: state =>
    state.runs.filter(run => run.TapeId === state.openedTapeId),
}
