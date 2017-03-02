<template lang="html">
  <div class="tapeslist">
    <h1 class="tapeslist__title">Cards</h1>
    <CardButton v-for="card in cards" :card="card" />
    <h1 class="tapeslist__title">Tapes</h1>
    <!-- <TapeButton :tape="{id: 'UPLOAD', name: 'Upload'}" type="upload"/> -->
    <TapeButton :tape="{id: 'NEW', name: 'Create'}" type="create"/>
    <div class="tapeslist__delimeter"></div>
    <TapeButton v-for="tape in tapes" :tape="tape" type="file"/>
  </div>
</template>

<script>
import CardButton from './CardButton.vue';
import TapeButton from './TapeButton.vue';
import { mapState } from 'vuex';

export default {
  components: {
    CardButton, TapeButton
  },
  computed: mapState([
    'tapes',
    'cards'
  ])
}
</script>

<style lang="css">
.tapeslist{
  padding: 20px;
  margin-right: -20px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
}
.tapeslist__delimeter,
.tapeslist__title{
  flex-grow: 1;
  flex-basis: 100%;
}
.tapeslist__title:first-child{
  margin-top: 0;
}
</style>
