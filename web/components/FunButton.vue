<template>
  <button
    class="tape is-fun"
    type="button"
    @click="fun">FUN</button>
</template>

<script>
import socket from '../socket';

let sequence = [];
socket.on('init', function(data){
  console.log('init from fun', data);
  sequence = data.tapes.read_ticket.sequence;
});
export default {
  methods: {
    fun: function(){
      socket.emit('execute', {sequence});
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
