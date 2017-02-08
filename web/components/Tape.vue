<template lang="html">
  <button class="tape" :class="{'is-green' : (type == 'file')}">
    <span v-if="(type == 'upload')"><img :src="upload" alt=""><br></span>
    <span>{{ tape ? tape.name : type  }}</span>
  </button>
</template>

<script>
import upload from '../img/icon-upload.svg';
export default {
  props: ['type', 'tape'],
  data (){
    return {
      upload
    }
  }
}
</script>

<style lang="css">
.tape{
  padding: 10px;
  border: 1px solid #979797;
  height: 160px;
  width: 280px;
  margin: 0 20px 20px 0;

  cursor: pointer;
  font-size: 24px;
  color: #1F1F1F;
  background: #F3F3F3;
  border-radius: 10px;
}
.tape:focus{
  outline: none;
  box-shadow: 0 0 3px 3px green;
}
.tape.is-green{
  background: #ADF8B9;
}
</style>
