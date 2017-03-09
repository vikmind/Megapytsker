<template lang="html">
  <div class="root">
    <h2 class="title">Choose operation type</h2>
    <div class="grid">
      <div
        class="item"
        v-for="operationType in operationTypes"
        @click="$emit('input', operationType.identifier)"
      >
        <Icon class="icon" :glyph="operationType.identifier" width="32" height="32" />
        <div>{{operationType.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Icon from '../Icon.vue';
export default {
  components: {
    Icon
  },
  computed:
    mapState([
      'operationTypes'
    ]),
  props: [
    'type'
  ]
}
</script>

<style scoped lang="css">
.root{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  display: flex;
  background: #ADF8B9;
  flex-direction: column;

  text-align: center;
  box-shadow: 0 0 10px 0 #696969 inset;
  color: #1F1F1F;
}
.title{
  margin: 0;
  padding: 10px 0;
  align-self: stretch;
}
.grid{
  align-items: center;
  justify-content: flex-start;
  display: flex;
  flex-wrap: wrap;
  flex-grow: 1;
  flex-direction: column;
}
.item{
  margin: 1em 0;
  cursor: pointer;
  color: #6453f3;
}
</style>
