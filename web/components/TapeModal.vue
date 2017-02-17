<template lang="html">
<div>
  <transition name="modal-fade">
    <div class="tapemodal" v-if="$store.state.openedTapeId">
      <div class="tapemodal__title">
        <h1>{{ openedTape.name }}</h1>
        <div>
          <button class="tapemodal__close" @click="executeSequence(openedTape)">Execute</button>
          <button class="tapemodal__close" @click="closeTape()">X</button>
        </div>
      </div>
      <div class="tapemodal__body">
        <pre>
          {{ JSON.stringify(openedTape.sequence, null, 2) }}
        </pre>
      </div>
    </div>
  </transition>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  computed: {
    openedTape(){
      return this.$store.getters.openedTape;
    }
  },
  methods: mapActions([
    'closeTape',
    'executeSequence'
  ])
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
.tapemodal__title{
  background: #ADF8B9;
  border-bottom: 1px solid #979797;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.22);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 20px;
}
.tapemodal__title>h1{
  margin: 0;
}
.tapemodal__body{
  background: #F3F3F3;
  flex-grow: 1;
  overflow: scroll;
}
</style>
