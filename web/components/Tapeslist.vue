<template lang="html">
  <div class="tapeslist">
    <CardButton v-for="card in $store.state.cards" :card="card" />
    <div class="tapeslist__delimeter"></div>
    <Tape :tape="{name: 'Upload'}" type="upload"/>
    <Tape :tape="{name: 'Create'}" type="create"/>
    <div class="tapeslist__delimeter"></div>
    <Tape v-for="tape in $store.state.tapes" :tape="tape" type="file"/>
  </div>
</template>

<script>
import CardButton from './CardButton.vue';
import Tape from './Tape.vue';

export default {
  components: {
    CardButton, Tape
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
