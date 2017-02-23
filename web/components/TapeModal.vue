<template lang="html">
  <div class="tapemodal">
    <div class="tapemodal__header">
      <h1 v-if="$store.state.openedMode === 'view'" class="tapemodal__title">{{ tape.name }}</h1>
      <input v-if="$store.state.openedMode === 'edit'" type="text" v-model="tape.name">
      <div class="tapemodal__actions">
        <button @click="executeSequence(tape)">Execute</button>
        <button v-if="$store.state.openedMode === 'view'" @click="editTape(tape.id)">Edit</button>
        <button v-else @click="saveTape(tape)">Save</button>
        <button @click="closeTape()">X</button>
      </div>
    </div>
    <div class="tapemodal__body">
      <div v-if="$store.state.openedMode === 'view'" class="operations-list">
        <Operation
            :operation="operation"
            v-for="operation in tape.Operations"
          />
      </div>
      <div v-if="$store.state.openedMode === 'edit'" class="operations-list">
        <OperationEdit
            :operation="operation"
            v-for="(operation,idx) in tape.Operations"
            v-on:delete="onDelete(tape, idx)"
          />
        <button
            class="operation"
            @click="onAdd(tape)"
          >
          Add new
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Operation from './Operation.vue';
import OperationEdit from './OperationEdit.vue';
export default {
  components: {
    Operation,
    OperationEdit
  },
  data (){
    // Deep clone is needed
    const tape = this.$store.state.tapes.find(item => item.id === this.$store.state.openedTapeId);
    return {
      tape: JSON.parse(JSON.stringify(tape))
    }
  },
  methods: {
    ...mapActions([
      'closeTape',
      'editTape',
      'saveTape',
      'executeSequence'
    ]),
    onDelete: (tape, idx) => {
      tape.Operations.splice(idx, 1);
    },
    onAdd: (tape) => {
      tape.Operations.push({tapeId: tape.id, type: 'selectCard', args: []})
    }
  }
}
</script>

<style lang="css">
.modal-fade-enter-active, .modal-fade-leave-active {
  transform: scale(1);
  transition: opacity .5s, transform .5s;
}
.modal-fade-enter, .modal-fade-leave-to, .modal-fade-leave-active {
  opacity: 0;
  transform: scale(0.5);
}
.tapemodal{
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
}
.tapemodal__header{
  background: #ADF8B9;
  border-bottom: 1px solid #979797;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.22);
  flex: 1 0 auto;
  min-height: 69px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 20px;
}
@media only screen and (max-width:560px){
  .tapemodal__header{
    flex-direction: column;
  }
  .tapemodal__title{
    align-self: flex-start;
    margin-bottom: 1em;
  }
  .tapemodal__actions{
    align-self: flex-end;
  }
}
h1.tapemodal__title{
  margin: 0;
}
.tapemodal__body{
  background: #F3F3F3;
  flex: 0 1 auto;
  overflow: hidden;
  overflow-y: scroll;
  padding: 18px 20px;
  min-height: calc(100% - 69px);
}
</style>
