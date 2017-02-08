<template>
  <button
    class="tape is-fun"
    type="button"
    @click="fun">FUN</button>
</template>

<script>
import 'whatwg-fetch';
export default {
  methods: {
    fun: function(){
      fetch('/fun', {method: 'POST'});
    }
  }
}
</script>

<style lang="css">
  .tape.is-fun{
    background: #a9d0ec;
    border-color: #213375;
  }
</style>
