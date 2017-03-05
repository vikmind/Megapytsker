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
import { mapState } from 'vuex';
import Topbar from './Topbar.vue';
import Tapeslist from './Tapeslist.vue';
import TapeModal from './TapeModal.vue';

export default {
  computed:
    mapState([
      'openedTapeId'
    ]),
  name: 'app',
  components: {
    Topbar, Tapeslist, TapeModal
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
