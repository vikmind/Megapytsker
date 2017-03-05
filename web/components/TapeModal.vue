<template lang="html">
  <div class="tapemodal">
    <div class="tapemodal__header">
      <h1 v-if="openedMode === 'view'" class="tapemodal__title">{{ tape.name }}</h1>
      <label v-if="openedMode === 'edit'" class="tapemodal__title">
        <input type="text" v-model="tape.name">
      </label>
      <div class="tapemodal__actions">
        <button class="button success" @click="executeSequence(tape)" title="Execute">
          <Icon glyph="execute" width="32" height="32" />
        </button>
        <button class="button" v-if="openedMode === 'view'" @click="editTape(tape.id)">
          <Icon glyph="edit" width="32" height="32" />
        </button>
        <button class="button" v-else @click="saveTape(tape)" title="Save">
          <Icon glyph="save" width="32" height="32" />
        </button>
        <button class="button alert" @click="removeTape(tape.id)">
          <Icon glyph="trash" width="32" height="32" />
        </button>
        <button class="button secondary" @click="closeTape()">
          <Icon glyph="close" width="32" height="32" />
        </button>
      </div>
    </div>
    <div class="tapemodal__body">
      <div v-if="openedMode === 'view'" class="operations-list">
        <Operation
            :operation="operation"
            v-for="operation in tape.Operations"
          />
      </div>
      <div v-if="openedMode === 'edit'" class="operations-list">
        <OperationEdit
            :operation="operation"
            v-for="(operation,idx) in tape.Operations"
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
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import Operation from './Operation.vue';
import OperationEdit from './OperationEdit.vue';
import Icon from './Icon.vue';
export default {
  components: {
    Operation,
    OperationEdit,
    Icon
  },
  computed: {
    ...mapState([
      'openedMode',
      'openedTapeId'
    ])
  },
  data (){
    // Deep clone is needed
    const tape = (this.$store.state.openedTapeId === 'NEW')
      ? {id: 'NEW', name: 'NEW TAPE', Operations: []}
      : this.$store.state.tapes.find(item => item.id === this.$store.state.openedTapeId);
    return {
      tape: JSON.parse(JSON.stringify(tape))
    }
  },
  watch: {
    openedTapeId: function(value){
      const tape = this.$store.state.tapes.find(item => item.id === value);
      console.log('watcher:', tape);
      this.tape = JSON.parse(JSON.stringify(tape));
    }
  },
  methods: {
    ...mapActions([
      'closeTape',
      'editTape',
      'saveTape',
      'removeTape',
      'executeSequence'
    ]),
    onDelete: (tape, idx) => {
      tape.Operations.splice(idx, 1);
    },
    onAdd: (tape) => {
      tape.Operations.push({tapeId: tape.id, type: null, args: []})
    }
  }
}
</script>

<style lang="scss">
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
  background: #607d8b;
  color: #fff;
  border-bottom: 1px solid #979797;
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
.tapemodal__actions{
  display: flex;
  .button{
    margin: 0;
    &:focus{
      outline: none;
      box-shadow: 0 0 1px 1px white inset;
    }
  }
}
@media only screen and (max-width:560px){
  .tapemodal__header{
    flex-direction: column;
  }
  .tapemodal__title{
    align-self: stretch;
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
