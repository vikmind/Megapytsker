<template lang="html">
  <div class="tape__wrapper">
  <button class="tape" @click="(type == 'create') ? editTape(tape.id) : openTape(tape.id)" :class="{'is-green' : (type == 'file')}">
    <span v-if="(type == 'upload')"><Icon glyph="icon-upload" width="50" height="50" /><br></span>
    <span v-if="(type == 'create')"><Icon glyph="icon-add" width="50" height="50" /><br></span>
    <span>{{ tape.name  }}</span>
  </button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Icon from './Icon.vue';

export default {
  components: { Icon },
  props: ['type', 'tape'],
  methods: {
    ...mapActions([
      'openTape',
      'editTape'
    ])
  }
}
</script>

<style lang="scss">
.tape__wrapper{
  height: 180px;
  width: 280px;
  margin: 0 20px 20px 0;
  display: flex;
  flex: 0 0 280px;
}
.tape{
  flex: 1;
  align-self: stretch;
  padding: 10px;
  border: 1px solid #979797;
  position: relative;

  cursor: pointer;
  font-size: 24px;
  color: #1F1F1F;
  background: #F3F3F3;
  border-radius: 10px;
  box-shadow: 2px 2px 1px 0 #bbb;
  transform: translate(-2px, -2px);
  transition: box-shadow .2s, transform .2s;
  will-change: transform;
}
.tape:hover{
  box-shadow: 3px 3px 0 0 lightgray;
  transform: translate(-3px, -3px);
}
.tape:focus{
  outline: none;
  background: darken(#F3F3F3, 10%);
}
.tape:active{
  box-shadow: 0 0 0 0 lightgray;
  transform: translate(0, 0);
}
.tape.is-green{
  background: #ADF8B9;
  &:focus{
    background: darken(#ADF8B9, 20%);
  }
}
.tape::after{
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  backrgound: #979797;
}
</style>
