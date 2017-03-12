<template>
  <div id="app">
    <Topbar />
    <Tapeslist/>
    <transition name="modal-fade">
      <TapeModal v-if="openedTapeId"/>
    </transition>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Topbar from './Topbar.vue';
import Tapeslist from './Tapeslist.vue';
import TapeModal from './TapeModal.vue';
const CardPath = {
  parse(hash){
    const result = /#card\/((?:NEW)|\d+)/.exec(hash);
    if (result){
      return (result[1] === 'NEW') ? 'NEW' : parseInt(result[1], 10);
    }
  },
  build(id){
    return `#card/${id}`
  }
};
export default {
  computed:
    mapState([
      'openedTapeId',
      'cards'
    ]),
  name: 'app',
  components: {
    Topbar, Tapeslist, TapeModal
  },
  created() {
    document.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('hashchange', this.onHashChange);
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('hashchange', this.onHashChange);
  },
  watch: {
    openedTapeId: function(tapeId){
      if (tapeId){
        window.location.hash = CardPath.build(tapeId);
      } else {
        window.location.hash = '';
      }
    }
  },
  methods: {
    ...mapActions([
      'selectCard',
      'closeTape',
      'openTape'
    ]),
    onKeyDown(e) {
      switch (e.keyCode) {
        case 49: if (!this.openedTapeId) this.selectCard(this.cards[0]); break;
        case 50: if (!this.openedTapeId) this.selectCard(this.cards[1]); break;
        case 51: if (!this.openedTapeId) this.selectCard(this.cards[2]); break;
        case 52: if (!this.openedTapeId) this.selectCard(this.cards[3]); break;
        case 53: if (!this.openedTapeId) this.selectCard(this.cards[4]); break;
        case 27: this.closeTape(); break;
      }
    },
    onHashChange(e){
      const tapeId = CardPath.parse(window.location.hash);
      if (tapeId !== this.openedTapeId){
        this.openTape(tapeId);
      }
    }
  }
};
</script>

<style lang="scss">
@import 'variables';
@import 'foundation-settings';
@import '../../node_modules/foundation-sites/scss/foundation';
@include foundation-global-styles;
@include foundation-forms;
@include foundation-button;
html,body{
  padding: 0;
  margin: 0;
  overflow: hidden;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
*,*::before,*::after{
  box-sizing: inherit;
}
#app {
  color: $text-color;
  line-height: 1.3;
  overflow: hidden;
  overflow-y: scroll;
  height: 100%;
}

h1, h2 {
  font-weight: normal;
}
ul{
  list-style: none;
  padding: 0;
}
li{
  margin-bottom: 10px;
}

a {
  color: $link-color;
}
</style>
