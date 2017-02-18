<template>
  <div id="app">
    <Topbar />
    <Tapeslist/>
    <TapeModal/>
  </div>
</template>

<script>

import Topbar from './Topbar.vue';
import Tapeslist from './Tapeslist.vue';
import TapeModal from './TapeModal.vue';

export default {
  name: 'app',
  components: {
    Topbar, Tapeslist, TapeModal
  }
};
</script>

<style>
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
  font-family: "Source Sans Pro", Helvetica, Arial, sans-serif;
  color: #2c3e50;
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
  color: #42b983;
}
</style>
