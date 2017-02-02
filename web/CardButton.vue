<template>
  <button
    type="button"
    @click="moveServo">{{ number }}</button>
</template>

<script>
export default {
  props: ['number', 'angle'],
  methods: {
    moveServo: function(){
      fetch('/servo', {method: 'POST', headers: {value: this.angle}});
    }
  }
}
</script>

<style lang="css">
  button{
    padding: 20px;
    font-size: 16px;
    background: #a9eca9;
    min-width: 300px;
    border: 2px solid #217521;
    border-radius: 5px;
    cursor: pointer;
  }
</style>
