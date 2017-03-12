<template lang="html">
  <div class="tapemodal__actions">
    <button class="button success" v-if="openedMode === 'view'" @click="executeSequence(tape)" title="Execute">
      <Icon glyph="execute" width="32" height="32" /><br>
      Run
    </button>
    <button class="button" v-if="openedMode === 'executing'" @click="stopExecution" title="Execute">
      <Icon glyph="stop" width="32" height="32" /><br>
      Stop
    </button>
    <button class="button" v-if="openedMode === 'view'" @click="editTape(tape.id)">
      <Icon glyph="edit" width="32" height="32" /><br>
      Edit
    </button>
    <button class="button alert" v-if="openedMode === 'edit'" @click="removeTape(tape.id)">
      <Icon glyph="trash" width="32" height="32" /><br>
      Remove
    </button>
    <button class="button" v-if="openedMode === 'edit'" @click="saveTape(tape)" title="Save">
      <Icon glyph="save" width="32" height="32" /><br>
      Save
    </button>
    <button class="button secondary" @click="closeTape()">
      <Icon glyph="close" width="32" height="32" /><br>
      Close
    </button>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Icon from './Icon.vue';

export default {
  components: { Icon },
  props: ['tape'],
  computed: {
    ...mapState([
      'openedMode'
    ])
  },
  methods: {
    ...mapActions([
      'closeTape',
      'editTape',
      'saveTape',
      'removeTape',
      'executeSequence',
      'stopExecution'
    ])
  }
}
</script>

<style lang="scss">
.tapemodal__actions{
  display: flex;
  .button{
    margin: 0;
    min-width: 80px;
    font-size: 0.8rem;
    &:focus{
      outline: none;
      box-shadow: 0 0 1px 1px white inset;
    }
  }
}
@media only screen and (max-width:560px){
  .tapemodal__actions{
    align-self: flex-end;
  }
}
</style>
