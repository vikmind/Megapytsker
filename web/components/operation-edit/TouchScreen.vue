<template lang="html">
  <div class="root">
    <button class="button" @click="requestScreen">Get screenshot from device</button>
    <div class="popup" v-if="opened" @click="touch">
      <img :src="`./screenshot.png?t=${timestamp}`" alt="Image is not loaded">
      <div class="circle" :style="{left: dotX + 'px', top: dotY + 'px'}"></div>
    </div>
    <table class="table">
      <tr>
        <th>X</th>
        <td>{{x}}</td>
        <th>Y</th>
        <td>{{y}}</td>
      </tr>
    </table>
    <label>Delay:
      <input type="number" :value="delay" @input="input">
    </label>
    <div class="filler"></div>
  </div>
</template>

<script>
import socket from '../../store/socket.js';
export default {
  created (){
    socket.on('screenshot', data => {
      console.log('screenshot listener');
      this.opened = (data.timestamp === this.timestamp);
    });
  },
  props: ['args', 'argsInfo'],
  data(){
    return {
      proportion: 1,
      x: this.args[0] || 0,
      y: this.args[1] || 0,
      delay: this.args[2] || this.argsInfo[2].default,
      timestamp: null,
      opened: false
    }
  },
  mounted (){
    this.proportion = (this.$el.querySelector('.filler').clientWidth) / 320;
    this.$emit('select', [this.x, this.y, this.delay]);
  },
  computed: {
    dotX(){
      return this.x * this.proportion | 0;
    },
    dotY(){
      return this.y * this.proportion | 0;
    }
  },
  methods: {
    touch(e){
      this.x = (e.offsetX + e.target.offsetLeft) / this.proportion | 0;
      this.y = (e.offsetY + e.target.offsetTop ) / this.proportion | 0;
      this.opened = false;
      this.$emit('select', [this.x, this.y, this.delay]);
    },
    input(e){
      this.delay = e.target.value;
      this.$emit('select', [this.x, this.y, this.delay]);
    },
    requestScreen(){
      const timestamp = Date.now() / 1000 | 0;
      this.timestamp = timestamp;
      socket.emit('get_screen', timestamp);
    }
  }
}
</script>

<style scoped lang="scss">
.filler{
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 0;
}
.popup{
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: white;
  img{
    width: 100%;
    height: 100%;
  }
}
.circle{
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid grey;
  background: yellow;
  margin: -10px 0 0 -10px;
  box-shadow: 1px 1px 2px grey;
}
.table{
  text-align: center;
  width: 100%;
  margin: 0 0 1rem;
}
</style>
