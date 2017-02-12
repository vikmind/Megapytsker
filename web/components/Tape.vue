<template lang="html">
  <button class="tape" @click="clickBtn" :class="{'is-green' : (type == 'file')}">
    <span v-if="(type == 'upload')"><img :src="upload" alt=""><br></span>
    <span v-if="(type == 'create')"><img :src="create" alt=""><br></span>
    <span>{{ tape ? tape.name : type  }}</span>
  </button>
</template>

<script>
import upload from '../img/icon-upload.svg';
import create from '../img/icon-add.svg';
import socket from '../socket.js';
export default {
  props: ['type', 'tape'],
  data (){
    return {
      upload,
      create
    }
  },
  methods: {
    clickBtn: function(){
      socket.emit('echo', {some:'data'});
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
  position: relative;

  cursor: pointer;
  font-size: 24px;
  color: #1F1F1F;
  background: #F3F3F3;
  border-radius: 10px;
  box-shadow: 2px 2px 1px 0 #bbb;
  transform: translate(-2px, -2px);
  transition: box-shadow .2s, transform .2s;
}
.tape:hover{
  box-shadow: 3px 3px 0 0 lightgray;
  transform: translate(-3px, -3px);
}
.tape:focus{
  outline: none;
}
.tape:active{
  box-shadow: 0 0 0 0 lightgray;
  transform: translate(0, 0);
}
.tape.is-green{
  background: #ADF8B9;
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
