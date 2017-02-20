<template lang="html">
  <div class="operation operation-edit">
    <label>Type</label>
    <select v-model="operation.type">
      <option v-for="type in $store.state.operationTypes" :value="type.identifier">
        {{ type.name }}
      </option>
    </select>
    <label>Name</label>
    <input type="text" v-model="operation.name">
    <div v-for="type in $store.state.operationTypes" v-if="type.identifier === operation.type">
      <div v-for="(arg,i) in type.arguments">
        <label>{{ arg.name }}</label>
        <input type="text" v-if="arg.type === 'String'" v-model="operation.args[i]">
        <input type="number" v-if="arg.type === 'Integer'" v-model="operation.args[i]">
        <select v-if="arg.type === 'Cards'" v-model="operation.args[i]">
          <option v-for="card in $store.state.cards" :value="card">{{ card }}</option>
        </select>
      </div>
    </div>
    <button @click="$emit('delete')">Delete</button>
  </div>
</template>

<script>
export default {
  props: ['operation']
}
</script>

<style lang="css">
.operation-edit label{
  display: block;
}
</style>
