<template lang="html">
  <div class="root">
    <button class="button" @click="requestScreen">Get screenshot from device</button>
    <div
      class="popup"
      v-if="opened"
      @mousedown="mouseDown"
      @mouseup="mouseUp"
    >
      <img :src="`./screenshot.png?t=${timestamp}`" alt="Image is not loaded">
      <div class="circle" :style="{left: dotX1 + 'px', top: dotY1 + 'px'}">1</div>
      <div class="circle" :style="{left: dotX2 + 'px', top: dotY2 + 'px'}">2</div>
    </div>
    <table class="table">
      <tr>
        <th>X1</th>
        <td>{{x1}}</td>
        <th>Y1</th>
        <td>{{y1}}</td>
      </tr>
      <tr>
        <th>X2</th>
        <td>{{x2}}</td>
        <th>Y2</th>
        <td>{{y2}}</td>
      </tr>
    </table>
    <table class="table">
      <tr>
        <th>Duration:</th>
        <td><input type="number" :value="duration" @input="inputDuration"></td>
      </tr>
      <tr>
        <th>Delay:</th>
        <td><input type="number" :value="delay" @input="inputDelay"></td>
      </tr>
    </table>
    <div class="filler"></div>
  </div>
</template>

<script>
import socket from '../../store/socket.js';
export default {
  created (){
    socket.on('screenshot', data => {
      this.opened = (data.timestamp === this.timestamp);
    });
  },
  beforeDestroy (){
    socket.off('screenshot');
  },
  props: ['args'],
  data(){
    return {
      proportion: 1,
      x1: this.args[0] || 0,
      y1: this.args[1] || 0,
      x2: this.args[2] || 0,
      y2: this.args[3] || 0,
      duration: parseInt(this.args[4], 10) || 500,
      delay: parseInt(this.args[5], 10) || 500,
      timestamp: null,
      opened: false
    }
  },
  mounted (){
    this.proportion = (this.$el.querySelector('.filler').clientWidth) / 320;
  },
  computed: {
    dotX1(){ return this.x1 * this.proportion | 0; },
    dotY1(){ return this.y1 * this.proportion | 0; },
    dotX2(){ return this.x2 * this.proportion | 0; },
    dotY2(){ return this.y2 * this.proportion | 0; }
  },
  methods: {
    mouseDown(e){
      this.x1 = (e.offsetX + e.target.offsetLeft) / this.proportion | 0;
      this.y1 = (e.offsetY + e.target.offsetTop ) / this.proportion | 0;
    },
    mouseUp(e){
      this.x2 = (e.offsetX + e.target.offsetLeft) / this.proportion | 0;
      this.y2 = (e.offsetY + e.target.offsetTop ) / this.proportion | 0;
      this.opened = false;
      this.input();
    },
    input(){
      this.$emit('select', [this.x1, this.y1, this.x2, this.y2, this.duration, this.delay]);
    },
    inputDuration(e){
      this.duration = e.target.value;
      this.input();
    },
    inputDelay(e){
      this.delay = e.target.value;
      this.input();
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
  cursor: pointer;
  img{
    width: 100%;
    height: 100%;
    pointer-events: none;
    user-select:none;
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
  display: flex;
  align-content: center;
  justify-content: center;
  user-select:none;
}
.table{
  text-align: center;
  width: 100%;
  margin: 0 0 1rem;
  input{
    margin-bottom: 0;
  }
}
</style>
