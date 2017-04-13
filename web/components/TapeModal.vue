<template lang="html">
  <div class="tapemodal">
    <div class="tapemodal__header">
      <label v-if="openedMode === 'edit'" class="tapemodal__title">
        <input type="text" v-model="tape.name">
      </label>
      <h1 v-else class="tapemodal__title">{{ tape.name }}</h1>
      <TapeActions :tape="tape" />
    </div>
    <div class="tapemodal__body">
      <draggable v-if="openedMode === 'edit'" v-model="tape.Operations" :options="dragOptions" class="operations-list">
        <OperationEdit
            :operation="operation"
            v-for="(operation,idx) in tape.Operations"
            :key="operation"
            v-on:delete="onDelete(tape, idx)"
          />
        <button
            class="operation operation-edit"
            @click="onAdd(tape)"
          >
          <div class="operation__content operation__content--centered">
            Add new operation
          </div>
        </button>
      </draggable>
      <div v-else class="operations-list">
        <Operation
            :operation="operation"
            v-for="operation in tape.Operations"
          />
      </div>
      <Runs v-if="openedMode === 'view'" :runs="runs" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import Operation from './Operation.vue';
import OperationEdit from './OperationEdit.vue';
import TapeActions from './TapeActions.vue';
import draggable from 'vuedraggable';
import Runs from './Runs.vue';

export default {
  components: {
    Operation,
    OperationEdit,
    TapeActions,
    draggable,
    Runs,
  },
  computed: {
    ...mapState([
      'openedMode',
      'openedTapeId'
    ]),
    ...mapGetters({
      runs: 'runsForTape',
    }),
  },
  data (){
    return {
      tape: this.findCurrentTape(),
      dragOptions: {
        handle: '.handle'
      }
    }
  },
  watch: {
    openedTapeId: function(value){
      this.tape = this.findCurrentTape();
    }
  },
  methods: {
    onDelete: (tape, idx) => {
      tape.Operations.splice(idx, 1);
    },
    onAdd: (tape) => {
      tape.Operations.push({tapeId: tape.id, type: null, args: ['1']})
    },
    findCurrentTape() {
      const newTape = {id: 'NEW', name: 'NEW TAPE', Operations: []};
      const tape = (this.$store.state.openedTapeId === 'NEW')
        ? newTape
        : this.$store.state.tapes.find(item => item.id === this.$store.state.openedTapeId);
      return JSON.parse(JSON.stringify(tape || newTape));
    }
  }
}
</script>

<style lang="scss">
.modal-fade-enter-active, .modal-fade-leave-active {
  transform: scale(1);
  transition: opacity .3s, transform .3s;
}
.modal-fade-enter, .modal-fade-leave-to, .modal-fade-leave-active {
  opacity: 0;
  transform: scale(0.7);
}
.tapemodal{
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  background: #F3F3F3;
  z-index: 100;
}
.tapemodal__header{
  background: #ADF8B9;
  color: #1F1F1F;
  position: relative;
  z-index: 20;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.22);
  flex: 0 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.tapemodal__title{
  flex-grow: 1;
  padding: 0 20px;
  input{
    margin-bottom: 0;
  }
}
h1.tapemodal__title{
  margin: 0;
  font-size: 24px;
}
.tapemodal__body{
  background: #F3F3F3;
  flex: 0 1 auto;
  overflow: hidden;
  overflow-y: scroll;
  padding: 18px 20px;
  min-height: calc(100% - 69px);
}
@media only screen and (max-width:560px){
  .tapemodal{
    overflow-y: scroll;
  }
  .tapemodal__header{
    flex-direction: column;
  }
  .tapemodal__body{
    flex: 1 1 auto;
    overflow: visible;
  }
  .tapemodal__title{
    align-self: stretch;
  }
  label.tapemodal__title{
    padding: 0;
  }
}
</style>
