<template lang="html">
<div class="operation operation-edit">
  <div class="operation__content edit-form">
    <div class="edit-form__line">
      <label>Operation name</label>
      <input type="text" v-model="operation.name">
    </div>
    <div v-for="type in operationTypes" v-if="type.identifier === operation.type">
      <div v-if="type.identifier === 'touchScreen'">
        <label>
          X <input type="number" v-model="operation.args[0]">
        </label>
        <label>
          Y <input type="number" v-model="operation.args[1]">
        </label>
      </div>
      <div v-else-if="type.identifier === 'tapeExecutor'" >
        <label>Tape to execute
          <select v-model="operation.args[0]">
            <option
                v-if="tape.id !== openedTapeId"
                v-for="tape in tapes"
                :value="tape.id"
            >
              {{tape.name}}
            </option>
          </select>
        </label>
        <label> Count of repeats
          <input placeholder="Minimum 1" type="number" v-model="operation.args[1]">
        </label>
      </div>
      <div v-else class="edit-form__line" v-for="(arg,i) in type.arguments">
        <label>{{ arg.name }}
          <input type="text" v-if="arg.type === 'String'" v-model="operation.args[i]">
          <input type="number" v-if="arg.type === 'Integer'" v-model="operation.args[i]">
          <select v-if="arg.type === 'Cards'" v-model="operation.args[i]">
            <option v-for="card in cards" :value="card">{{ card }}</option>
          </select>
        </label>
      </div>
    </div>
    <OperationTypeSelect
      v-if="typePopup || (operation.type == null)"
      :value="operation.type"
      @input="selectType"
    />
  </div>
  <div class="operation__actions">
    <button class="operation__action-button" @click="togglePopup">
      <Icon :glyph="operation.type || 'grid'" width="32" height="32" />
    </button>
    <button class="operation__action-button" @click="$emit('delete')">
      <Icon glyph="trash" width="32" height="32" />
    </button>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex';
import Icon from './Icon.vue';
import OperationTypeSelect from './OperationTypeSelect.vue';
export default {
  components: { Icon, OperationTypeSelect },
  computed:
    mapState([
      'openedTapeId',
      'operationTypes',
      'cards',
      'tapes'
    ]),
  props: ['operation'],
  data (){
    return {
      typePopup: false
    }
  },
  methods: {
    togglePopup() {
      this.typePopup = !this.typePopup;
    },
    selectType(value) {
      this.operation.type = value;
      this.typePopup = false;
      if (!this.operation.name){
        this.operation.name = this.operationTypes.find(item => item.identifier === value).name;
      }
    }
  }
}
</script>

<style lang="scss">
.operation-edit{
  height: 450px;
}
.edit-form{}
.operation__action-button{
  color: #fefefe;
}
</style>
