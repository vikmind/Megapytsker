<template>
  <div id="app">
    <ul>
      <li v-for="card in cards">
        <CardButton :card="card" />
      </li>
    </ul>
  </div>
</template>

<script>
import config from '../config';
import CardButton from './CardButton.vue';

export default {
  name: 'app',
  components: { CardButton },
  data () {
    return {
      cards: config.cards
    }
  }
};
</script>

<style>
#app {
  font-family: Helvetica, Arial, sans-serif;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}
ul{
  list-style: none;
}
li{
  margin-bottom: 10px;
}

a {
  color: #42b983;
}
</style>
