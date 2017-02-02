<template>
  <div id="app">
    <h1>{{ msg }}</h1>
    <ul>
      <li v-for="card in cards">
        <CardButton
          v-bind:number="card.number"
          v-bind:angle="card.angle"
          />
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
      msg: 'Welcome to Your Vue.js App',
      cards: config.cards
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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
