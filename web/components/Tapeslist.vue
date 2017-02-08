<template lang="html">
  <div class="tapeslist">
    <CardButton v-for="card in cards" :card="card" />
    <FunButton />
    <Tape :tape="{name: 'Upload'}" type="upload"/>
    <Tape :tape="{name: 'Read ticket'}" type="file"/>
  </div>
</template>

<script>
import CardButton from './CardButton.vue';
import FunButton from './FunButton.vue';
import Tape from './Tape.vue';

export default {
  props: ['cards'],
  components: {
    CardButton, FunButton, Tape
  }
}
</script>

<style lang="css">
.tapeslist{
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
}
</style>
