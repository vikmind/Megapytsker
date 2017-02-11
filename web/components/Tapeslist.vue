<template lang="html">
  <div class="tapeslist">
    <CardButton v-for="card in cards" :card="card" />
    <FunButton />
    <div class="tapeslist__delimeter"></div>
    <Tape :tape="{name: 'Upload'}" type="upload"/>
    <Tape :tape="{name: 'Create'}" type="create"/>
    <div class="tapeslist__delimeter"></div>
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
.tapeslist__delimeter{
  flex-grow: 1;
  flex-basis: 100%;
}
</style>
