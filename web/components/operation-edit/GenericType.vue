<template lang="html">
  <div class="root">
    <div  v-for="(arg,i) in argsInfo">
      <label>{{ arg.name }}
        <input type="text" v-if="arg.type === 'String'" v-model="innerArgs[i]" @change="input">
        <input type="number" v-if="arg.type === 'Integer'" v-model="innerArgs[i]" @change="input">
        <select v-if="arg.type === 'Cards'" v-model="innerArgs[i]" @change="input">
          <option v-for="card in cards" :value="card">{{ card }}</option>
        </select>
      </label>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  props: ['args', 'argsInfo'],
  computed:
    mapState([
      'cards'
    ]),
  data() {
    return {
      innerArgs: this.argsInfo.map((item, i) => this.args[i] || item.default)
    }
  },
  mounted(){
    this.input();
  },
  methods:{
    input(){
      this.$emit('select', this.argsInfo.map((item, i) => this.innerArgs[i]));
    },
  }
}
</script>

<style lang="css">
</style>
