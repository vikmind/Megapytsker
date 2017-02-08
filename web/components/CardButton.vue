<template>
  <button
    class="tape is-card"
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
.tape.is-card{
  background: #a9eca9;
  border-color:#217521;
}
</style>
