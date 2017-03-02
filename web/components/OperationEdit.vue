<template lang="html">
<div class="operation operation-edit">
  <div class="operation__content edit-form">
    <div class="edit-form__line">
      <label>Name</label>
      <input type="text" v-model="operation.name">
    </div>
    <div v-for="type in operationTypes" v-if="type.identifier === operation.type">
      <div class="edit-form__line" v-for="(arg,i) in type.arguments">
        <label>{{ arg.name }}</label>
        <input type="text" v-if="arg.type === 'String'" v-model="operation.args[i]">
        <input type="number" v-if="arg.type === 'Integer'" v-model="operation.args[i]">
        <select v-if="arg.type === 'Cards'" v-model="operation.args[i]">
          <option v-for="card in cards" :value="card">{{ card }}</option>
        </select>
      </div>
    </div>
  </div>
  <div class="operation__actions">
    <select v-model="operation.type">
      <option v-for="type in operationTypes" :value="type.identifier">
        {{ type.name }}
      </option>
    </select>
    <button @click="$emit('delete')">Delete</button>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  computed:
    mapState([
      'operationTypes',
      'cards'
    ]),
  props: ['operation']
}
</script>

<style lang="css">
.operation-edit label{
  display: block;
}
.edit-form{}
.edit-form__line{
  margin-bottom: .5em;
}
</style>
