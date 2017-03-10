<template lang="html">
  <div class="root">
    <label>Tape to execute
      <select v-model="tapeId" @change="selectTape">
        <option
            v-for="tape in tapes"
            :value="tape.id"
        >
          {{tape.name}}
        </option>
      </select>
    </label>
    <label> Count of repeats
      <input placeholder="Minimum 1" type="number" :value="count" @input="inputCount">
    </label>
  </div>
</template>

<script>
export default {
  props: ['tapes', 'args', 'argsInfo'],
  data(){
    return {
      tapeId: this.args[0] || 0,
      count: this.args[1] || this.argsInfo[1].default
    }
  },
  methods: {
    selectTape(e){
      this.input();
    },
    inputCount(e){
      this.count = e.target.value;
      this.input();
    },
    input(){
      this.$emit('select', [this.tapeId, this.count]);
    }
  }
}
</script>

<style lang="css">
</style>
