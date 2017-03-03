<template lang="html">
<div class="operation operation-edit">
  <div class="operation__content edit-form">
    <div class="edit-form__line">
      <label>Operation name</label>
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
    <div v-if="typePopup" class="operation__select-type">
      <div v-for="type in operationTypes" @click="operation.type = type.identifier; typePopup = false">
        <img :src="typeIcons[type.identifier]"/>
        <div>{{type.name}}</div>
      </div>
    </div>
  </div>
  <div class="operation__actions">
    <button class="operation__action-button" @click="togglePopup">
      <img src="https://icon.now.sh/grid/32/fefefe" alt="">
    </button>
    <button class="operation__action-button" @click="$emit('delete')">
      <img src="https://icon.now.sh/trash/32/fefefe" alt="">
    </button>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex';
import inputText from '../img/inputText.svg';
import selectCard from '../img/selectCard.svg';
import touchScreen from '../img/touchScreen.svg';
import wait from '../img/wait.svg';
export default {
  computed:
    mapState([
      'operationTypes',
      'cards'
    ]),
  props: ['operation'],
  data (){
    return {
      typePopup: false,
      typeIcons: {
        inputText,
        selectCard,
        touchScreen,
        wait
      }
    }
  },
  methods: {
    togglePopup (){
      this.typePopup = !this.typePopup;
    }
  }
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
.operation__action-button{
  background: none;
  border: none;
  padding: 0;
}
.operation__select-type{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  background: green;
  flex-direction: column;
  text-align: center;
}
.operation__select-type>div{
  margin: 1em;
  cursor: pointer;
}
</style>
