<template>
  <div id="app">
    <Topbar />
    <Tapeslist :cards="cards"/>
  </div>
</template>

<script>
import config from '../../config';

import Topbar from './Topbar.vue';
import Tapeslist from './Tapeslist.vue';

export default {
  name: 'app',
  components: {
    Topbar, Tapeslist
  },
  data () {
    return {
      cards: config.cards
    }
  }
};
</script>

<style>
html,body{
  padding: 0;
  margin: 0;
}
#app {
  font-family: "Source Sans Pro", Helvetica, Arial, sans-serif;
  color: #2c3e50;
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
