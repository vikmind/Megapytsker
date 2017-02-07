<template>
  <button
    class="card"
    type="button"
    @click="moveServo">{{ card.number }}</button>
</template>

<script>
import 'whatwg-fetch';
export default {
  props: ['card'],
  methods: {
    moveServo: function(){
      fetch('/servo', {method: 'POST', headers: {value: this.card.number}});
    }
  }
}
</script>

<style lang="css">
  button.card{
    padding: 20px;
    font-size: 16px;
    background: #a9eca9;
    min-width: 300px;
    border: 2px solid #217521;
    border-radius: 5px;
    cursor: pointer;
  }
</style>
