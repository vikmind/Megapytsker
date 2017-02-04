<template>
  <button
    class="fun"
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
  button.fun{
    padding: 20px;
    font-size: 16px;
    background: #a9d0ec;
    min-width: 300px;
    border: 2px solid #213375;
    border-radius: 5px;
    cursor: pointer;
  }
</style>
